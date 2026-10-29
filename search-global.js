// ==========================================================================
// ГЛОБАЛЬНЫЙ СКРИПТ ПОИСКА ДЛЯ ВСЕХ СТРАНИЦ 
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('btn-search-execute');
    const searchResultsContainer = document.getElementById('search-results');

    
    if (!searchInput || !searchBtn || !searchResultsContainer) {
        console.warn('Поиск: элементы поиска не найдены на этой странице');
        return;
    }

    // Глобальная функция выполнения поиска
    async function performSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            searchResultsContainer.innerHTML = '';
            return;
        }

        try {
            // Запрос к серверу
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const results = await response.json();

            // Очищаем контейнер
            searchResultsContainer.innerHTML = '';

            if (results.length === 0) {
                searchResultsContainer.innerHTML = '<p style="padding: 12px; color: #9ca3af; font-size: 0.95rem;">Ничего не найдено</p>';
                return;
            }

            // Рендерим результаты
            results.forEach(item => {
                const div = document.createElement('div');
                div.className = 'search-item';
                
                div.style.cssText = `
                    padding: 14px; 
                    border-bottom: 1px solid #1f2937; 
                    cursor: pointer; 
                    transition: background-color 0.2s ease;
                `;
                
                const badgeBg = item.type === 'page' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0, 255, 136, 0.1)';
                const badgeColor = item.type === 'page' ? '#3b82f6' : '#00ff88';
                const badgeText = item.type === 'page' ? 'Раздел' : 'Новость';

                div.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <strong style="color: #ffffff; font-size: 1rem; font-weight: 600;">${item.title}</strong>
                        <span style="font-size: 0.75rem; background: ${badgeBg}; color: ${badgeColor}; padding: 2px 8px; border-radius: 4px; font-weight: bold; border: 1px solid ${badgeColor}33;">
                            ${badgeText}
                        </span>
                    </div>
                    <p style="font-size: 0.85rem; color: #9ca3af; margin: 0; line-height: 1.4;">${item.excerpt}</p>
                `;
                
                div.onclick = () => {
                    window.location.href = item.url;
                };
                
                div.addEventListener('mouseenter', () => div.style.backgroundColor = '#111827');
                div.addEventListener('mouseleave', () => div.style.backgroundColor = 'transparent');
                
                searchResultsContainer.appendChild(div);
            });
        } catch (err) {
            console.error('Ошибка поиска:', err);
            searchResultsContainer.innerHTML = '<p style="padding: 12px; color: #ff6b6b;">Ошибка соединения с сервером</p>';
        }
    }

    // Слушатели событий
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    searchInput.addEventListener('input', () => {
        if (!searchInput.value.trim()) {
            searchResultsContainer.innerHTML = '';
        }
    });
});