if (typeof window.productCatalogDB === 'undefined') {
    window.productCatalogDB = {}; 
    console.error("Ошибка: База данных productCatalogDB не найдена!");
}

document.addEventListener("DOMContentLoaded", () => {
    const categoriesScreen = document.getElementById('product-categories-screen');
    const modelsScreen = document.getElementById('product-models-screen');
    const btnBack = document.getElementById('btn-back-to-prod-categories');

    if (!categoriesScreen || !modelsScreen) return;

    // 2. Определяем функцию отрисовки карточки, если её нет в других скриптах
    window.renderModelCard = window.renderModelCard || function(model) {
        const container = document.getElementById('product-details-container');
        if (!container) return;

        // Здесь динамически вставляем данные
        container.innerHTML = `
            <h2>${model.name}</h2>
            <img src="${model.image || 'images/default.jpg'}" alt="${model.name}" onerror="this.src='images/default.jpg'">
            <p>${model.description || ''}</p>
        `;
    };

    // Функция открытия категории
    window.openCategoryModels = function(catKey, modelId = null) {
        const catData = window.productCatalogDB[catKey];
        if (!catData) {
            console.error(`Категория ${catKey} не найдена`);
            return;
        }

        categoriesScreen.style.display = 'none';
        modelsScreen.style.display = 'block';

        const title = document.getElementById('prod-current-category-title');
        if (title) title.innerText = catData.categoryTitle;

        const list = document.getElementById('dynamic-models-list');
        if (!list) return;
        
        list.innerHTML = '';

        catData.models.forEach(model => {
            const btn = document.createElement('button');
            btn.className = 'model-item';
            btn.innerText = model.name;
            btn.setAttribute('data-model', model.id);
            btn.onclick = () => {
                window.history.pushState({}, '', `product.html?cat=${catKey}&model=${model.id}`);
                window.renderModelCard(model);
                document.querySelectorAll('.model-item').forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
            };
            list.appendChild(btn);
        });

        const targetModel = modelId ? catData.models.find(m => m.id === modelId) : catData.models[0];
        if (targetModel) {
            window.renderModelCard(targetModel);
            const activeBtn = list.querySelector(`button[data-model="${targetModel.id}"]`);
            if (activeBtn) activeBtn.classList.add('active');
        }
    };

    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    const model = params.get('model');
    if (cat) openCategoryModels(cat, model);

    if (btnBack) {
        btnBack.onclick = () => {
            window.history.pushState({}, '', 'product.html');
            categoriesScreen.style.display = 'block';
            modelsScreen.style.display = 'none';
        };
    }
});