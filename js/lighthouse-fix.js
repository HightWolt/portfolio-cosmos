// Обходной путь для Lighthouse в CI
if (window.location.href.includes('github.io')) {
    // Фикс для редиректа при первом заходе
    setTimeout(() => {
        if (!localStorage.getItem('lh-fix')) {
            localStorage.setItem('lh-fix', 'true');
            window.location.reload()
        }
    }, 1000);
}