// ==========================================================================
//  "БАЗА ДАННЫХ" СТАТЕЙ. 
// ==========================================================================
const newsData = [
    {
        id: 1,
        title: "Состоялась Всероссийская конференция «Универсальные услуги связи: экономика, развитие сетей и совершенствование механизма универсальной услуги. Итоги работы»",
        date: "20 Сентября 2012",
        category: "tech",
        image: "Фото/news1/imag0390.jpg", 
        excerpt: "14 сентября в г. Адлер Краснодарского края завершила свою работу всероссийская конференция «Универсальные услуги связи...",
        content: "14 сентября в г. Адлер Краснодарского края завершила свою работу всероссийская конференция «Универсальные услуги связи: экономика, развитие сетей и совершенствование механизма универсальной услуги. Итоги работы».  В работе конференции приняли участие представители Минкомсвязи России, Роскомнадзора, Россвязи, операторов универсального обслуживания и производителей телекоммуникационного оборудования. Наша компания представила всю линейку устройств для оказания универсальных услуг и получила высокую оценку от участников и президиума конференции. С докладном о деятельности компании и планах по развитию оборудования УУС выступил заместитель генерального директора Оборин Р.В."
    },
    {
        id: 2,
        title: "Завершилась выставка Связь-Экспоком-2012",
        date: "23 Мая 2012",
        category: "events",
        image: "Фото/1гал/_--2012_20120522_1326643761.jpg",
        excerpt: "В Экспоцентре на Красной Пресне завершила свою работу 24-я международная выставка телекоммуникационного оборудования...",
        content: "В Экспоцентре на Красной Пресне завершила свою работу 24-я международная выставка телекоммуникационного оборудования, систем управления, информационных технологий и услуг связи «Связь-Экспокомм-2012». Наша компания представила оборудование и систему управления для организации услуг 'Видеосвидание' и 'Военсвязь', линейку оборудования для оказания 'Универсальных услуг связи'. Большой интерес гостей выставки вызвали новые модели устройств для спутникового мониторинга местоположения, такие как персональный трекер и ошейник для  собак со встроенным Глонасс/GPS-трекером."
    },
    {
        id: 3,
        title: "Канал для видеосвязи с осужденными: Ну вот уже ответили: «В натуре, это я!»",
        date: "11 Апреля 2012",
        category: "updates",
        image: "Фото/news3/moskva.jpg",
        excerpt: "В Москве появилась новая услуга: при звонке в места не столь отдаленные близких можно не только слышать, но и видеть...",
        content: "В Москве появилась новая услуга: при звонке в места не столь отдаленные близких можно не только слышать, но и видеть. Из подмосковного Орехова-Зуева пенсионерка Алла Решетникова добиралась больше трех часов. Но потраченного времени, говорит, нисколько не жаль. Младшего брата Андрея не видела уже два года, а выбраться на свидание с ним в колонию в Мордовии практически невозможно: мать больна, да и финансы не шибко-то позволяют. Сидя у монитора с телефонной трубкой, женщина заметно волнуется, а когда появляется изображение, вдруг срывается... - Андрюша! - только и повторяет Алла Егоровна сквозь слезы, которые никак не удается сдержать."
    },
    {
        id: 4,
        title: "Позвони мне, позвони! В челябинских колониях появились видеотелефоны",
        date: "30 Марта 2012",
        category: "tech",
        image: "Фото/news4/tzqahsngkngmlaaytkxo.jpg",
        excerpt: "Колонии на связи. Сегодня на Южном Урале прошел первый сеанс 'Видеосвиданий' между осужденными и их родственниками...",
        content: "Колонии на связи. Сегодня на Южном Урале прошел первый сеанс 'Видеосвиданий' между осужденными и их родственниками. Теперь через специальный терминал встречаться с близкими можно каждый день. Графики свиданий и километры помехой не станут, а посылку можно будет отправлять через Интернет. Первый сеанс видеосвидания прошел удачно. Интернет состыковал челябинскую женскую колонию №5 и здание ГУ ФСИН, где взволнованные родственники следили за происходящим, словно за первым полетом человека в космос. Ведь это еще одна возможность встретиться с близкими, находящимися в заключении."
    },
    {
        id: 5,
        title: "Видеосвидание в Татарстане",
        date: "28 Октября 2011",
        category: "updates",
        image: "Фото/news5/tatarstan.jpg",
        excerpt: "20 октября 2011 года Администратор услуги 'Видеосвидание' - ЗАО 'Интеллектуальные системы и технологии' - совместно с УФСИН России по Республике Татарстан организовало...",
        content: "20 октября 2011 года Администратор услуги 'Видеосвидание' - ЗАО 'Интеллектуальные системы и технологии' - совместно с УФСИН России по Республике Татарстан организовало официальное открытие услуги 'Видеосвидание'.В рамках официального открытия услуги в ИК-19 (г.Казань)в присутствии средств массовой информации было проведено несколько сеансов видеосвязи родственников с осужденными из исправительных учреждений Татарстана и Пермского края."
    },
    {
        id: 6,
        title: "Видеосвязь для военнослужащих",
        date: "30 Сентября 2011",
        category: "tech",
        image: "Фото/news6/dsc01079.jpg",
        excerpt: "27.09.11 на полигоне Чебаркуль прошел заключительный этап стратегических военных учений 'Центр-2011'. Силами специалистов ЗАО...",
        content: "27.09.11 на полигоне Чебаркуль прошел заключительный этап стратегических военных учений 'Центр-2011'. Силами специалистов ЗАО 'Интеллектуальные системы и технологии' и ООО 'Компьютерные коммуникационные системы' на наблюдательной вышке полигона был установлен терминал для проведения сеансов видеосвязи военнослужащих с родственниками. Кроме того, терминал обеспечивал доступ в интернет, работу с электронной почтой и фотографирование. В этот день более 30 военнослужащих и гостей смогли оценить работу видеотерминала и даже пообщаться со своими родными и близкими по видеосвязи. Видеотерминал был представлен Верховному Главнокомандующему - Президенту Российской Федерации Медведеву Д.А."
    },
     {
        id: 7,
        title: "В Самарской области тестируют электронные браслеты для осужденных",
        date: "24 Декабря 2010",
        category: "tech",
        image: "Фото/news7/o_480749.jpg",
        excerpt: "В Самарской области началось тестирование первых отечественных электронных браслетов для осужденных....",
        content: "В Самарской области началось тестирование первых отечественных электронных браслетов для осужденных. До этого экспериментировали с израильскими аппаратами контроля, однако отечественные разработки оказались куда более эффективными и, что не менее важно, дешевле зарубежного аналога. Браслет, которые осужденные по нетяжким статьям, будут носить на ноге, способен отследить приближение его обладателя к запрещенным местам, например, к ресторанам или дискотекам, а также подать сигнал опасности."
    }
];

// Настройки отображения
const INITIAL_CARDS_COUNT = 3; // Сколько карточек показывать на главной изначально 

// DOM элементы
const mainNewsGrid = document.getElementById('main-news-grid');
const loadAllNewsBtn = document.getElementById('load-all-news-btn');
const newsReader = document.getElementById('news-reader');
const closeReaderBtn = document.getElementById('close-reader');
const sidebarNewsList = document.getElementById('sidebar-news-list');
const activeArticleContent = document.getElementById('active-article-content');
const categoryFilter = document.getElementById('category-filter');

let currentFilteredNews = [...newsData];

// ==========================================================================
// ИНИЦИАЛИЗАЦИЯ И ЛОГИКА
// ==========================================================================

// Рендерим карточки на главной
function renderMainGrid(limit = INITIAL_CARDS_COUNT) {
    mainNewsGrid.innerHTML = '';
    const itemsToRender = newsData.slice(0, limit);
    
    itemsToRender.forEach(news => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${news.image}" alt="${news.title}" class="card-img">
            <div class="card-info">
                <span class="card-date">${news.date}</span>
                <h3 class="card-title">${news.title}</h3>
                <p class="card-excerpt">${news.excerpt}</p>
                <button class="card-btn" onclick="openReader(${news.id})">Подробнее</button>
            </div>
        `;
        mainNewsGrid.appendChild(card);
    });
}

// Рендер сайдбара внутри ридера
function renderSidebar(articles) {
    sidebarNewsList.innerHTML = '';
    articles.forEach(news => {
        const item = document.createElement('div');
        item.className = 'sidebar-item';
        item.id = `sidebar-item-${news.id}`;
        item.innerHTML = `
            <img src="${news.image}" alt="" class="sidebar-thumb">
            <div class="sidebar-info">
                <h4 class="sidebar-title">${news.title}</h4>
                <span class="card-date">${news.date}</span>
            </div>
        `;
        item.onclick = () => selectArticle(news.id);
        sidebarNewsList.appendChild(item);
    });
}

// Открытие статьи во весь экран (Nvidia-style)
function openReader(articleId) {
    newsReader.classList.add('active');
    document.body.style.overflow = 'hidden'; // Запрещаем скролл под ридером
    
    // Сбрасываем фильтр при открытии
    categoryFilter.value = 'all';
    currentFilteredNews = [...newsData];
    
    renderSidebar(currentFilteredNews);
    selectArticle(articleId);
}

// Выбор конкретной статьи для отображения по центру
function selectArticle(id) {
    const article = newsData.find(n => n.id === id);
    if (!article) return;

    // Подсветка активной статьи в сайдбаре
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    const activeSidebarItem = document.getElementById(`sidebar-item-${id}`);
    if (activeSidebarItem) activeSidebarItem.classList.add('active');

    // Отрисовка контента
    activeArticleContent.innerHTML = `
        <div class="article-max-width">
            <img src="${article.image}" alt="${article.title}" class="article-main-img">
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">Опубликовано: ${article.date} | Категория: ${article.category.toUpperCase()}</div>
            <div class="article-text">${article.content}</div>
        </div>
    `;
    
    // Скроллим контент вверх
    activeArticleContent.scrollTop = 0;
}

// Кнопка "Показать все" на главной
loadAllNewsBtn.addEventListener('click', () => {
    renderMainGrid(newsData.length);
    loadAllNewsBtn.style.display = 'none'; // Прячем кнопку, так как всё открыли
});

// Кнопка "Назад к ленте"
closeReaderBtn.addEventListener('click', () => {
    newsReader.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем скролл главной странице
});

// Фильтр по категориям внутри ридера
categoryFilter.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value === 'all') {
        currentFilteredNews = [...newsData];
    } else {
        currentFilteredNews = newsData.filter(n => n.category === value);
    }
    
    renderSidebar(currentFilteredNews);
    
    // Если в отфильтрованном списке есть статьи, автоматически открываем первую из них
    if (currentFilteredNews.length > 0) {
        selectArticle(currentFilteredNews[0].id);
    } else {
        activeArticleContent.innerHTML = '<p style="text-align:center; padding-top:50px;">В этой категории пока нет новостей.</p>';
    }
});


async function initNewsPage() {
    try {
        const response = await fetch('/api/news');
        const serverData = await response.json();
        
        // Обновляем локальный массив страницы актуальными данными с сервера
        newsData.length = 0; 
        serverData.forEach(item => newsData.push(item));
    } catch(e) {
        console.error("Ошибка синхронизации данных:", e);
    }

    // Отрисовываем сетку карточек на странице новостей
    renderMainGrid();

    // Проверяем, есть ли в адресной строке маркер статьи от поиска
    const urlParams = new URLSearchParams(window.location.search);
    const articleIdParam = urlParams.get('articleId');

    if (articleIdParam) {
        const targetId = parseInt(articleIdParam);
        // Если ID валидный — открываем ридер
        if (newsData.some(n => n.id === targetId)) {
            openReader(targetId);
        }
    }
}

// Запуск страницы новостей
initNewsPage();