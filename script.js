/* =============================================
   SmartFix Spain — Interactive Controllers
   ============================================= */

// --- 0. MULTILINGUAL SUPPORT ---
let currentLang = 'es';

// Live open/closed indicator
function updateLiveStatus() {
    const el = document.getElementById('liveStatus');
    if (!el) return;
    const now = new Date();
    const day = now.getDay();   // 0=Sun,1=Mon,...,6=Sat
    const h   = now.getHours();
    const m   = now.getMinutes();
    const mins = h * 60 + m;
    const isOpen = day >= 1 && day <= 6 && mins >= 9*60+30 && mins < 19*60;
    const labels = { es: ['Abierto ahora','Cerrado ahora'], en: ['Open now','Closed now'], ru: ['Открыто','Закрыто'] };
    const [openTxt, closedTxt] = labels[currentLang] || labels.es;
    el.innerHTML = isOpen
        ? `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span><span class="text-emerald-600">${openTxt}</span>`
        : `<span class="w-2 h-2 rounded-full bg-red-400"></span><span class="text-red-500">${closedTxt}</span>`;
}
updateLiveStatus();
setInterval(updateLiveStatus, 60000);

const translations = {
    es: {
        nav_services: 'Servicios', nav_budget: 'Presupuesto', nav_book: 'Reservar',
        nav_app: 'SmartFix App', nav_cta: 'Pedir Cita',
        hero_badge: 'Estación Digital de Auto-Servicios en España',
        hero_h1_line1: 'El clima perfecto', hero_h1_line2: 'para tu coche.',
        hero_h1_gradient: 'En un solo clic.',
        hero_desc: 'Carga digital y diagnóstico predictivo de aire acondicionado con tecnología italiana. Reserva en línea y disfruta de la máxima comodidad en nuestro centro inteligente.',
        hero_btn_book: 'Reservar Carga de Gas', hero_btn_services: 'Ver otros servicios',
        hero_notice: '<strong>Solo gas R134a.</strong> Atendemos vehículos fabricados <strong>hasta 2013</strong>. Los coches más nuevos con gas R1234yf requieren equipamiento especializado que no disponemos.',
        sh_ac_title: 'Climatización AC', sh_ac_badge: 'Gas R134a • Coches hasta 2013',
        sh_ac_desc: 'Vaciado, detección de fugas UV e inyección de aceite sintético. Cantidad exacta según especificaciones del fabricante.',
        sh_from: 'Desde', sh_ac_btn: 'Reservar AC',
        sh_wash_title: 'Autolavado', sh_wash_badge: 'Exterior • Interior • Completo',
        sh_wash_desc: 'Lavado manual por profesionales con reserva de hora online. Ven a tu hora sin esperar cola. Exterior, interior o completo.',
        sh_wash_btn: 'Reservar Lavado',
        sec_services_title: 'Nuestra Plataforma de Servicios',
        sec_services_desc: 'Selecciona uno de nuestros servicios inteligentes actuales y planificados para ver cómo transformamos la experiencia del conductor.',
        tab_ac: 'Climatización (AC)', tab_wash: 'Smart Wash', tab_app: 'App Móvil (Futuro)',
        sec_book_title: 'Módulo de Reserva Inteligente',
        sec_book_desc: 'Una interfaz pensada para el móvil. Reserva en menos de un minuto.',
        book_header: 'Cita express online', book_step1_title: '¿Qué servicio necesitas?',
        book_cat_oil: 'Cambio de aceite',
        book_cat_ac: 'Climatización AC', book_cat_wash: 'Smart Wash',
        book_step2_title: 'Selecciona Fecha y Hora',
        book_dates_label: 'Día disponible (Julio 2026)', book_times_label: 'Horas disponibles',
        book_step3_title: 'Datos del Propietario',
        book_name_label: 'Tu Nombre completo', book_name_ph: 'Ej: Javier García',
        book_phone_label: 'Número de Teléfono', book_phone_ph: 'Ej: +34 600 000 000',
        book_plate_label: 'Matrícula del Vehículo', book_plate_ph: 'Ej: 1234 ABC',
        book_success_title: '¡Cita confirmada con éxito!',
        book_success_desc: 'Te esperamos en el centro. Aquí tienes el resumen de tu reserva.',
        ticket_client: 'Cliente:', ticket_date: 'Fecha:',
        ticket_time: 'Hora de Cita:', ticket_plate: 'Matrícula:',
        book_prev: 'Atrás', book_next: 'Siguiente', book_confirm: 'Confirmar Cita',
        alert_step1: 'Por favor selecciona un plan de servicio',
        alert_step2: 'Por favor selecciona una fecha y una hora',
        alert_step3: 'Por favor completa todos los datos de contacto',
        sec_app_badge: 'Futuro de SmartFix',
        sec_app_title: 'Próximo gran salto: La App de SmartFix',
        sec_app_desc: 'Diseñamos cada parte de este sistema pensando en una migración de app móvil sin fisuras. En el futuro cercano, podrás controlar todo el historial de tu coche de manera directa:',
        sec_app_bullet1: '<strong>Notificaciones proactivas:</strong> Alertas antes de que tu aire acondicionado deje de enfriar.',
        sec_app_bullet2: '<strong>Pases Wallet instantáneos:</strong> Entra de manera directa por lectura de patente sin mediar palabra.',
        footer_copy: '© 2026 SmartFix Digital España. Todos los derechos reservados.',
        footer_tagline: 'Recarga AC y autolavado profesional con reserva online.',
        footer_contact_title: 'Contacto', footer_hours_title: 'Horario',
        footer_hours_weekdays: 'Lunes – Sábado', footer_hours_sunday: 'Domingo — Cerrado',
        // Booking service card text
        book_ac_std_title: 'Clima Estándar', book_ac_std_badge: 'Gas R134a • Hasta 2013',
        book_ac_std_desc: 'Para coches fabricados hasta 2013. Incluye vaciado, detección de fugas y carga precisa de gas.',
        book_ac_eco_title: 'Clima Eco', book_ac_eco_badge: 'Gas R1234yf • 2014+',
        book_ac_eco_na: 'No disponible', book_ac_eco_desc: 'Los vehículos con gas R1234yf requieren equipamiento especializado.',
        book_wash_ext_title: 'Exterior', book_wash_ext_time: '~30 min',
        book_wash_ext_desc: 'Lavado exterior con espuma activa, aclarado a presión y secado.',
        book_wash_int_title: 'Interior', book_wash_int_time: '~30 min',
        book_wash_int_desc: 'Aspirado, salpicadero, consola, tapicería y cristales interiores.',
        book_wash_full_title: 'Completo', book_wash_full_time: '~1.5 horas',
        book_wash_full_desc: 'Exterior + interior. La opción más completa para dejar tu coche como nuevo.',
        book_wash_popular: 'MÁS POPULAR',
        // Oil change cards
        book_oil_labor_title: 'Solo Mano de Obra', book_oil_labor_badge: 'Tus materiales',
        book_oil_labor_desc: 'Cambio de aceite y filtro utilizando tus propios materiales.',
        book_oil_labor_note: 'Verifica las especificaciones de tu aceite.',
        book_oil_full_title: 'Servicio Completo', book_oil_full_badge: 'Todo incluido',
        book_oil_full_desc: 'Cambio de aceite + aceite de alta calidad y filtro incluidos.',
        book_vin_label: 'VIN / Número de Bastidor', book_vin_ph: 'Ej: WAUZZZ8VX7A123456',
        book_vin_note: 'Necesario para pedir los filtros y aceite correctos para tu vehículo.',
        // Date buttons
        date_fri10: 'Viernes 10', date_sat11: 'Sábado 11', date_mon13: 'Lunes 13',
        date_tue14: 'Martes 14', date_wed15: 'Miérc. 15',
        // Tab content
        tab_ac_pre: 'Fase Inicial / Activo',
        tab_ac_title: 'Servicio de Climatización de Alta Precisión',
        tab_ac_desc: 'Nuestras estaciones de carga automáticas inteligentes vacían, verifican la presión por vacío y recargan el coche con la cantidad exacta especificada por el fabricante para evitar daños en el compresor.',
        tab_ac_b1: 'Compatibilidad total con gases R134a (coches hasta 2013).',
        tab_ac_b2: 'Inyección de aceite sintético con aditivo UV detector de fugas.',
        tab_ac_b3: 'Desinfección premium por ultrasonidos del conducto interno.',
        tab_wash_pre: 'Disponible ahora',
        tab_wash_title: 'Autolavado — Lavado Manual Profesional',
        tab_wash_desc: 'Lavado a mano realizado por profesionales. Reserva tu hora online y llégate cuando quieras sin esperar cola. Disponemos de lavado exterior, interior o completo según tus necesidades.',
        tab_wash_b1: 'Lavado exterior a mano con espuma activa, aclarado y secado.',
        tab_wash_b2: 'Limpieza interior: aspirado, salpicadero, consola y cristales.',
        tab_wash_b3: 'Reserva online — ven a tu hora sin colas ni esperas.',
        tab_app_pre: 'Evolución final de Negocio',
        tab_app_title: 'Tu coche controlado desde la Palma de tu Mano',
        tab_app_desc: 'La app SmartFix te avisará automáticamente sobre el ciclo de salud de los consumibles del vehículo y permitirá agendar servicios con un tap.',
        tab_app_b1: 'Alertas push tempranas mediante diagnósticos predictivos.',
        tab_app_b2: 'Modo Llaves Express: deja tu coche en cabina y monitoriza el progreso en vivo.',
        tab_app_b3: 'Almacenamiento de pases nativos en Apple Wallet y Google Wallet.',
    },
    en: {
        nav_services: 'Services', nav_budget: 'Pricing', nav_book: 'Book Now',
        nav_app: 'SmartFix App', nav_cta: 'Book Now',
        hero_badge: 'Digital Auto-Service Station in Spain',
        hero_h1_line1: 'Perfect climate', hero_h1_line2: 'for your car.',
        hero_h1_gradient: 'In one click.',
        hero_desc: 'Digital charging and predictive AC diagnostics with Italian technology. Book online and enjoy maximum comfort at our smart service center.',
        hero_btn_book: 'Book AC Service', hero_btn_services: 'View all services',
        hero_notice: '<strong>R134a gas only.</strong> We service vehicles manufactured <strong>up to 2013</strong>. Newer cars with R1234yf gas require specialized equipment we do not carry.',
        sh_ac_title: 'AC Service', sh_ac_badge: 'R134a Gas • Cars up to 2013',
        sh_ac_desc: 'Evacuation, UV leak detection and synthetic oil injection. Exact amount per manufacturer specifications.',
        sh_from: 'From', sh_ac_btn: 'Book AC',
        sh_wash_title: 'Smart Wash', sh_wash_badge: 'Exterior • Interior • Full',
        sh_wash_desc: 'Professional hand wash with online booking. Come at your time, no queue. Exterior, interior or full wash available.',
        sh_wash_btn: 'Book Wash',
        sec_services_title: 'Our Services Platform',
        sec_services_desc: 'Select one of our current and planned smart services to see how we transform the driver experience.',
        tab_ac: 'Air Conditioning (AC)', tab_wash: 'Smart Wash', tab_app: 'Mobile App (Future)',
        sec_book_title: 'Smart Booking Module',
        sec_book_desc: 'A mobile-first interface. Book in less than a minute.',
        book_header: 'Express Online Appointment', book_step1_title: 'What service do you need?',
        book_cat_oil: 'Oil Change',
        book_cat_ac: 'AC Service', book_cat_wash: 'Smart Wash',
        book_step2_title: 'Select Date & Time',
        book_dates_label: 'Available days (July 2026)', book_times_label: 'Available times',
        book_step3_title: 'Owner Details',
        book_name_label: 'Your Full Name', book_name_ph: 'e.g. John Smith',
        book_phone_label: 'Phone Number', book_phone_ph: 'e.g. +34 600 000 000',
        book_plate_label: 'Vehicle Plate Number', book_plate_ph: 'e.g. 1234 ABC',
        book_success_title: 'Appointment confirmed!',
        book_success_desc: 'See you at the center. Here is your booking summary.',
        ticket_client: 'Client:', ticket_date: 'Date:',
        ticket_time: 'Appointment Time:', ticket_plate: 'Plate:',
        book_prev: 'Back', book_next: 'Next', book_confirm: 'Confirm Appointment',
        alert_step1: 'Please select a service plan',
        alert_step2: 'Please select a date and time',
        alert_step3: 'Please fill in all contact details',
        sec_app_badge: 'Future of SmartFix',
        sec_app_title: 'Next big step: The SmartFix App',
        sec_app_desc: 'We designed every part of this system with a seamless mobile app migration in mind. In the near future, you\'ll be able to control your entire car history directly:',
        sec_app_bullet1: '<strong>Proactive notifications:</strong> Alerts before your air conditioning stops cooling.',
        sec_app_bullet2: '<strong>Instant Wallet passes:</strong> Entry via automatic plate recognition, no words needed.',
        footer_copy: '© 2026 SmartFix Digital Spain. All rights reserved.',
        footer_tagline: 'AC recharge and professional car wash with online booking.',
        footer_contact_title: 'Contact', footer_hours_title: 'Opening hours',
        footer_hours_weekdays: 'Monday – Saturday', footer_hours_sunday: 'Sunday — Closed',
        // Booking service card text
        book_ac_std_title: 'Standard Climate', book_ac_std_badge: 'R134a Gas • Up to 2013',
        book_ac_std_desc: 'For cars made up to 2013. Includes evacuation, leak detection and precise gas charge.',
        book_ac_eco_title: 'Eco Climate', book_ac_eco_badge: 'R1234yf Gas • 2014+',
        book_ac_eco_na: 'Not available', book_ac_eco_desc: 'Vehicles with R1234yf gas require specialized equipment.',
        book_wash_ext_title: 'Exterior', book_wash_ext_time: '~30 min',
        book_wash_ext_desc: 'Full exterior wash with active foam, pressure rinse and drying.',
        book_wash_int_title: 'Interior', book_wash_int_time: '~30 min',
        book_wash_int_desc: 'Vacuuming, dashboard, console, upholstery and interior windows.',
        book_wash_full_title: 'Full', book_wash_full_time: '~1.5 hours',
        book_wash_full_desc: 'Exterior + interior. The most complete option to make your car look brand new.',
        book_wash_popular: 'MOST POPULAR',
        // Oil change cards
        book_oil_labor_title: 'Labour Only', book_oil_labor_badge: 'Your materials',
        book_oil_labor_desc: 'Oil and filter change using your own materials.',
        book_oil_labor_note: 'Verify your oil specifications.',
        book_oil_full_title: 'Full Service', book_oil_full_badge: 'All included',
        book_oil_full_desc: 'Oil change + high quality oil and filter included.',
        book_vin_label: 'VIN / Chassis Number', book_vin_ph: 'e.g. WAUZZZ8VX7A123456',
        book_vin_note: 'Required to order the correct filters and oil for your vehicle.',
        // Date buttons
        date_fri10: 'Friday 10', date_sat11: 'Saturday 11', date_mon13: 'Monday 13',
        date_tue14: 'Tuesday 14', date_wed15: 'Wed. 15',
        // Tab content
        tab_ac_pre: 'Initial Phase / Active',
        tab_ac_title: 'High Precision AC Service',
        tab_ac_desc: 'Our smart automatic charging stations evacuate, check vacuum pressure and recharge the car with the exact amount specified by the manufacturer to prevent compressor damage.',
        tab_ac_b1: 'Full compatibility with R134a gas (cars up to 2013).',
        tab_ac_b2: 'Synthetic oil injection with UV fluorescent leak detector additive.',
        tab_ac_b3: 'Premium ultrasonic disinfection of the internal duct.',
        tab_wash_pre: 'Available now',
        tab_wash_title: 'Smart Wash — Professional Manual Car Wash',
        tab_wash_desc: 'Hand wash carried out by professionals. Book your slot online and come at your chosen time — no queue, no waiting. We offer exterior, interior or full wash depending on your needs.',
        tab_wash_b1: 'Exterior hand wash with active foam, rinse and drying.',
        tab_wash_b2: 'Interior cleaning: vacuuming, dashboard, console and windows.',
        tab_wash_b3: 'Online booking — arrive at your time, skip the queue.',
        tab_app_pre: 'Final Business Evolution',
        tab_app_title: 'Your Car in the Palm of Your Hand',
        tab_app_desc: 'The SmartFix app will automatically alert you about your vehicle\'s consumable health cycle and allow you to schedule services with a tap.',
        tab_app_b1: 'Early push alerts via predictive diagnostics.',
        tab_app_b2: 'Express Keys Mode: leave your car and monitor progress live.',
        tab_app_b3: 'Native pass storage in Apple Wallet and Google Wallet.',
    },
    ru: {
        nav_services: 'Услуги', nav_budget: 'Цены', nav_book: 'Запись',
        nav_app: 'Приложение', nav_cta: 'Записаться',
        hero_badge: 'Цифровой автосервис в Испании',
        hero_h1_line1: 'Идеальный климат', hero_h1_line2: 'для вашего авто.',
        hero_h1_gradient: 'В один клик.',
        hero_desc: 'Цифровая заправка и диагностика кондиционера с итальянским оборудованием. Онлайн-запись и максимальный комфорт в нашем умном сервисном центре.',
        hero_btn_book: 'Записаться на заправку', hero_btn_services: 'Все услуги',
        hero_notice: '<strong>Только газ R134a.</strong> Обслуживаем автомобили выпуска <strong>до 2013 года</strong>. Более новые авто с газом R1234yf требуют специального оборудования, которого у нас нет.',
        sh_ac_title: 'Заправка кондиционера', sh_ac_badge: 'Газ R134a • Авто до 2013 года',
        sh_ac_desc: 'Откачка, обнаружение утечек UV и заправка синтетическим маслом. Точное количество по спецификации производителя.',
        sh_from: 'От', sh_ac_btn: 'Записаться на AC',
        sh_wash_title: 'Автомойка', sh_wash_badge: 'Снаружи • Внутри • Полная',
        sh_wash_desc: 'Ручная мойка опытными мастерами с онлайн-записью. Приезжайте в своё время без очереди. Снаружи, внутри или полная мойка.',
        sh_wash_btn: 'Записаться на мойку',
        sec_services_title: 'Наши услуги',
        sec_services_desc: 'Выберите одну из доступных и планируемых услуг, чтобы узнать, как мы меняем опыт водителя.',
        tab_ac: 'Кондиционер (AC)', tab_wash: 'Автомойка', tab_app: 'Мобильное приложение',
        sec_book_title: 'Умная онлайн-запись',
        sec_book_desc: 'Интерфейс для смартфона. Запись за менее чем минуту.',
        book_header: 'Онлайн-запись экспресс', book_step1_title: 'Какая услуга вам нужна?',
        book_cat_oil: 'Замена масла',
        book_cat_ac: 'Кондиционер AC', book_cat_wash: 'Автомойка',
        book_step2_title: 'Выберите дату и время',
        book_dates_label: 'Доступные дни (июль 2026)', book_times_label: 'Доступное время',
        book_step3_title: 'Данные владельца',
        book_name_label: 'Ваше полное имя', book_name_ph: 'Напр: Иван Иванов',
        book_phone_label: 'Номер телефона', book_phone_ph: 'Напр: +34 600 000 000',
        book_plate_label: 'Номерной знак автомобиля', book_plate_ph: 'Напр: 1234 ABC',
        book_success_title: 'Запись подтверждена!',
        book_success_desc: 'Ждём вас в сервисном центре. Детали вашей записи:',
        ticket_client: 'Клиент:', ticket_date: 'Дата:',
        ticket_time: 'Время записи:', ticket_plate: 'Номер авто:',
        book_prev: 'Назад', book_next: 'Далее', book_confirm: 'Подтвердить запись',
        alert_step1: 'Пожалуйста, выберите услугу',
        alert_step2: 'Пожалуйста, выберите дату и время',
        alert_step3: 'Пожалуйста, заполните все контактные данные',
        sec_app_badge: 'Будущее SmartFix',
        sec_app_title: 'Следующий шаг: приложение SmartFix',
        sec_app_desc: 'Мы проектировали каждую часть системы с прицелом на мобильное приложение. В ближайшем будущем вы сможете управлять всей историей обслуживания прямо с телефона:',
        sec_app_bullet1: '<strong>Проактивные уведомления:</strong> Оповещения до того, как кондиционер перестанет охлаждать.',
        sec_app_bullet2: '<strong>Мгновенные Wallet-пропуска:</strong> Въезд по распознаванию номера без слов.',
        footer_copy: '© 2026 SmartFix Digital Испания. Все права защищены.',
        footer_tagline: 'Заправка кондиционера и автомойка с онлайн-записью.',
        footer_contact_title: 'Контакты', footer_hours_title: 'Часы работы',
        footer_hours_weekdays: 'Понедельник – Суббота', footer_hours_sunday: 'Воскресенье — Закрыто',
        // Booking service card text
        book_ac_std_title: 'Стандартный AC', book_ac_std_badge: 'Газ R134a • До 2013',
        book_ac_std_desc: 'Для автомобилей выпуска до 2013 г. Откачка, обнаружение утечек и точная заправка газом.',
        book_ac_eco_title: 'Eco AC', book_ac_eco_badge: 'Газ R1234yf • 2014+',
        book_ac_eco_na: 'Недоступно', book_ac_eco_desc: 'Авто с газом R1234yf требуют специального оборудования.',
        book_wash_ext_title: 'Снаружи', book_wash_ext_time: '~30 мин',
        book_wash_ext_desc: 'Полная наружная мойка с активной пеной, ополаскиванием под давлением и сушкой.',
        book_wash_int_title: 'Внутри', book_wash_int_time: '~30 мин',
        book_wash_int_desc: 'Пылесос, приборная панель, консоль, обивка и стёкла изнутри.',
        book_wash_full_title: 'Полная', book_wash_full_time: '~1.5 часа',
        book_wash_full_desc: 'Снаружи + внутри. Самый полный вариант, чтобы авто выглядело как новое.',
        book_wash_popular: 'ПОПУЛЯРНО',
        // Date buttons
        date_fri10: 'Пятница 10', date_sat11: 'Суббота 11', date_mon13: 'Понед. 13',
        date_tue14: 'Вторник 14', date_wed15: 'Среда 15',
        // Tab content
        tab_ac_pre: 'Начальная фаза / Активно',
        tab_ac_title: 'Заправка кондиционера высокой точности',
        tab_ac_desc: 'Наши умные автоматические станции откачивают, проверяют вакуумное давление и заправляют авто точным количеством газа по спецификации производителя, чтобы не повредить компрессор.',
        tab_ac_b1: 'Полная совместимость с газом R134a (авто до 2013 года).',
        tab_ac_b2: 'Заправка синтетическим маслом с UV-добавкой для обнаружения утечек.',
        tab_ac_b3: 'Премиум ультразвуковая дезинфекция внутреннего канала.',
        tab_wash_pre: 'Доступно сейчас',
        tab_wash_title: 'Автомойка — ручная профессиональная мойка',
        tab_wash_desc: 'Мойка вручную опытными мастерами. Запишитесь онлайн и приезжайте в своё время без очереди. Есть мойка снаружи, внутри или полная по вашему выбору.',
        tab_wash_b1: 'Наружная мойка вручную: активная пена, ополаскивание и сушка.',
        tab_wash_b2: 'Уборка салона: пылесос, приборная панель, консоль и стёкла.',
        tab_wash_b3: 'Онлайн-запись — приезжайте в своё время, без очереди.',
        tab_app_pre: 'Финальная эволюция бизнеса',
        tab_app_title: 'Ваш автомобиль в кармане',
        tab_app_desc: 'Приложение SmartFix будет автоматически уведомлять вас о состоянии расходников и позволит записываться на услуги одним касанием.',
        tab_app_b1: 'Ранние push-уведомления на основе предиктивной диагностики.',
        tab_app_b2: 'Режим "Экспресс-ключи": оставьте авто и следите за прогрессом в прямом эфире.',
        tab_app_b3: 'Хранение пропусков в Apple Wallet и Google Wallet.',
    }
};

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        if (t[el.dataset.i18n] !== undefined) el.textContent = t[el.dataset.i18n];
    });
    // Update all data-i18n-html elements (with HTML tags)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        if (t[el.dataset.i18nHtml] !== undefined) el.innerHTML = t[el.dataset.i18nHtml];
    });
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        if (t[el.dataset.i18nPlaceholder] !== undefined) el.placeholder = t[el.dataset.i18nPlaceholder];
    });

    // Update prev/next buttons (they contain icons so set carefully)
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) prevBtn.innerHTML = `<i class="fa-solid fa-arrow-left mr-2"></i> ${t.book_prev}`;
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn && bookingState.step === 3) {
        nextBtn.innerHTML = `${t.book_confirm} <i class="fa-solid fa-circle-check ml-2"></i>`;
    } else if (nextBtn) {
        nextBtn.innerHTML = `${t.book_next} <i class="fa-solid fa-arrow-right ml-2"></i>`;
    }

    // Update lang button styles
    ['es', 'en', 'ru'].forEach(l => {
        const btn = document.getElementById(`langBtn-${l}`);
        if (btn) {
            btn.className = l === lang
                ? 'text-sky-600 font-bold cursor-pointer px-1.5 py-0.5 rounded bg-sky-100 transition-colors'
                : 'text-slate-500 font-semibold cursor-pointer px-1.5 py-0.5 rounded hover:bg-sky-100 transition-colors';
        }
    });

    // Set html lang attribute
    document.documentElement.lang = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'es';
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
}

// --- 1. CAR CALCULATOR CONTROLLER ---
const carData = {
    audi: {
        models: {
            'a3': { gas: 'R134a', price: 89, time: '40 min' },
            'a4': { gas: 'R134a', price: 89, time: '45 min' },
            'e-tron': { gas: 'R1234yf', price: 149, time: '50 min' }
        }
    },
    bmw: {
        models: {
            'serie3': { gas: 'R134a', price: 89, time: '45 min' },
            'ix': { gas: 'R1234yf', price: 159, time: '60 min' }
        }
    },
    tesla: {
        models: {
            'model3': { gas: 'R1234yf', price: 139, time: '50 min' },
            'modely': { gas: 'R1234yf', price: 149, time: '55 min' }
        }
    },
    ford: {
        models: {
            'focus': { gas: 'R134a', price: 79, time: '35 min' },
            'mustang': { gas: 'R134a', price: 99, time: '45 min' }
        }
    }
};

function updateModels() {
    const brandSelect = document.getElementById('carBrand');
    const modelSelect = document.getElementById('carModel');
    const selectedBrand = brandSelect.value;

    modelSelect.innerHTML = '<option value="">Selecciona el modelo</option>';

    if (selectedBrand && carData[selectedBrand]) {
        modelSelect.disabled = false;
        modelSelect.classList.remove('text-slate-500');
        modelSelect.classList.add('text-slate-200');

        const models = carData[selectedBrand].models;
        for (let model in models) {
            const opt = document.createElement('option');
            opt.value = model;
            opt.innerText = model.toUpperCase();
            modelSelect.appendChild(opt);
        }
    } else {
        modelSelect.disabled = true;
        modelSelect.classList.add('text-slate-500');
        modelSelect.classList.remove('text-slate-200');
        document.getElementById('calcResult').classList.add('hidden');
    }
}

function calculatePrice() {
    const brand = document.getElementById('carBrand').value;
    const model = document.getElementById('carModel').value;
    const resultBox = document.getElementById('calcResult');

    if (brand && model && carData[brand]?.models[model]) {
        const specs = carData[brand].models[model];
        document.getElementById('gasType').innerText = specs.gas;
        document.getElementById('estimatedTime').innerText = specs.time;
        document.getElementById('calcPrice').innerText = `€${specs.price.toFixed(2)}`;
        resultBox.classList.remove('hidden');
    } else {
        resultBox.classList.add('hidden');
    }
}

// --- 2. TABS SERVICES CONTROLLER ---
const tabContent = {
    ac: {
        pre: 'Fase Inicial / Activo',
        title: 'Servicio de Climatización de Alta Precisión',
        desc: 'Nuestras estaciones de carga automáticas inteligentes vacían, verifican la presión por vacío y recargan el coche con la cantidad exacta especificada por el fabricante para evitar daños en el compresor.',
        bullets: [
            'Compatibilidad total con gases R134a y R1234yf.',
            'Inyección de aceite sintético con aditivo UV detector de fugas.',
            'Desinfección premium por ultrasonidos del conducto interno.'
        ],
        img: 'images/Condei.jpg'
    },
    wash: {
        pre: 'Disponible ahora',
        title: 'Autolavado — Lavado Manual Profesional',
        desc: 'Lavado a mano realizado por profesionales. Reserva tu hora online y llégate cuando quieras sin esperar cola. Disponemos de lavado exterior, interior o completo según tus necesidades.',
        bullets: [
            'Lavado exterior a mano con espuma activa, aclarado y secado.',
            'Limpieza interior: aspirado, salpicadero, consola y cristales.',
            'Reserva online — ven a tu hora sin colas ni esperas.',
        ],
        img: 'images/smartwash.jpg'
    },
    app: {
        pre: 'Evolución final de Negocio',
        title: 'Tu coche controlado desde la Palma de tu Mano',
        desc: 'La app SmartFix te avisará automáticamente sobre el ciclo de salud de los consumibles del vehículo y permitirá agendar servicios con un tap. Ofrecerá pagos integrados, cupones dinámicos y acceso prioritario VIP.',
        bullets: [
            'Alertas push tempranas mediante diagnósticos predictivos.',
            'Modo Llaves Express: deja tu coche en cabina y monitoriza el progreso en vivo.',
            'Almacenamiento de pases nativos en Apple Wallet y Google Wallet.'
        ],
        img: 'http://googleusercontent.com/image_collection/image_retrieval/14195716553830122834_0'
    }
};

function switchTab(tabKey) {
    ['ac', 'wash', 'app'].forEach(k => {
        const btn = document.getElementById(`tabBtn-${k}`);
        if (k === tabKey) {
            btn.className = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 bg-brandCyan text-black shadow-cyanGlow";
        } else {
            btn.className = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 bg-white border border-slate-200 text-slate-500 hover:text-slate-900";
        }
    });

    const textContainer = document.getElementById('tabTextContainer');
    const imgElement = document.getElementById('tabImage');

    textContainer.style.opacity = '0';
    imgElement.style.opacity = '0';

    setTimeout(() => {
        const info = tabContent[tabKey];
        const t = translations[currentLang];
        document.getElementById('tabPreTitle').innerText = t[`tab_${tabKey}_pre`] || info.pre;
        document.getElementById('tabTitle').innerText = t[`tab_${tabKey}_title`] || info.title;
        document.getElementById('tabDescription').innerText = t[`tab_${tabKey}_desc`] || info.desc;

        const list = document.getElementById('tabBulletPoints');
        list.innerHTML = '';
        const bullets = [t[`tab_${tabKey}_b1`], t[`tab_${tabKey}_b2`], t[`tab_${tabKey}_b3`]].filter(Boolean).length
            ? [t[`tab_${tabKey}_b1`], t[`tab_${tabKey}_b2`], t[`tab_${tabKey}_b3`]].filter(Boolean)
            : info.bullets;
        bullets.forEach(bullet => {
            const li = document.createElement('li');
            li.className = "flex items-start gap-3";
            li.innerHTML = `
                <span class="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-0.5"><i class="fa-solid fa-check text-xs"></i></span>
                <span class="text-slate-700">${bullet}</span>
            `;
            list.appendChild(li);
        });

        imgElement.src = info.img;

        // Show/hide app card vs real image
        const appCard = document.getElementById('tabAppCard');
        if (tabKey === 'app') {
            imgElement.style.opacity = '0';
            appCard.classList.remove('hidden');
        } else {
            appCard.classList.add('hidden');
            imgElement.style.opacity = '0.9';
        }

        textContainer.style.opacity = '1';
    }, 300);
}

// --- 3. STEP-BY-STEP BOOKING CONTROLLER ---
let bookingState = {
    step: 1,
    serviceCategory: 'ac',
    selectedService: '',       // ID: standard_ac / wash_ext / wash_int / wash_full
    selectedServiceName: '',   // Display name for ticket
    selectedPrice: 0,
    selectedDate: '',
    selectedTime: '',
    clientName: '',
    clientPhone: '',
    clientPlate: ''
};

// ── Date helpers ─────────────────────────────
const LANG_LOCALE = { es: 'es-ES', en: 'en-GB', ru: 'ru-RU' };

function formatDateLabel(isoDate, lang) {
    const d = new Date(isoDate + 'T12:00:00');
    const locale = LANG_LOCALE[lang] || 'es-ES';
    const dayName = d.toLocaleDateString(locale, { weekday: 'short' });
    const dayNum  = d.getDate();
    return `${dayName}\n${dayNum}`;
}

// ── Load working days from server ────────────
function toLocalDateStr(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

async function loadWorkingDays() {
    const container = document.getElementById('dateBtns');
    if (!container) return;
    try {
        const res  = await fetch('/api/working-days');
        const data = await res.json();
        renderDateButtons(data.days);
    } catch {
        // Server not available (local file mode) — generate client-side
        const days = [];
        const d = new Date(); d.setHours(0,0,0,0);
        while (days.length < 9) {
            if (d.getDay() !== 0) days.push(toLocalDateStr(d));
            d.setDate(d.getDate() + 1);
        }
        renderDateButtons(days);
    }
}

function renderDateButtons(days) {
    const container = document.getElementById('dateBtns');
    if (!container) return;
    container.className = 'booking-date-grid grid grid-cols-3 sm:grid-cols-5 gap-1.5';
    container.innerHTML = days.map(iso => {
        const d = new Date(iso + 'T12:00:00');
        const locale = LANG_LOCALE[currentLang] || 'es-ES';
        const dayName = d.toLocaleDateString(locale, { weekday: 'short' });
        const dayNum  = d.getDate();
        return `<button onclick="selectBookingDate('${iso}')"
                    class="date-btn p-2.5 bg-white border border-slate-200 rounded-xl hover:border-sky-400 text-slate-600 hover:text-slate-900 transition-colors text-xs leading-tight">
                    <span class="block font-semibold">${dayName}</span>
                    <span class="date-num block text-base font-bold">${dayNum}</span>
                </button>`;
    }).join('');
}

// ── Generate periodic time slots (e.g. every 60 min from 09:30 to 19:00) ──
function generateTimeRange(startStr, endStr, stepMinutes) {
    const [startH, startM] = startStr.split(':').map(Number);
    const [endH, endM]     = endStr.split(':').map(Number);
    const startMins = startH * 60 + startM;
    const endMins   = endH * 60 + endM;

    const times = [];
    for (let mins = startMins; mins <= endMins; mins += stepMinutes) {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        times.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
    }
    return times;
}

// ── Load available slots from server ─────────
async function loadAvailableSlots(isoDate, service) {
    const container = document.getElementById('timeSlotsBtns');
    if (!container) return;

    container.innerHTML = `<div class="col-span-4 text-slate-400 text-sm py-2 flex items-center gap-2">
        <i class="fa-solid fa-spinner fa-spin text-sky-400"></i> Cargando horarios…</div>`;

    try {
        const res   = await fetch(`/api/available-slots?date=${isoDate}&service=${service}`);
        const data  = await res.json();
        renderTimeSlots(data.slots || []);
    } catch {
        // Server not available — show basic fallback slots
        const cols  = 4;
        const oilSlots = ['09:30','11:00','12:30','14:00','15:30','17:00'];
        const times = service === 'standard_ac'
            ? ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']
            : service === 'wash_full' || service === 'oil_labor' || service === 'oil_full'
            ? oilSlots
            : ['09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
               '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
        renderTimeSlots(times.map(t => ({ time: t, available: true })));
    }
}

function renderTimeSlots(slots) {
    const container = document.getElementById('timeSlotsBtns');
    if (!container) return;

    if (!slots.length) {
        container.innerHTML = `<div class="col-span-4 text-slate-400 text-sm py-3">
            No hay horarios disponibles para este día.</div>`;
        return;
    }

    container.className = 'booking-time-grid grid grid-cols-4 gap-1.5 max-h-52 overflow-y-auto pr-1';

    container.innerHTML = slots.map(s => {
        if (!s.available) {
            return `<button disabled class="time-btn p-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-400 text-xs cursor-not-allowed line-through"
                        title="Ocupado">${s.time}</button>`;
        }
        return `<button onclick="selectBookingTime('${s.time}')"
                    class="time-btn p-2 bg-white border border-slate-200 rounded-xl hover:border-sky-400 text-slate-600 hover:text-slate-900 transition-colors text-xs">${s.time}</button>`;
    }).join('');
}

function switchServiceCategory(cat) {
    bookingState.serviceCategory = cat;
    bookingState.selectedService = '';
    bookingState.selectedServiceName = '';

    const acBtn = document.getElementById('catBtn-ac');
    const washBtn = document.getElementById('catBtn-wash');
    const oilBtn = document.getElementById('catBtn-oil');
    const activeClass = 'px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 bg-brandCyan text-black shadow-cyanGlow transition-all duration-200';
    const inactiveClass = 'px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:border-sky-300 transition-all duration-200';

    // Reset all
    [acBtn, washBtn, oilBtn].forEach(btn => { btn.className = inactiveClass; });
    ['cards-ac', 'cards-wash', 'cards-oil'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    if (cat === 'ac') {
        acBtn.className = activeClass;
        document.getElementById('cards-ac').classList.remove('hidden');
    } else if (cat === 'oil') {
        oilBtn.className = activeClass;
        document.getElementById('cards-oil').classList.remove('hidden');
    } else {
        washBtn.className = activeClass;
        document.getElementById('cards-wash').classList.remove('hidden');
    }

    document.querySelectorAll('.booking-service-card').forEach(card => {
        card.classList.remove('border-brandCyan', 'border-emerald-400');
    });
}

function selectBookingService(serviceId, serviceName, price) {
    bookingState.selectedService     = serviceId;    // ID для API слотов
    bookingState.selectedServiceName = serviceName;  // Название для тикета
    bookingState.selectedPrice = price;

    const cards = document.querySelectorAll('.booking-service-card');
    cards.forEach(card => {
        card.classList.remove('border-brandCyan');
        card.classList.add('border-slate-800');
    });
    event.currentTarget.classList.remove('border-slate-800');
    event.currentTarget.classList.add('border-brandCyan');

    // Show VIN field only for oil_full service
    const vinWrap = document.getElementById('vinFieldWrap');
    if (vinWrap) {
        if (serviceId === 'oil_full') {
            vinWrap.classList.remove('hidden');
        } else {
            vinWrap.classList.add('hidden');
        }
    }
}

function selectBookingDate(isoDate) {
    bookingState.selectedDate = isoDate;
    bookingState.selectedTime = '';

    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.classList.remove('bg-brandCyan', 'text-black', 'border-brandCyan');
    });
    event.currentTarget.classList.add('bg-brandCyan', 'text-black', 'border-brandCyan');

    // Load available slots for this date
    loadAvailableSlots(isoDate, bookingState.selectedService || bookingState.serviceCategory);
}

function selectBookingTime(timeStr) {
    bookingState.selectedTime = timeStr;

    const btns = document.querySelectorAll('.time-btn');
    btns.forEach(btn => btn.classList.remove('bg-brandCyan', 'text-black', 'border-brandCyan'));
    event.currentTarget.classList.add('bg-brandCyan', 'text-black', 'border-brandCyan');
}

function updateStepIndicators() {
    const indicators = document.getElementById('stepIndicator').children;
    for (let i = 0; i < indicators.length; i++) {
        if (i < bookingState.step) {
            indicators[i].classList.remove('bg-slate-800');
            indicators[i].classList.add('bg-brandCyan');
        } else {
            indicators[i].classList.remove('bg-brandCyan');
            indicators[i].classList.add('bg-slate-800');
        }
    }
}

function prevStep() {
    if (bookingState.step > 1) {
        document.getElementById(`step-${bookingState.step}`).classList.add('hidden');
        bookingState.step--;
        document.getElementById(`step-${bookingState.step}`).classList.remove('hidden');

        updateStepIndicators();

        if (bookingState.step === 1) {
            document.getElementById('prevBtn').disabled = true;
        }

        document.getElementById('nextBtn').innerHTML = `Siguiente <i class="fa-solid fa-arrow-right ml-2"></i>`;
        // Re-apply current language
        setLanguage(currentLang);
        document.getElementById('bookingNav').classList.remove('hidden');
    }
}

function nextStep() {
    if (bookingState.step === 1 && !bookingState.selectedService) {
        alert(translations[currentLang].alert_step1);
        return;
    }
    if (bookingState.step === 2 && (!bookingState.selectedDate || !bookingState.selectedTime)) {
        alert(translations[currentLang].alert_step2);
        return;
    }
    if (bookingState.step === 3) {
        const name = document.getElementById('clientName').value.trim();
        const phone = document.getElementById('clientPhone').value.trim();
        const plate = document.getElementById('clientPlate').value.trim();
        if (!name || !phone || !plate) {
            alert(translations[currentLang].alert_step3);
            return;
        }
        bookingState.clientName = name;
        bookingState.clientPhone = phone;
        bookingState.clientPlate = plate;
    }

    if (bookingState.step < 4) {
        document.getElementById(`step-${bookingState.step}`).classList.add('hidden');
        bookingState.step++;
        document.getElementById(`step-${bookingState.step}`).classList.remove('hidden');

        updateStepIndicators();

        // Switch time slots when entering step 2
        if (bookingState.step === 2) {
            bookingState.selectedDate = '';
            bookingState.selectedTime = '';
            loadWorkingDays();
            // Clear time slots until date is selected
            const ts = document.getElementById('timeSlotsBtns');
            if (ts) ts.innerHTML = `<div class="col-span-4 text-slate-400 text-sm py-2">Selecciona primero una fecha</div>`;
        }

        if (bookingState.step === 3) {
            document.getElementById('nextBtn').innerHTML = `${translations[currentLang].book_confirm} <i class="fa-solid fa-circle-check ml-2"></i>`;
        }

        document.getElementById('prevBtn').disabled = false;

        if (bookingState.step === 4) {
            // Format ISO date for display
            const dateObj     = new Date(bookingState.selectedDate + 'T12:00:00');
            const locale      = LANG_LOCALE[currentLang] || 'es-ES';
            const dateDisplay = isNaN(dateObj)
                ? bookingState.selectedDate
                : dateObj.toLocaleDateString(locale, { weekday:'long', day:'numeric', month:'long' });

            document.getElementById('ticketService').innerText = bookingState.selectedServiceName || bookingState.selectedService;
            document.getElementById('ticketName').innerText    = bookingState.clientName;
            document.getElementById('ticketDate').innerText    = dateDisplay;
            document.getElementById('ticketTime').innerText    = `${bookingState.selectedTime} h`;
            document.getElementById('ticketPlate').innerText   = bookingState.clientPlate.toUpperCase();

            // ── Send booking to server ──────────────────
            const serviceNames = {
                standard_ac: 'Recarga AC R134a',
                wash_ext:    'Autolavado Exterior',
                wash_int:    'Limpieza Interior',
                wash_full:   'Lavado Completo (Ext. + Int.)',
                oil_labor:   'Cambio Aceite (Solo Mano de Obra)',
                oil_full:    'Cambio Aceite (Servicio Completo)'
            };
            fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service:         bookingState.selectedService,
                    serviceName:     bookingState.selectedServiceName || bookingState.selectedService,
                    serviceCategory: bookingState.serviceCategory,
                    date:            bookingState.selectedDate,
                    time:            bookingState.selectedTime,
                    name:            bookingState.clientName,
                    phone:           bookingState.clientPhone,
                    plate:           bookingState.clientPlate
                })
            })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => { throw new Error(err.error || 'Error del servidor'); });
                }
                return res.json();
            })
            .then(data => {
                console.log('[Booking] ✅ Reserva creada ID:', data.id);
                document.getElementById('bookingNav').classList.add('hidden');
            })
            .catch(err => {
                console.warn('[Booking] ❌ Error:', err.message);
                alert('Error al crear la reserva: ' + err.message);
                // Возвращаемся на шаг назад
                bookingState.step = 3;
                document.getElementById('step-4').classList.add('hidden');
                document.getElementById('step-3').classList.remove('hidden');
                document.getElementById('bookingNav').classList.remove('hidden');
            });
        }
    }
}
