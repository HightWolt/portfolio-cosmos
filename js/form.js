document.addEventListener('DOMContentLoaded', initForm);

function initForm() {
    const form = document.getElementById('spaceship-form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    initPulsarEasterEgg();
}

function initPulsarEasterEgg() {
    const star = document.querySelector('.pulsar-star');
    if (!star) {
        console.warn('Элемент .pulsar-star не найден для Easter Egg');
        return;
    }

    const successMessage = document.querySelector('.form-success');
    if (!successMessage) {
        console.warn('Элемент .form-success не найден для Easter Egg');
        return;
    }

    const originalText = successMessage.textContent || 'Форма успешно отправлена!';
    let clickCount = 0;

    star.addEventListener('click', () => {
        clickCount++;
        console.log(`Клик ${clickCount}/3 на Пульсар`);

        if (clickCount >= 3) {
            const message = `🚀 Секретный уровень! Твой баланс: ${getStarBalance()} ⭐`;
            successMessage.textContent = message;
            successMessage.ariaHidden = false;

            setTimeout(() => {
                successMessage.ariaHidden = true;
                successMessage.textContent = originalText;
                clickCount = 0;
            }, 3000);
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    resetFormErrors(form);

    if (!form.checkValidity()) {
        showFormErrors(form);
        return;
    }

    startSubmitAnimation();

    simulateServerRequest()
        .then(isSuccess => {
            if (isSuccess) {
                const successMessage = document.querySelector('.form-success');
                if (successMessage) {
                    successMessage.ariaHidden = false;
                    setTimeout(() => {
                        if (successMessage) successMessage.ariaHidden = true;
                    }, 3000);
                }

                form.reset();
                animatePulsarStar();
            } else {
                const errorMessage = document.querySelector('.form-error');
                if (errorMessage) {
                    errorMessage.ariaHidden = false;
                    setTimeout(() => {
                        if (errorMessage) errorMessage.ariaHidden = true;
                    }, 5000);
                }
            }
        })
        .catch(error => {
            console.error('Сетевая ошибка:', error);
            const errorMessage = document.querySelector('.form-error');
            if (errorMessage) {
                errorMessage.ariaHidden = false;
                setTimeout(() => {
                    if (errorMessage) errorMessage.ariaHidden = true;
                }, 5000);
            }
        })
        .finally(() => {
            stopSubmitAnimation();
        });

}

// Симуляция запроса к серверу с обработкой ошибок
function simulateServerRequest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rand = Math.random();
            if (rand > 0.5) {
                resolve(true);
            } else if (rand > 0.2) {
                resolve(false);
            } else {
                reject(new Error('Сетевая ошибка'));
            }
        }, 1500);
    });
}

function resetFormErrors(form) {
    form.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        const group = el.closest('.form-group');
        if (group) group.classList.remove('invalid');
    });
}

function showFormErrors(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (!input.validity.valid) {
            const group = input.closest('.form-group');
            if (!group) return;

            const errorEl = group.querySelector('.error-message');
            if (errorEl) {
                errorEl.textContent = getValidationMessage(input);
                group.classList.add('invalid');
            }
        }
    });
}

function getValidationMessage(input) {
    if (input.validity.valueMissing) return 'Это поле обязательно для заполнения';
    if (input.validity.tooShort) return `Минимум ${input.minLength} символов`;
    if (input.validity.typeMismatch && input.type == 'email') return 'Неверный формат email';
    return 'Ошибка в заполнении';
}

function startSubmitAnimation() {
    const submitBtn = document.querySelector('.form-submit');
    if (!submitBtn) return;

    submitBtn.disabled = true;
    const textEl = submitBtn.querySelector('.submit-text');
    const loadingEl = submitBtn.querySelector('.submit-loading');

    if (textEl) textEl.textContent = 'Отправляю...';
    if (loadingEl) loadingEl.style.display = 'inline-block';
}

function stopSubmitAnimation() {
    const submitBtn = document.querySelector('.form-submit');
    if (!submitBtn) return;

    submitBtn.disabled = false;

    const textEl = submitBtn.querySelector('.submit-text');
    const loadingEl = submitBtn.querySelector('.submit-loading');

    if (textEl) textEl.textContent = 'Отправить';
    if (loadingEl) loadingEl.style.display = 'none';
}

// Эффект для звезды "Пульсар"
function animatePulsarStar() {
    const star = document.querySelector('.pulsar-star');
    if (!star) return;

    star.style.transform = 'scale(1.5) rotate(360deg)';
    setTimeout(() => {
        star.style.transform = 'scale(1) rotate(0deg)';
    }, 1000);
}

// Функция баланса (пример)
function getStarBalance() {
    // В реальности берётся из localStorage или API
    return Math.floor(Math.random() * 500) + 50;
}