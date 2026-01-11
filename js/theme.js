        // Пока минимум JS — только переключение темы
        document.getElementById('theme-toggle').addEventListener('click', () => {
            const body = document.body;
            const isLight = body.classList.contains('theme-light');
            body.classList.toggle('theme-light', !isLight);
            body.classList.toggle('theme-dark', isLight);
            localStorage.setItem('theme', isLight ? 'dark' : 'light');

            // Обновление цвета адресной строки
            const metaThemeColor = document.getElementById('theme-color-meta');
            metaThemeColor.setAttribute('content', isLight ? '#0d0d1a' : '#f9f9ff')
        });

        // Восстановление темы из localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.replace('theme-light', 'theme-dark');
            document.getElementById('theme-color-meta').setAttribute('content', '#0d0d1a')
        }