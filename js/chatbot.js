document.addEventListener('DOMContentLoaded', () => {
    const chatbot = document.querySelector(".chatbot");
    const toggleBtn = document.querySelector(".chatbot-toggle");
    const input = document.querySelector(".chatbot-input input");
    const sendBtn = document.querySelector(".chatbot-send");
    const messages = document.querySelector(".chatbot-messages");

    // Показываем чат-бота при клике на звезду (Easter Egg)
    document.querySelector('.pulsar-star')?.addEventListener('click', () => {
        chatbot.ariaHidden = 'false';
    });

    // Переключение видимости
    toggleBtn.addEventListener('click', () => {
        chatbot.ariaHidden = 'true';
    });

    // Обработка отправки сообщений
    const sendMessage = () => {
        const text = input.value.trim();
        if (!text) return;

        // Добавляем сообщение пользователя
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = text;
        messages.appendChild(userMsg);
        messages.scrollTop = messages.scrollHeight;

        // Очищаем поле ввода
        input.value = '';

        // Ответ бота
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';

            if (text === '?') {
                botMsg.innerHTML = `
                    <strong>Команды Капитана:</strong><br>
                    • <code>баланс</code> — показать звёзды<br>
                    • <code>помощь</code> — список квестов<br>
                    • <code>ракета</code> — запустить секретную анимацию
                `;
            } else if (text === 'баланс') {
                botMsg.textContent = 'Твой баланс: 450 ⭐';
            } else if (text === 'ракета') {
                botMsg.textContent = 'Запускаю ракету... 🚀';
                animatePulsarStar();
            } else {
                botMsg.textContent = 'Капитан Верстак: ' + getBotResponse(text);
            }

            messages.appendChild(botMsg);
            messages.scrollTop = messages.scrollHeight;
        }, 500);
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });

    // Функция ответов бота
    function getBotResponse(text) {
        const responses = [
            'Это как запустить ракету без топлива... но попробую!',
            'Капитан на связи! Уточните задачу.',
            'Проверяю систему... Всё в норме!',
            'Ошибка 404: команда не найдена. Попробуйте «?»',
            'Пилот, вы на правильном курсе! 🌌'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Анимация звезды при команде "ракета"
    function animatePulsarStar() {
        const star = document.querySelector('.pulsar-star');
        if (!star) return;

        star.style.transition = 'transform 1s ease';
        star.style.transform = 'scale(1.8) rotate(720deg)';

        setTimeout(() => {
            star.style.transform = 'scale(1) rotate(0deg)';
        }, 1000);
    }
});