// Имитация прогресса (в реальности: запрос к GitHub API)
document.addEventListener('DOMContentLoaded', () => {
    const currentStars = document.querySelector('.current-stars');
    const progress = document.querySelector('.progress');

    // В реальности: fetch('https://api.github.com/repos/HightWolt/portfolio-cosmos')
    const REAL_STARS = 27; // Пример текущих звёзд

    if (currentStars && progress) {
        currentStars.textContent = REAL_STARS;
        const percent = Math.min(100, (REAL_STARS / 100) * 100);
        progress.style.width = `${percent}%`

        // Анимация роста при загрузке
        setTimeout(() => {
            progress.style.transition = 'width 1.5s ease-out';
            progress.style.width = `${percent}%`
        }, 300);
    }

    // Easter Egg: при клике на счётчик — показать секретное сообщение
    document.querySelector('.star-counter')?.addEventListener('click', () => {
        alert('В 2049 году звёзды на GitHub будут стоить дороже криптовалюты. Ты на правильном пути! ✨');
    });
});