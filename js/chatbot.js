document.addEventListener('DOMContentLoaded', () => {
    const chatbot = document.querySelector(".chatbot");
    const toggleBtn = document.querySelector(".chatbot-toggle");
    const input = document.querySelector(".chatbot-input input");
    const sendBtn = document.querySelector(".chatbot-send");
    const messages = document.querySelector(".chatbot-messages");
    const pulsarStar = document.querySelector(".pulsar-star");

    // Единый обработчик кликов по пульсару
    let clickCount = 0;
    pulsarStar?.addEventListener('click', () => {
        clickCount++;

        const isChatOpen = chatbot.ariaHidden === 'true';
        chatbot.ariaHidden = isChatOpen ? 'false' : 'true';
        pulsarStar.setAttribute('aria-expanded', isChatOpen ? 'true' : 'false');

        // Сбрасываем счётчик после задержки
        setTimeout(() => {
            clickCount = 0
        }, 500);
    });

    // Переключение видимости
    toggleBtn.addEventListener('click', () => {
        chatbot.ariaHidden = 'true';
        pulsarStar.setAttribute('aria-expanded', 'false')
    });

    // Обработка отправки сообщений
    const sendMessage = () => {
        const text = input.value.trim().toLowerCase();
        if (!text) return;

        addUserMessage(text);
        input.value = '';

        // Ответ бота
        setTimeout(() => {
            if (text === '?') {
                addBotMessage(`
                    <strong>Команды Капитана:</strong><br>
                    • <code>баланс</code> — показать звёзды<br>
                    • <code>помощь</code> — список квестов<br>
                    • <code>ракета</code> — запустить секретную анимацию
                `);
            } else if (text === 'баланс') {
                addBotMessage(`Твой баланс: ${getStarBalance()} ⭐`);
            } else if (text === 'ракета') {
                addBotMessage('Запускаю ракету... 🚀');
                animatePulsarStar();
            } else {
                addBotMessage('Капитан Верстак: ' + getBotResponse(text));
            }
        }, 500);
    };

    // Вспомогательные функции для сообщений
    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'message user';
        msg.textContent = text;
        messages.appendChild(msg);
        scrollToBottom();
    }

    function addBotMessage(content) {
        const msg = document.createElement('div');
        msg.className = 'message bot';
        msg.innerHTML = content;
        messages.appendChild(msg);
        scrollToBottom();
    }

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    // Единая функция анимации (теперь только здесь)
    function animatePulsarStar() {
        if (!pulsarStar) return;

        pulsarStar.style.transition = 'transform 1s cubic-bezier(0.19, 1, 0.22, 1)';
        pulsarStar.style.transform = 'scale(1.8) rotate(720deg)';

        setTimeout(() => {
            pulsarStar.style.transform = 'scale(1) rotate(0deg)';
            // Восстанавливаем стандартную анимацию при наведении
            setTimeout(() => {
                pulsarStar.style.transition = '';
            }, 1000);
        }, 1000);
    }

    // Реализация баланса
    function getStarBalance() {
        return localStorage.getItem('starBalance') || '450';
    }

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
});