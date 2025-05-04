document.addEventListener('DOMContentLoaded', () => {
    // Функция для добавления класса с анимацией
    function animateElement(element, animationClass) {
        element.classList.add(animationClass);
    }

    // Функция для удаления класса с анимацией (если требуется повторная анимация)
    function removeAnimationClass(element, animationClass) {
        element.classList.remove(animationClass);
    }

    // Анимация логотипа в шапке
    const logo = document.querySelector('.svg-logo');
    if (logo) {
        logo.addEventListener('mouseover', () => animateElement(logo, 'hover-pulse'));
        logo.addEventListener('mouseout', () => removeAnimationClass(logo, 'hover-pulse'));
    }

    // Плавное появление основного заголовка
    const mainHelpText = document.querySelector('.main-help-text');
    if (mainHelpText) {
        mainHelpText.style.opacity = 0;
        setTimeout(() => {
            animateElement(mainHelpText, 'fade-in');
        }, 300); // Задержка для начала анимации
    }

    // Анимация полей поиска
    const searchInputs = document.querySelectorAll('input[type="search"]');
    searchInputs.forEach(input => {
        input.addEventListener('focus', () => animateElement(input.parentNode, 'focus-shadow'));
        input.addEventListener('blur', () => removeAnimationClass(input.parentNode, 'focus-shadow'));
    });

    // Анимация стрелки в поле поиска
    const searchArrow = document.querySelector('.arrow-svg');
    const fieldSearch = document.querySelector('.field-search');
    if (searchArrow && fieldSearch) {
        fieldSearch.addEventListener('mouseover', () => animateElement(searchArrow, 'hover-move'));
        fieldSearch.addEventListener('mouseout', () => removeAnimationClass(searchArrow, 'hover-move'));
    }

    // Анимация карточек при прокрутке слева направо и справа налево
    const gridElements = document.querySelectorAll('.list-element__element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const index = Array.from(gridElements).indexOf(element);

                if (index % 2 === 0) { // Четные индексы (условно левая сторона)
                    animateElement(element, 'slide-in-left');
                } else { // Нечетные индексы (условно правая сторона)
                    animateElement(element, 'slide-in-right');
                }
                observer.unobserve(element); // Прекратить наблюдение после появления
            }
        });
    }, { threshold: 0.2 }); // Анимация начинается, когда 20% элемента видно

    gridElements.forEach((element, index) => {
        element.style.opacity = 0; // Изначально делаем элементы невидимыми
        element.style.transform = 'translateX(-20px)'; // Начальное смещение для левых
        if (index % 2 !== 0) {
            element.style.transform = 'translateX(20px)'; // Начальное смещение для правых
        }
        observer.observe(element);
    });

    // Анимация исчезновения карточек при прокрутке вверх
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop < lastScrollTop) { // Если прокрутка вверх
            gridElements.forEach(element => {
                // Добавляем класс для анимации исчезновения
                element.classList.add('fade-out-up');
            });
        } else { // Если прокрутка вниз
            gridElements.forEach(element => {
                // Убираем класс анимации, чтобы при повторном появлении анимация сработала снова
                element.classList.remove('fade-out-up');
            });
        }
        lastScrollTop = scrollTop;
    });
});