// =============================================
//  SmartFix Valencia — Booking API Server
//  Запуск: node server.js
//  PM2:    pm2 start server.js --name smartfix-site
// =============================================

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Конфигурация ─────────────────────────────
// Задай через переменные окружения на VPS:
//   export ADMIN_PASSWORD=твой_пароль
//   export TELEGRAM_TOKEN=токен_бота
//   export TELEGRAM_CHAT_ID=id_чата
const ADMIN_PASSWORD  = process.env.ADMIN_PASSWORD  || '1111';
const TELEGRAM_TOKEN  = process.env.TELEGRAM_TOKEN  || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
const BOOKINGS_FILE   = path.join(__dirname, 'bookings.json');

// ── Middleware ────────────────────────────────
app.use(express.json());
app.use(express.static(__dirname));   // отдаёт index.html, admin.html, images/

// ── Helpers ───────────────────────────────────
function loadBookings() {
    if (!fs.existsSync(BOOKINGS_FILE)) return [];
    try { return JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8')); }
    catch { return []; }
}

function saveBookings(data) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

async function sendTelegram(b) {
    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) return;
    const icon = b.serviceCategory === 'wash' ? '🧼' : '❄️';
    const text =
        `${icon} *Nueva reserva — SmartFix Valencia*\n\n` +
        `📋 *Servicio:* ${b.serviceName}\n` +
        `📅 *Fecha:* ${b.date}\n` +
        `⏰ *Hora:* ${b.time}\n` +
        `👤 *Cliente:* ${b.name}\n` +
        `📞 *Teléfono:* ${b.phone}\n` +
        `🚗 *Matrícula:* ${b.plate}\n` +
        `🕐 *Recibido:* ${new Date().toLocaleString('es-ES')}`;
    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' })
        });
    } catch (e) { console.error('[Telegram]', e.message); }
}

function authMiddleware(req, res, next) {
    if (req.headers['x-admin-token'] !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// ── API routes ────────────────────────────────

// POST /api/booking — создать бронь
app.post('/api/booking', (req, res) => {
    const { service, serviceName, serviceCategory, date, time, name, phone, plate } = req.body;

    if (!service || !date || !time || !name || !phone || !plate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const booking = {
        id:              Date.now().toString(),
        createdAt:       new Date().toISOString(),
        service,
        serviceName:     serviceName || service,
        serviceCategory: serviceCategory || 'unknown',
        date,
        time,
        name:            name.trim(),
        phone:           phone.trim(),
        plate:           plate.trim().toUpperCase(),
        status:          'pending'    // pending | confirmed | done | cancelled
    };

    const bookings = loadBookings();
    bookings.push(booking);
    saveBookings(bookings);

    sendTelegram(booking).catch(console.error);

    console.log(`[BOOKING] ${booking.date} ${booking.time} — ${booking.name} (${booking.plate})`);
    res.json({ success: true, id: booking.id });
});

// GET /api/bookings — все брони (только для админа)
app.get('/api/bookings', authMiddleware, (req, res) => {
    res.json(loadBookings());
});

// PATCH /api/booking/:id — изменить статус
app.patch('/api/booking/:id', authMiddleware, (req, res) => {
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'done', 'cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });

    const bookings = loadBookings();
    const b = bookings.find(x => x.id === req.params.id);
    if (!b) return res.status(404).json({ error: 'Not found' });
    b.status = status;
    saveBookings(bookings);
    res.json({ success: true });
});

// DELETE /api/booking/:id — удалить бронь
app.delete('/api/booking/:id', authMiddleware, (req, res) => {
    let bookings = loadBookings();
    bookings = bookings.filter(x => x.id !== req.params.id);
    saveBookings(bookings);
    res.json({ success: true });
});

// ── Start ─────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ SmartFix server started on port ${PORT}`);
    console.log(`   Admin panel: http://localhost:${PORT}/admin.html`);
    if (!TELEGRAM_TOKEN) console.log('   ⚠️  Telegram not configured (set TELEGRAM_TOKEN + TELEGRAM_CHAT_ID)');
});
