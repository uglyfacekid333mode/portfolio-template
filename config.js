/* =====================================================================
   ПУСТОЙ ШАБЛОН ПОРТФОЛИО (для продажи / под клиента)
   Все поля — плейсхолдеры «впиши своё». Заполняется в редакторе.
   ===================================================================== */

const CONFIG = {

  theme: {
    brand:    "#6366f1",  // поменяйте под свой бренд
    brand2:   "#22d3ee",
    accent:   "#fbbf24",
    bg:       "#0a0a14",
    text:     "#eef2f7",
  },

  logo: {
    image: "",            // assets/logo.png — ваш логотип
    autoResize: true,
    maxHeight: 40,
    name: "ВАШ",
    nameAccent: "ЛОГО",
  },

  brand: { full: "Ваш бренд" },

  contact: {
    phone: "Ваш телефон",
    phoneDial: "+70000000000",
    whatsapp: "70000000000",
    viberPhone: "70000000000",
    email: "ваш@email.com",
    address: "Ваш город",
    hours: "Время работы",
  },

  // Пример всех интеграций — замените на свои или очистите "" чтобы скрыть.
  links: {
    instagram: "https://instagram.com/",
    telegram:  "https://t.me/",
    whatsappLink: "",
    viber:     "",
    twogis:    "https://2gis.kz/",
    tiktok:    "https://tiktok.com/",
    youtube:   "https://youtube.com/",
    vk:        "https://vk.com/",
    facebook:  "https://facebook.com/",
  },

  map: { embedUrl: "" },

  hero: {
    eyebrow: "Ваша надпись сверху",
    titleLine1: "Ваш заголовок —",
    titleAccent: "впишите здесь.",
    subtitle: "Ваш подзаголовок: коротко опишите, что вы предлагаете и почему стоит выбрать именно вас.",
    ctaPrimary: "Кнопка 1",
    ctaSecondary: "Кнопка 2",
  },

  stats: [
    { number: 100, suffix: "+", label: "Показатель 1" },
    { number: 10,  suffix: "+", label: "Показатель 2" },
    { number: 100, suffix: "%", label: "Показатель 3" },
  ],

  services: [
    { icon: "✦", title: "Услуга 1", text: "Краткое описание услуги.", price: "от 0 ₸" },
    { icon: "◈", title: "Услуга 2", text: "Краткое описание услуги.", price: "от 0 ₸" },
    { icon: "❖", title: "Услуга 3", text: "Краткое описание услуги.", price: "от 0 ₸" },
    { icon: "◇", title: "Услуга 4", text: "Краткое описание услуги.", price: "от 0 ₸" },
    { icon: "✧", title: "Услуга 5", text: "Краткое описание услуги.", price: "от 0 ₸" },
    { icon: "⬡", title: "Услуга 6", text: "Краткое описание услуги.", price: "от 0 ₸" },
  ],

  media: { autoResize: true, fit: "cover" },
  gallery: [
    { img: "assets/work1.svg", cat: "landing",   size: "tall", caption: "Лендинг кофейни" },
    { img: "assets/work2.svg", cat: "shop",      size: "",     caption: "Магазин косметики" },
    { img: "assets/work3.svg", cat: "portfolio", size: "",     caption: "Портфолио фотографа" },
    { img: "assets/work4.svg", cat: "landing",   size: "",     caption: "Лендинг фитнес-клуба" },
    { img: "assets/work5.svg", cat: "shop",      size: "wide", caption: "Магазин одежды" },
    { img: "assets/work6.svg", cat: "portfolio", size: "",     caption: "Портфолио архитектора" },
    { img: "assets/work7.svg", cat: "landing",   size: "",     caption: "Лендинг услуги" },
    { img: "assets/work8.svg", cat: "shop",      size: "tall", caption: "Сайт стоматологии" },
  ],

  beforeAfter: { before: "assets/before.svg", after: "assets/after.svg" },

  whatsappPrefill: "Здравствуйте! Пишу с вашего сайта.",

  text: {
    navServices: "Услуги", navWork: "Работы", navProcess: "Процесс",
    navReviews: "Отзывы", navBook: "Связаться", scroll: "Листайте",
    marquee: ["Пункт 1", "Пункт 2", "Пункт 3", "Пункт 4", "Пункт 5", "Пункт 6"],
    statCars: "Показатель 1", statYears: "Показатель 2", statSatisfaction: "Показатель 3",
    servicesEyebrow: "Надпись", servicesTitle: "Заголовок раздела «Услуги»",
    baEyebrow: "Надпись", baTitle: "Заголовок «До / После»",
    baBefore: "До", baAfter: "После",
    workEyebrow: "Надпись", workTitle: "Заголовок раздела «Работы»",
    processEyebrow: "Надпись", processTitle: "Заголовок раздела «Процесс»",
    reviewsEyebrow: "Надпись", reviewsTitle: "Заголовок раздела «Отзывы»",
    contactEyebrow: "Надпись", contactTitle: "Заголовок раздела «Контакты»",
    contactText: "Текст: пригласите оставить заявку.",
    mapEyebrow: "", mapTitle: "",
    filterAll: "Все", filterExotic: "Категория 1", filterDaily: "Категория 2", filterInterior: "Категория 3",
    labelStudio: "Адрес", labelPhone: "Телефон", labelHours: "Время",
    formName: "Имя", formPhone: "Телефон", formVehicle: "Тема обращения",
    formService: "Услуга", formMessage: "Сообщение",
    formSubmit: "Отправить", formNote: "Спасибо! Сообщение отправлено.",
    footerTagline: "Ваш слоган здесь.",
  },

  process: [
    { no: "01", title: "Шаг 1", text: "Описание шага." },
    { no: "02", title: "Шаг 2", text: "Описание шага." },
    { no: "03", title: "Шаг 3", text: "Описание шага." },
    { no: "04", title: "Шаг 4", text: "Описание шага." },
  ],

  reviews: [
    { text: "Текст отзыва клиента.", name: "Имя", car: "Компания" },
    { text: "Текст отзыва клиента.", name: "Имя", car: "Компания" },
    { text: "Текст отзыва клиента.", name: "Имя", car: "Компания" },
  ],
};

window.CONFIG = CONFIG;
