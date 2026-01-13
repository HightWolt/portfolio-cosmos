document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.querySelector('.refresh-stars');
    const currentStars = document.querySelector('.current-stars');
    const progress = document.querySelector('.progress');
    const loadingIndicator = document.querySelector('.loading');

    // Инициализация из localStorage
    const cashedStars = localStorage.getItem('githubStars');
    const lastUpdate = localStorage.getItem('lastUpdate');

    if (cashedStars && lastUpdate) {
        currentStars.textContent = cashedStars;
        const percent = Math.min(100, (cashedStars / 100) * 100);
        progress.style.width = `${percent}%`;
    }

    refreshBtn?.addEventListener('click', async () => {
        // Показать индикацию загрузки
        refreshBtn.disabled = true;
        loadingIndicator.style.display = 'inline-block';

        try {
            const response = await fetch('https://api.github.com/repos/HightWolt/portfolio-cosmos');
            if (!response.ok) throw new Error('Ошибка сети');

            const data = await response.json();
            const starsCount = data.stargazers_count;

        if (typeof starsCount !== 'number' || isNaN(starsCount) || starsCount < 0) {
            throw new Error('Некорректные данные от GitHub API');
        }

            // Обновить интерфейс
            currentStars.textContent = starsCount;
            const percent = Math.min(100, (starsCount / 100) * 100);
            progress.style.width = `${percent}%`;

            refreshBtn.textContent = '✓';
            setTimeout(() => {
                if (refreshBtn) refreshBtn.textContent = '⟳';
            }, 1500);

            // Сохранить в localStorage
            localStorage.setItem('githubStars', starsCount);
            localStorage.setItem('lastUpdate', new Date().toISOString());

        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            // Показать уведомление об ошибке
            showUpdateError();
        } finally {
            // Скрыть индикацию загрузки
            refreshBtn.disabled = false;
            loadingIndicator.style.display = 'none';
        }
    });

    function showUpdateError() {
        if (!refreshBtn) return;
        const originalContent = refreshBtn.textContent;
        refreshBtn.textContent = '⚠️';

        setTimeout(() => {
            refreshBtn.textContent = originalContent;
        }, 2000);
    }
});