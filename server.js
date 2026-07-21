// =============================================
//  SmartFix Valencia — Booking API Server
//  v2: SQLite + Security + Slot availability
//  Запуск: node server.js
//  PM2:    pm2 start server.js --name smartfix-site
// =============================================

const express    = require('express');
const Database   = require('better-sqlite3');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const path       = require('path');
// Загружаем .env из папки сервера (чтобы работало при запуске из любой директории)
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Конфигурация (env переменные на VPS) ────
const ADMIN_PASSWORD   = process.env.ADMIN_PASSWORD   || '1444';
const TELEGRAM_TOKEN   = process.env.TELEGRAM_TOKEN   || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
const DB_PATH          = path.join(__dirname, 'bookings.db');

// ── База данных SQLite ───────────────────────
const db = new Database(DB_PATH);
db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
        id               TEXT PRIMARY KEY,
        created_at       TEXT NOT NULL,
        service          TEXT NOT NULL,
        service_name     TEXT,
        service_category TEXT,
        date             TEXT NOT NULL,
        time             TEXT NOT NULL,
        name             TEXT NOT NULL,
        phone            TEXT NOT NULL,
        plate            TEXT NOT NULL,
        status           TEXT DEFAULT 'pending'
    );
    CREATE INDEX IF NOT EXISTS idx_date   ON bookings(date);
    CREATE INDEX IF NOT EXISTS idx_status ON bookings(status);
`);
console.log(`[DB] SQLite ready: ${DB_PATH}`);

// ── Слоты ───────────────────────────────────
const SLOTS = {
    ac:          ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
    standard_ac: ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
    // Exterior / Interior пн-пт: каждые 30 мин, последний старт 17:00 (done 17:30)
    wash_ext: ['09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
               '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'],
    wash_int: ['09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
               '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'],
    // Completo пн-пт: каждые 1.5ч, последний старт 15:30 (done 17:00)
    wash_full: ['09:30','11:00','12:30','14:00','15:30'],
    // Aceite пн-пт: каждые 1.5ч, с 09:30 до 17:00
    oil_labor: ['09:30','11:00','12:30','14:00','15:30','17:00'],
    oil_full:  ['09:30','11:00','12:30','14:00','15:30','17:00']
};
// Суббота — сокращённый день: последняя машина в 13:00
const SLOTS_SAT = {
    ac:          ['10:00','11:00','12:00','13:00'],
    standard_ac: ['10:00','11:00','12:00','13:00'],
    wash_ext: ['09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00'],
    wash_int: ['09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00'],
    wash_full: ['09:30','11:00'],   // done 12:30
    oil_labor: ['09:30','11:00','12:30'],  // done 14:00
    oil_full:  ['09:30','11:00','12:30']   // done 14:00
};

// ── Безопасность ─────────────────────────────
app.use(helmet({
    contentSecurityPolicy: false,   // Tailwind CDN
    crossOriginEmbedderPolicy: false
}));

// Rate limit: 100 req / 15min для всех API
app.use('/api/', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Demasiadas solicitudes. Inténtalo más tarde.' }
}));

// Rate limit строже для создания брони: 10 req / час
const bookingLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { error: 'Demasiados intentos. Inténtalo más tarde.' }
});

app.use(express.json({ limit: '10kb' }));
app.use(express.static(__dirname));

// ── Валидация ────────────────────────────────
function validateBooking(body) {
    const { service, serviceCategory, date, time, name, phone, plate } = body;

    if (!service || !date || !time || !name || !phone || !plate || !serviceCategory) {
        return 'Faltan campos obligatorios';
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))     return 'Formato de fecha inválido';
    if (!/^\d{2}:\d{2}$/.test(time))             return 'Formato de hora inválido';
    if (name.trim().length < 2 || name.length > 100) return 'Nombre inválido';
    if (!/^\+?[\d\s\-().]{6,20}$/.test(phone))  return 'Teléfono inválido';
    if (!/^[A-Z0-9\s\-]{3,10}$/i.test(plate))   return 'Matrícula inválida';
    if (!['ac','wash','oil'].includes(serviceCategory)) return 'Categoría inválida';

    // No pasado
    const d = new Date(date + 'T12:00:00');
    const today = new Date(); today.setHours(0,0,0,0);
    if (d < today)       return 'No puedes reservar fechas pasadas';
    if (d.getDay() === 0) return 'Estamos cerrados los domingos';

    return null;
}

// ── Telegram ─────────────────────────────────
async function sendTelegram(b) {
    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
        console.log('[Telegram] ⚠️ Пропущено: TELEGRAM_TOKEN или TELEGRAM_CHAT_ID не настроены');
        return;
    }
    const icon = b.service_category === 'wash' ? '🧼' : b.service_category === 'oil' ? '🛢️' : '❄️';
    const dateObj = new Date(b.date + 'T12:00:00');
    const dateDisplay = dateObj.toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long' });
    const text =
        `${icon} *Nueva reserva — SmartFix Valencia*\n\n` +
        `📋 *Servicio:* ${b.service_name || b.service}\n` +
        `📅 *Fecha:* ${dateDisplay}\n` +
        `⏰ *Hora:* ${b.time}\n` +
        `👤 *Cliente:* ${b.name}\n` +
        `📞 *Teléfono:* ${b.phone}\n` +
        `🚗 *Matrícula:* ${b.plate}`;
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' })
        });
        const result = await response.json();
        if (response.ok) {
            console.log('[Telegram] ✅ Уведомление отправлено');
        } else {
            console.error('[Telegram] ❌ Ошибка API Telegram:', JSON.stringify(result));
        }
    } catch (e) { 
        console.error('[Telegram] ❌ Ошибка сети/запроса:', e.message); 
    }
}

// ── Auth middleware ──────────────────────────
function requireAdmin(req, res, next) {
    if (req.headers['x-admin-token'] !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// ── API: Próximos días laborables ────────────
function toLocalDateStr(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

app.get('/api/working-days', (req, res) => {
    const days = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    while (days.length < 9) {
        if (d.getDay() !== 0) days.push(toLocalDateStr(d));  // no domingo
        d.setDate(d.getDate() + 1);
    }
    res.json({ days });
});

// ── API: Slots disponibles ───────────────────
app.get('/api/available-slots', (req, res) => {
    const { date, service } = req.query;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: 'Fecha inválida' });
    }

    const d = new Date(date + 'T12:00:00');
    if (d.getDay() === 0) {
        return res.json({ slots: [] });
    }

    const isSaturday = d.getDay() === 6;

    // В субботу — сокращённое расписание для всех услуг
    const allSlots = (isSaturday && SLOTS_SAT[service])
        ? SLOTS_SAT[service]
        : (SLOTS[service] || SLOTS['standard_ac']);

    // Slots ya ocupados (excluir cancelados y realizados)
    const taken = db.prepare(
        'SELECT time FROM bookings WHERE date = ? AND status NOT IN (?,?)'
    ).all(date, 'cancelled', 'done').map(r => r.time);

    // Filtrar slots pasados si es hoy
    const today = new Date(); today.setHours(0,0,0,0);
    const isToday = date === toLocalDateStr(today);
    const currentMins = new Date().getHours() * 60 + new Date().getMinutes() + 30;

    const slots = allSlots.map(time => {
        const [h, m] = time.split(':').map(Number);
        const slotMins = h * 60 + m;
        const isPast = isToday && slotMins <= currentMins;
        return { time, available: !taken.includes(time) && !isPast };
    });

    res.json({ slots });
});

// ── API: Crear reserva ───────────────────────
app.post('/api/booking', bookingLimiter, (req, res) => {
    const err = validateBooking(req.body);
    if (err) return res.status(400).json({ error: err });

    const { service, serviceName, serviceCategory, date, time, name, phone, plate } = req.body;

    // Verificar disponibilidad del slot (doble check)
    const conflict = db.prepare(
        'SELECT id FROM bookings WHERE date = ? AND time = ? AND status NOT IN (?,?)'
    ).get(date, time, 'cancelled', 'done');

    if (conflict) {
        return res.status(409).json({ error: 'Este horario ya está reservado. Por favor elige otro.' });
    }

    const booking = {
        id:               Date.now().toString(),
        created_at:       new Date().toISOString(),
        service,
        service_name:     String(serviceName || service).substring(0, 100),
        service_category: serviceCategory,
        date,
        time,
        name:             name.trim().substring(0, 100),
        phone:            phone.trim().substring(0, 20),
        plate:            plate.trim().toUpperCase().substring(0, 10),
        status:           'pending'
    };

    db.prepare(`
        INSERT INTO bookings
        (id, created_at, service, service_name, service_category, date, time, name, phone, plate, status)
        VALUES
        (@id, @created_at, @service, @service_name, @service_category, @date, @time, @name, @phone, @plate, @status)
    `).run(booking);

    sendTelegram(booking).catch(console.error);
    console.log(`[BOOKING] ${booking.date} ${booking.time} — ${booking.name} (${booking.plate})`);

    res.json({ success: true, id: booking.id });
});

// ── API: Todas las reservas (admin) ──────────
app.get('/api/bookings', requireAdmin, (req, res) => {
    const rows = db.prepare(
        'SELECT * FROM bookings ORDER BY date ASC, time ASC'
    ).all();
    res.json(rows.map(b => ({
        ...b,
        serviceName:     b.service_name,
        serviceCategory: b.service_category,
        createdAt:       b.created_at
    })));
});

// ── API: Cambiar estado ──────────────────────
app.patch('/api/booking/:id', requireAdmin, (req, res) => {
    const { status } = req.body;
    if (!['pending','confirmed','done','cancelled'].includes(status)) {
        return res.status(400).json({ error: 'Estado inválido' });
    }
    const r = db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, req.params.id);
    if (r.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
});

// ── API: Eliminar reserva ────────────────────
app.delete('/api/booking/:id', requireAdmin, (req, res) => {
    const r = db.prepare('DELETE FROM bookings WHERE id = ?').run(req.params.id);
    if (r.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
});

// ── API: Тест Telegram (диагностика) ─────────
app.post('/api/test-telegram', (req, res) => {
    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
        return res.status(400).json({ 
            error: 'Telegram не настроен',
            tokenSet: !!TELEGRAM_TOKEN,
            chatIdSet: !!TELEGRAM_CHAT_ID
        });
    }
    const testBooking = {
        service_name: '🔧 Тестовое сообщение',
        service_category: 'ac',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        name: 'SmartFix Диагностика',
        phone: '+34 614 434 722',
        plate: 'TEST'
    };
    sendTelegram(testBooking).then(() => {
        res.json({ success: true, message: 'Тестовое сообщение отправлено. Проверьте Telegram.' });
    }).catch(e => {
        res.status(500).json({ error: 'Ошибка отправки: ' + e.message });
    });
});

// ── 404 API ──────────────────────────────────
app.use('/api/', (req, res) => res.status(404).json({ error: 'Not found' }));

// ── Start ────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n✅ SmartFix server started on port ${PORT}`);
    console.log(`   Site:  http://localhost:${PORT}`);
    console.log(`   Admin: http://localhost:${PORT}/admin.html`);
    if (!TELEGRAM_TOKEN) console.log('   ⚠️  Telegram: set TELEGRAM_TOKEN + TELEGRAM_CHAT_ID');
    else console.log('   ✅ Telegram configured');
});

