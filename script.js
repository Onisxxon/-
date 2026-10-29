document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. ДИНАМИЧЕСКАЯ ШАПКА ПРИ СКРОЛЛЕ
    // ==========================================================================
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // ==========================================================================
    // 2. АСИНХРОННАЯ ЗАГРУЗКА НОВОСТЕЙ (СТРАНИЦА НОВОСТЕЙ)
    // ==========================================================================
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        async function loadNews() {
            try {
                const response = await fetch('/api/news');
                const news = await response.json();
                newsContainer.innerHTML = '';

                news.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'news-card';
                    card.innerHTML = `
                        <div class="news-card-content">
                            <span class="news-date">${item.date}</span>
                            <h3>${item.title}</h3>
                            <p>${item.desc}</p>
                            <a href="#" class="news-link">Подробнее →</a>
                        </div>
                    `;
                    newsContainer.appendChild(card);
                });
            } catch (error) {
                newsContainer.innerHTML = '<div class="loading">Не удалось загрузить новости.</div>';
            }
        }
        loadNews();
    }

    // ==========================================================================
    // 3. ЛОГИКА БОКОВОГО МЕНЮ (SIDEBAR)
    // ==========================================================================
    const openSidebarBtn = document.getElementById('open-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('site-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

    function toggleSidebar() {
        if (!sidebar || !backdrop) return;
        sidebar.classList.toggle('active');
        backdrop.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    if (openSidebarBtn) openSidebarBtn.addEventListener('click', toggleSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', toggleSidebar);
    if (backdrop) backdrop.addEventListener('click', toggleSidebar);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });

    // ==========================================================================
    // 4. ЛОГИКА МОДАЛЬНЫХ ОКНООК
    // ==========================================================================
    const modalCall = document.getElementById('modal-call');
    const modalQuestion = document.getElementById('modal-question');
    const modalSearch = document.getElementById('modal-search');

    function openModal(modal) { if (modal) modal.classList.add('active'); }
    function closeModal(modal) { if (modal) modal.classList.remove('active'); }

    const btnCallTop = document.getElementById('btn-call-top');
    const btnCallSidebar = document.getElementById('btn-call-sidebar');
    const btnQuestionOpen = document.getElementById('btn-question-open');
    const btnSearchOpen = document.getElementById('btn-search-open');

    if (btnCallTop) btnCallTop.addEventListener('click', () => openModal(modalCall));
    if (btnCallSidebar) {
        btnCallSidebar.addEventListener('click', () => {
            toggleSidebar(); 
            openModal(modalCall);
        });
    }
    if (btnQuestionOpen) btnQuestionOpen.addEventListener('click', () => openModal(modalQuestion));
    if (btnSearchOpen) btnSearchOpen.addEventListener('click', () => openModal(modalSearch));

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        const closeX = overlay.querySelector('.modal-close');
        if (closeX) {
            closeX.addEventListener('click', () => closeModal(overlay));
        }
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });

    // ==========================================================================
    // 5. ЛОГИКА ПОИСКА
    // ==========================================================================
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('btn-search-execute');
    const searchResultsContainer = document.getElementById('search-results');

    if (searchInput && searchBtn && searchResultsContainer) {
        async function performSearch() {
            const query = searchInput.value.trim();
            if (!query) return;

            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const results = await response.json();
                searchResultsContainer.innerHTML = '';

                if (results.length === 0) {
                    searchResultsContainer.innerHTML = '<p style="padding: 12px; color: #888;">Ничего не найдено</p>';
                    return;
                }

                results.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'search-item';
                    div.innerHTML = `
                        <strong style="color: #fff;">${item.title}</strong>
                        <p style="font-size: 0.85rem; color: #888; margin: 4px 0 0 0;">${item.excerpt}</p>
                    `;
                    div.onclick = () => {
                        window.location.href = `/news.html?articleId=${item.id}`;
                    };
                    searchResultsContainer.appendChild(div);
                });
            } catch (err) {
                console.error('Ошибка поиска:', err);
            }
        }

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // ==========================================================================
    // 6. ОТПРАВКА ДАННЫХ ФОРМ (FETCH)
    // ==========================================================================
    const formCall = document.getElementById('form-call');
    if (formCall) {
        formCall.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formCall);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/callback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (result.success) {
                    alert('Успешно! Мы скоро свяжемся с вами.');
                    formCall.reset();
                    closeModal(modalCall);
                }
            } catch (error) {
                alert('Ошибка при отправке заявки.');
            }
        });
    }

    const formQuestion = document.getElementById('form-question');
    if (formQuestion) {
        formQuestion.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formQuestion);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/question', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (result.success) {
                    alert('Вопрос отправлен на рассмотрение, ожидайте обратной связи от менеджера!');
                    formQuestion.reset();
                    closeModal(modalQuestion);
                }
            } catch (error) {
                alert('Ошибка при отправке вопроса.');
            }
        });
    }

    // ==========================================================================
    // 7. НОВОСТИ НА ГЛАВНОЙ СТРАНИЦЕ (БЫСТРЫЙ ПРОСМОТР)
    // ==========================================================================
    const mainPageNewsGrid = document.getElementById('main-page-news-grid');
    const homepageReader = document.getElementById('homepage-news-reader');
    const closeHomepageReader = document.getElementById('close-homepage-reader');
    const homepageActiveContent = document.getElementById('homepage-active-content');

    if (mainPageNewsGrid) {
        let localNewsArray = [];
        async function loadMainPageNews() {
            try {
                const response = await fetch('/api/news');
                localNewsArray = await response.json();
                mainPageNewsGrid.innerHTML = '';
                
                const latestNews = localNewsArray.slice(0, 3);
                
                latestNews.forEach(news => {
                    const card = document.createElement('div');
                    card.className = 'news-card';
                    card.style.cssText = "background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;";
                    
                    const btnStyle = "width: 100%; margin-top: auto; background: transparent; border: 1px solid var(--accent); color: #ffffff; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95rem; letter-spacing: 0.3px; transition: all 0.2s ease; text-align: center;";

                    card.innerHTML = `
                        <div style="height: 200px; background: #1a1a1a;">
                            <img src="${news.image}" alt="${news.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'">
                        </div>
                        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                            <span style="font-size: 0.85rem; color: #3b82f6; font-weight: 600; margin-bottom: 10px; text-transform: uppercase;">${news.date}</span>
                            <h3 style="font-size: 1.25rem; color: #fff; margin-bottom: 12px; line-height: 1.4;">${news.title}</h3>
                            <p style="color: #9ca3af; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px; flex-grow: 1;">${news.excerpt}</p>
                            <button class="accent-btn" data-id="${news.id}" 
                                style="${btnStyle}"
                                onmouseenter="this.style.backgroundColor='var(--accent)'; this.style.boxShadow='0 0 15px rgba(59, 130, 246, 0.4)'"
                                onmouseleave="this.style.backgroundColor='transparent'; this.style.boxShadow='none'">
                                Подробнее
                            </button>
                        </div>
                    `;
                    mainPageNewsGrid.appendChild(card);
                });

                mainPageNewsGrid.querySelectorAll('.accent-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = parseInt(e.target.getAttribute('data-id'));
                        const article = localNewsArray.find(n => n.id === id);
                        if (article && homepageActiveContent && homepageReader) {
                            homepageActiveContent.innerHTML = `
                                <img src="${article.image}" alt="${article.title}" class="article-main-img" onerror="this.style.display='none'">
                                <h1 class="article-title">${article.title}</h1>
                                <div class="article-meta">Опубликовано: ${article.date}</div>
                                <div class="article-text">${article.content}</div>
                            `;
                            homepageReader.classList.add('active');
                            document.body.style.overflow = 'hidden';
                        }
                    });
                });

            } catch (err) {
                console.error('Ошибка загрузки новостей на главной:', err);
                mainPageNewsGrid.innerHTML = '<p>Не удалось загрузить новости</p>';
            }
        }
        loadMainPageNews();
    }

    if (closeHomepageReader) {
        closeHomepageReader.addEventListener('click', () => {
            homepageReader.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ==========================================================================
    // 8. УНИВЕРСАЛЬНЫЙ ЛАЙТБОКС ДЛЯ ВСЕХ ГАЛЕРЕЙ 
    // ==========================================================================
    const lightbox = document.getElementById("lightbox-overlay");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCounter = document.getElementById("lightbox-counter");
    
    const closeLightboxBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    
    let activePhotoset = []; 
    let currentIdx = 0;

    function openLightbox(index) {
        if (!lightbox || activePhotoset.length === 0) return;
        currentIdx = index;
        updateLightboxContent();
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function showNext() {
        if (activePhotoset.length <= 1) return;
        currentIdx = (currentIdx + 1) % activePhotoset.length;
        updateLightboxContent();
    }

    function showPrev() {
        if (activePhotoset.length <= 1) return;
        currentIdx = (currentIdx - 1 + activePhotoset.length) % activePhotoset.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        if (!lightboxImg) return;
        const currentData = activePhotoset[currentIdx];
        
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            const src = currentData.src || currentData.img || currentData.image || '';
            const alt = currentData.desc || currentData.title || '';
            
            lightboxImg.setAttribute('src', src);
            lightboxImg.setAttribute('alt', alt);
            
            if (lightboxCaption) lightboxCaption.textContent = alt;
            if (lightboxCounter) lightboxCounter.textContent = `${currentIdx + 1} из ${activePhotoset.length}`;
            
            lightboxImg.style.opacity = 1;
        }, 100);
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
    if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNext(); });
    if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrev(); });

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-wrapper') || e.target.classList.contains('lightbox-image-box')) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (!lightbox || !lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });

    // --- Привязка Галереи Альбомов к Лайтбоксу ---
    const galleryData = [
        {
            preview: "Фото/1гал/_--2012_20120522_1569378124.jpg",
            title: "Выставка Связь-Экспокомм-2012",
            images: [
                { src: "Фото/1гал/_--2012_20120522_1569378124.jpg", desc: "" },
                { src: "Фото/1гал/_--2012_20120522_1251823466.jpg", desc: "" },
                { src: "Фото/1гал/_--2012_20120522_1716039350.jpg", desc: "" },
                { src: "Фото/1гал/_--2012_20120522_1449483026.jpg", desc: "" },
                 { src: "Фото/1гал/_--2012_20120522_1326643761.jpg", desc: "" }
            ]
        },
        {
            preview: "Фото/2гал/expo_2_20110513_1494879748.jpg",
            title: "Выставка Связь-Экспокомм-2011",
            images: [
                { src: "Фото/2гал/expo_2_20110513_1494879748.jpg", desc: "" },
                 { src: "Фото/2гал/expo_3_20110513_1924030656.jpg", desc: "" },
                  { src: "Фото/2гал/expo_4_20110513_1958391935.jpg", desc: "" },
                   { src: "Фото/2гал/expo_5_20110513_1343790740.jpg", desc: "" },
                    { src: "Фото/2гал/expo_7_20110513_1676912033.jpg", desc: "" }
            ]
        },
        {
            preview: "Фото/3гал/____20101126_1784481327.jpg",
            title: "Выборы администратора услуги Видеосвидание",
            images: [
                { src: "Фото/3гал/____20101126_1784481327.jpg", desc: "" },
                { src: "Фото/3гал/____20101126_2005039705.jpg", desc: "" },
                { src: "Фото/3гал/____20101126_1977727166.jpg", desc: "" },
                 { src: "Фото/3гал/____20101126_1540420416.jpg", desc: "" },
                  { src: "Фото/3гал/____20101126_1520506661.jpg", desc: "" }
            ]
        },
         {
            preview: "Фото/4гал/___20101112_1727351616.jpg",
            title: "Выставка в Пятигорскее",
            images: [
                { src: "Фото/4гал/___20101112_1727351616.jpg", desc: "" },
                { src: "Фото/4гал/___20101112_1006436809.jpg", desc: "" },
                { src: "Фото/4гал/___20101112_1942023801.jpg", desc: "" },
                 { src: "Фото/4гал/___20101112_1666981712.jpg", desc: "" },
                  { src: "Фото/4гал/___20101112_1462603025.jpg", desc: "" }
            ]
        },
         {
            preview: "Фото/5гал/___20120330_1468296910.jpg",
            title: "Наши мероприятия",
            images: [
                { src: "Фото/5гал/___20120330_1468296910.jpg", desc: " Открытие услуги Видеосвидание в Челябинске (10) " },
                { src: "Фото/5гал/____20120321_1154908782.jpg", desc: "Открытие услуги Видеосвидание в г. Уфа (5) " },
                { src: "Фото/5гал/__20120321_1291935289.jpg", desc: " Открытие услуги Видеосвидание на Центральном телеграфе в г. Москва (12)  " },
                 { src: "Фото/5гал/________20120305_1678514795.jpg", desc: "Рабочее совещание по вопросам внедрения услуги Видеосвидание в Республике Мордовия (7)  " }
                
            ]
        }
    ];

    const grid = document.getElementById("gallery-grid");
    if (grid) {
        grid.innerHTML = galleryData.map((album, index) => `
            <div class="gallery-item-card" data-album-index="${index}" style="cursor: pointer;">
                <div class="gallery-img-wrapper">
                    <img src="${album.preview}" alt="${album.title}" loading="lazy">
                </div>
                <div class="gallery-item-desc">
                    <p style="padding: 10px; font-weight: 500;">📁 ${album.title} (${album.images.length} фото)</p>
                </div>
            </div>
        `).join('');

        grid.addEventListener("click", (e) => {
            const card = e.target.closest(".gallery-item-card");
            if (card) {
                const albumIdx = parseInt(card.getAttribute("data-album-index"), 10);
                activePhotoset = galleryData[albumIdx].images; 
                openLightbox(0);
            }
        });
    }

    // --- Привязка Карт к Лайтбоксу ---
    const aboutMaps = document.querySelectorAll(".about-map-item");
    if (aboutMaps.length > 0) {
        const mapsPhotoset = [];
        aboutMaps.forEach(item => {
            const img = item.querySelector("img");
            const span = item.querySelector("span");
            if (img) {
                mapsPhotoset.push({
                    src: img.getAttribute("src"),
                    desc: span ? span.textContent : "Карта"
                });
            }
        });

        aboutMaps.forEach((item, index) => {
            item.style.cursor = "pointer";
            item.addEventListener("click", () => {
                activePhotoset = mapsPhotoset; 
                openLightbox(index); 
            });
        });
    }

    // --- Привязка Галереи Проектов к Лайтбоксу ---
    const projectImages = Array.from(document.querySelectorAll('.projects-images-grid .project-gallery-item img'));
    if (projectImages.length > 0) {
        projectImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                activePhotoset = projectImages.map(i => ({
                    src: i.getAttribute('src'),
                    desc: i.getAttribute('alt') || 'Фото проекта'
                }));
                openLightbox(index);
            });
        });
    }

    // ==========================================================================
    // 9. СТРАНИЦА ПРОДУКЦИИ: ЕДИНАЯ ИНТЕРАКТИВНАЯ БАЗА ДАННЫХ ДЛЯ ДВУХ ЭКРАНОВ
    // ==========================================================================
    const productCatalogDB = {
        taxophones: {
            categoryTitle: "Таксофонное оборудование",
            models: [
                {
                    id: "tm-gsm",
                    name: "Таксофон ИСТ-001 (CDMA)",
                    status: "Доступно для заказа / обслуживания",
                    image: "Фото/tax/ist_002.jpg", 
                    description: "Универсальный карточный таксофон ИСТ-001 (CDMA)   (имеет декларацию соответствия и сертификат об утверждении типа средств измерений), работающий в системе сотовой связи, обеспечивает возможность осуществления местной, междугородной и международной телефонной связи. Работает в сотовых сетях стандарта IMT-MC-450/CDMA.",
                    features: [
                        "Антивандальный стальной корпус повышенной прочности.",
                        "Питание от автономных источников или солнечных батарей.",
                        "Поддержка экстренных вызовов (112) без установки SIM-карты."
                    ]
                },
                {
                    id: "satellite",
                    name: "ИСТ-002 (IP)",
                    status: "Доступно для заказа / обслуживания",
                    image: "Фото/tax/ist_002.jpg", 
                    description: "IP-таксофон является модификацией универсального таксофона ИСТ-002 (IP) предназначен для работы в существующих VoIP сетях, что обеспечивает предоставление дешевого VoIP трафика (особенно для междугороднего и международного соединения). Кроме этого IP-таксофон  адаптирован к системам спутниковой связи Gilat DialAw@yIP, ViaSat LinkStar и Gilat SkyStar 360E и предназначен для  регионов и населенных пунктов, где возможно использование только спутниковых систем связи.",
                    features: [
                        "Работа через современные спутниковые терминалы в экстремальных условиях.",
                        "Встроенная плата и модули повышенной надежности для работы при температурах от -40 до +50 °C.",
                        "Жидкокристаллический дисплей с яркой подсветкой, защищенный бронестеклом."
                    ]
                }
                
            ]
        },
        terminals: {
            categoryTitle: "Интернет-терминалы (ПКД)",
            models: [
                {
                    id: "pkd-1",
                    name: "Видеотерминал ИСТ – «ГОСУСЛУГИ»",
                    status: "Доступно для заказа",
                    image: "Фото/tel/uus.png",
                    description: "Терминал представляет собой устройство в защищенном исполнении на базе персонального компьютера, оснащенного Web-камерой и таксофонной трубкой; имеет все необходимые патенты и сертификаты. ",
                    features: [
                        "Сенсорный антивандальный экран Triplex Glass.",
                        "Встроенные средства криптографической защиты данных.",
                        "Стабильная работа в непрерывном круглосуточном режиме."
                    ]
                },
                 {
                    id: "pkd-2",
                    name: "Информационно-справочный (правовой) терминал ИСТ для исправительных учреждений ФСИН России",
                    status: "Доступно для заказа",
                    image: "Фото/tel/term.png",
                    description: "Информационно-справочный терминал ИСТ предоставляет осужденным доступ к информации и справочно-правовым ресурсам и личной информации осужденного. ",
                    features: [
                        "Сенсорный антивандальный экран Triplex Glass.",
                        "Встроенные средства криптографической защиты данных.",
                        "Стабильная работа в непрерывном круглосуточном режиме."
                    ]
                }
            ]
        },
        software: {
            categoryTitle: "IP-телефония",
            models: [
                {
                    id: "tcu-soft",
                    name: "Абонентское устройство 'Видеоколлегия'",
                    status: "Актуальная версия ПО",
                    image: "Фото/apo/vk1.png",
                    description: "Абонентское устройство 'Видеоколлегия' предназначено для обеспечения видеосвязи по IP-сетям.",
                    features: [
                        "Контроль. Визуальный контроль восприятия предаваемой информации.",
                        "Простота использования. Видеозвонок осуществляется аналогично обычному аудиозвонку.",
                        "Интеграция с биллинговыми системами операторов связи."
                    ]
                }
            ]
        }
      
    };

    // Селекторы экранов каталога product.html
    const categoriesScreen = document.getElementById('product-categories-screen');
    const modelsScreen = document.getElementById('product-models-screen');
    const btnBackToCategories = document.getElementById('btn-back-to-prod-categories');
    const currentCategoryCrumb = document.getElementById('prod-current-category-title');
    const menuDynamicTitle = document.getElementById('model-menu-dynamic-title');
    const dynamicModelsList = document.getElementById('dynamic-models-list');

    // Селекторы карточки контента детального просмотра
    const pTitle = document.getElementById('prod-title');
    const pStatus = document.getElementById('prod-status');
    const pDescription = document.getElementById('prod-description');
    const pImage = document.getElementById('product-main-image');
    const pFeaturesList = document.getElementById('prod-features-list');

    // Функция отрисовки данных конкретной модели в карточку
    function renderModelCard(model) {
        if (pTitle) pTitle.textContent = model.name;
        if (pStatus) pStatus.textContent = model.status;
        if (pDescription) pDescription.textContent = model.description;
        
        if (pImage) {
            pImage.src = model.image;
            pImage.alt = model.name;
            pImage.onerror = function() { 
                this.src = 'img/phone.png'; 
                this.onerror = null; 
            }; 
        }

        if (pFeaturesList) {
            pFeaturesList.innerHTML = '';
            model.features.forEach(feat => {
                const li = document.createElement('li');
                li.textContent = feat;
                pFeaturesList.appendChild(li);
            });
        }
    }

    // Функция переключения на модельный ряд выбранной категории
    function openCategoryModels(categoryId) {
        const catData = productCatalogDB[categoryId];
        if (!catData || !categoriesScreen || !modelsScreen) return;

        
        if (currentCategoryCrumb) currentCategoryCrumb.textContent = catData.categoryTitle;
        if (menuDynamicTitle) menuDynamicTitle.textContent = catData.categoryTitle;

        if (dynamicModelsList) {
            dynamicModelsList.innerHTML = '';
            catData.models.forEach((model, index) => {
                const btn = document.createElement('button');
                btn.className = `model-item ${index === 0 ? 'active' : ''}`;
                btn.textContent = model.name;
                btn.setAttribute('data-model', model.id);
                
                btn.addEventListener('click', () => {
                    dynamicModelsList.querySelectorAll('.model-item').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    renderModelCard(model);
                });
                
                dynamicModelsList.appendChild(btn);
            });
        }

      
        if (catData.models.length > 0) {
            renderModelCard(catData.models[0]);
        }

        
        categoriesScreen.style.display = 'none';
        modelsScreen.style.display = 'block';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    document.querySelectorAll('.category-preview-card').forEach(card => {
        card.addEventListener('click', () => {
            const catId = card.getAttribute('data-prod-category');
            if (catId) openCategoryModels(catId);
        });
    });

    // Возврат назад к экрану категорий
    if (btnBackToCategories) {
        btnBackToCategories.addEventListener('click', () => {
            if (modelsScreen) modelsScreen.style.display = 'none';
            if (categoriesScreen) categoriesScreen.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Автопривязка для кнопки "Запросить ТКП" на product.html
    const requestTkpBtn = document.querySelector('.btn-request-tkp');
    if (requestTkpBtn) {
        requestTkpBtn.addEventListener('click', () => {
            const currentModelTitle = pTitle ? pTitle.textContent : "Продукция ИСИТ";
            if (modalQuestion) {
                const textarea = modalQuestion.querySelector('textarea');
                if (textarea) {
                    textarea.value = `Здравствуйте! Меня интересует: "${currentModelTitle}". Вышлите, пожалуйста, ТКП, технические характеристики или условия обслуживания оборудования.`;
                }
                openModal(modalQuestion);
            }
        });
    }
    // --- ДОБАВЛЕННЫЙ БЛОК ДЛЯ ОБРАБОТКИ ССЫЛОК ---
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    const modelParam = urlParams.get('model');

    if (catParam) {
        // Открываем категорию
        openCategoryModels(catParam);
        
        // Если передана модель — находим её и кликаем программно
        if (modelParam) {
            setTimeout(() => {
                const modelBtn = dynamicModelsList.querySelector(`button[data-model="${modelParam}"]`);
                if (modelBtn) {
                    modelBtn.click(); // Имитируем клик по нужной модели
                }
            }, 100);
        }
    }
    // ---------------------------------------------
});