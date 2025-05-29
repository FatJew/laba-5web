let numButtonClicks = 0;
function buttonClicked() {
    numButtonClicks = numButtonClicks + 1;
    document.getElementById("mainDiv").textContent =
        "Button Clicked times: " + numButtonClicks;
}

// 1a. Отримання інформації
const browserInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    online: navigator.onLine
};

// Зберігаємо у localStorage
localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

// 1b. Відображення у футері
window.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer');
    const info = JSON.parse(localStorage.getItem('browserInfo'));

    if (footer && info) {
        const infoBlock = document.createElement('div');
        infoBlock.innerHTML = `
            <h4>Browser Info:</h4>
            <ul>
                <li>User Agent: ${info.userAgent}</li>
                <li>Platform: ${info.platform}</li>
                <li>Language: ${info.language}</li>
                <li>Cookies Enabled: ${info.cookieEnabled}</li>
                <li>Online: ${info.online}</li>
            </ul>
        `;
        infoBlock.style.marginTop = '20px';
        infoBlock.style.textAlign = 'left';
        footer.appendChild(infoBlock);
    }
});

// 2a. Отримання коментарів з JSONPlaceholder
const commentContainer = document.querySelector('.comments-container');
const postNumber = 11; 

fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}/comments`)
    .then(response => response.json())
    .then(comments => {
        comments.forEach(comment => {
            const commentBlock = document.createElement('div');
            commentBlock.classList.add('comment');
            commentBlock.innerHTML = `
                <h4>${comment.name}</h4>
                <p><strong>Email:</strong> ${comment.email}</p>
                <p>${comment.body}</p>
            `;
            commentBlock.style.backgroundColor = '#2c2c2c';
            commentBlock.style.color = '#fff';
            commentBlock.style.padding = '15px';
            commentBlock.style.marginBottom = '10px';
            commentBlock.style.borderRadius = '10px';
            commentContainer.appendChild(commentBlock);
        });
    })
    .catch(error => {
        console.error('Помилка отримання коментарів:', error);
        commentContainer.innerHTML = '<p>Не вдалося завантажити коментарі 😕</p>';
    });

// 3. Модальне вікно зворотного зв'язку
setTimeout(() => {
    const modal = document.getElementById("feedback-modal");
    modal.style.display = "block";
}, 60000); // 60 000 мс = 1 хвилина

// Закриття вікна
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("feedback-modal");
    const closeBtn = document.querySelector(".modal .close");

    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});

// 4. Автоматичне встановлення теми за часом
function setInitialTheme() {
    const hour = new Date().getHours();
    const isDay = hour >= 7 && hour < 21;
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        document.getElementById('theme-switch').checked = savedTheme === 'light-theme';
    } else {
        const theme = isDay ? 'light-theme' : 'dark-theme';
        body.classList.add(theme);
        document.getElementById('theme-switch').checked = theme === 'light-theme';
    }
}

// Перемикач теми
document.addEventListener("DOMContentLoaded", () => {
    setInitialTheme();

    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', () => {
        const body = document.body;
        if (themeSwitch.checked) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });
});