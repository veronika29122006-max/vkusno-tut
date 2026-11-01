// ============================================
// БУРГЕР-МЕНЮ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');
    if (burger && nav) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('open');
            burger.classList.toggle('active');
        });
        nav.querySelectorAll('.nav-link, .btn').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                burger.classList.remove('active');
            });
        });
    }
});

// ============================================
// БЕЗОПАСНОСТЬ И ЛОГИРОВАНИЕ
// ============================================
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function escapeHtml(text) {
    if (!text) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

function logAction(userName, actionText) {
    try {
        let logs = JSON.parse(localStorage.getItem('vkusno_logs') || '[]');
        logs.push({
            time: new Date().toLocaleString('ru-RU'),
            user: userName,
            action: actionText
        });
        localStorage.setItem('vkusno_logs', JSON.stringify(logs));
    } catch (e) { console.error('Ошибка логирования', e); }
}

function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function validatePassword(password) { return password && password.length >= 6; }
function validateName(name) { return name && name.length >= 1 && name.length <= 50; }
function validateComment(text) { return text && text.length >= 1 && text.length <= 1000; }
function validateRecipeName(name) { return name && name.length >= 3 && name.length <= 100; }

// ============================================
// ПОЛЬЗОВАТЕЛЬ
// ============================================
function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem('vkusno_current_user') || 'null'); } 
    catch (e) { return null; }
}
function isLoggedIn() { return getCurrentUser() !== null; }

function updateHeaderAuth() {
    const headerButtons = document.querySelector('.header-buttons');
    const nav = document.querySelector('.nav');
    if (!headerButtons || !nav) return;

    const user = getCurrentUser();
    const isAuth = user && user.name;
    const profileLink = nav.querySelector('a[href="profile.html"]');
    const createLink = nav.querySelector('a[href="create.html"]');
    
    // Ищем или создаем ссылку на админку в меню
    let adminLink = nav.querySelector('a[href="admin.html"]');

    if (isAuth) {
        const firstName = user.name.split(' ')[0];
        if (profileLink) profileLink.style.display = '';
        if (createLink) createLink.style.display = '';
        
        // === НОВЫЙ БЛОК: Показываем админку, если роль admin ===
        if (user.role === 'admin' || user.email === 'admin@vkusno.tut') {
            if (!adminLink) {
                // Если ссылки нет, создаем её и вставляем перед кнопкой "Профиль"
                adminLink = document.createElement('a');
                adminLink.href = 'admin.html';
                adminLink.className = 'nav-link';
                adminLink.style.color = '#DC2626'; // Красный цвет, чтобы выделялась
                adminLink.style.fontWeight = 'bold';
                adminLink.textContent = ' Админ-панель';
                
                // Вставляем перед ссылкой на профиль
                if (profileLink) {
                    nav.insertBefore(adminLink, profileLink);
                } else {
                    nav.appendChild(adminLink);
                }
            }
            adminLink.style.display = ''; // Показываем
        } else {
            if (adminLink) adminLink.style.display = 'none'; // Скрываем для обычных
        }
        // =======================================================

        headerButtons.innerHTML =
            '<a href="profile.html" class="btn btn-outline">' + escapeHtml(firstName) + '</a>' +
            '<button type="button" class="btn btn-primary" id="logoutBtn">Выйти</button>';
        document.getElementById('logoutBtn').addEventListener('click', function() {
            if (confirm('Выйти из аккаунта?')) {
                logAction(user.name, 'Выход из системы');
                localStorage.removeItem('vkusno_current_user');
                localStorage.removeItem('vkusno_profile');
                window.location.href = 'index.html';
            }
        });
    } else {
        if (profileLink) profileLink.style.display = 'none';
        if (createLink) createLink.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none'; // Скрываем админку для гостей
        headerButtons.innerHTML =
            '<a href="login.html" class="btn btn-outline">Войти</a>' +
            '<a href="login.html" class="btn btn-primary">Регистрация</a>';
    }
}
document.addEventListener('DOMContentLoaded', updateHeaderAuth);

function protectProfile() {
    if (!document.querySelector('.profile-page')) return;
    if (!isLoggedIn()) {
        alert('Войдите или зарегистрируйтесь, чтобы открыть профиль');
        window.location.href = 'login.html';
    }
}
document.addEventListener('DOMContentLoaded', protectProfile);

// ============================================
// ОБЩИЕ ФУНКЦИИ
// ============================================
function getAllRecipes() {
    let all = recipes.slice();
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.indexOf('vkusno_published_') === 0) {
                try {
                    const list = JSON.parse(localStorage.getItem(key) || '[]');
                    if (Array.isArray(list)) all = all.concat(list);
                } catch (e) {}
            }
        }
    } catch (e) {}
    return all;
}

function getProfileKey() {
    const user = getCurrentUser();
    return user && user.email ? 'vkusno_profile_' + user.email : 'vkusno_profile';
}
function getProfile() {
    try {
        const data = localStorage.getItem(getProfileKey());
        return data ? JSON.parse(data) : { name: 'Пользователь', nick: '@user', desc: 'Люблю готовить', avatar: '' };
    } catch (e) {
        return { name: 'Пользователь', nick: '@user', desc: 'Люблю готовить', avatar: '' };
    }
}
function saveProfile(profile) {
    try { localStorage.setItem(getProfileKey(), JSON.stringify(profile)); } catch (e) {}
}

// ============================================
// КАТАЛОГ
// ============================================
function initCatalog() {
    const grid = document.getElementById('resultsGrid');
    if (!grid) return;

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const sortSelect = document.getElementById('sortSelect');
    const foundCount = document.getElementById('foundCount');
    const chipsContainer = document.getElementById('chipsContainer');
    const resetBtn = document.getElementById('resetFilters');
    const pagination = document.getElementById('pagination');
    const PER_PAGE = 9;
    let currentPage = 1;
    let filteredRecipes = [];

    function applyUrlFilters() {
        const params = new URLSearchParams(window.location.search);
        const product = params.get('product');
        if (product) document.querySelectorAll('input[data-filter="product"]').forEach(el => { if (el.value === product) el.checked = true; });
        const type = params.get('type');
        if (type) document.querySelectorAll('input[data-filter="type"]').forEach(el => { if (el.value === type) el.checked = true; });
        const cuisine = params.get('cuisine');
        if (cuisine) document.querySelectorAll('input[data-filter="cuisine"]').forEach(el => { if (el.value === cuisine) el.checked = true; });
        const search = params.get('search');
        if (search && searchInput) searchInput.value = search;
    }

    function applyFilters() {
        const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const checks = {};
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(function(el) {
            const key = el.dataset.filter;
            if (!checks[key]) checks[key] = [];
            checks[key].push(el.value);
        });
        const timeRadio = document.querySelector('input[name="time"]:checked');
        const timeValue = timeRadio ? timeRadio.value : null;
        const sort = sortSelect ? sortSelect.value : 'popular';
        const allRecipes = getAllRecipes();

        filteredRecipes = allRecipes.filter(function(r) {
            if (search && !r.name.toLowerCase().includes(search) && !r.desc.toLowerCase().includes(search)) return false;
            if (checks.type && !checks.type.includes(r.type)) return false;
            if (checks.product && !checks.product.includes(r.product)) return false;
            if (checks.cuisine && !checks.cuisine.includes(r.cuisine)) return false;
            if (checks.difficulty && !checks.difficulty.includes(r.difficulty)) return false;
            if (timeValue === 'short' && r.time > 15) return false;
            if (timeValue === 'medium' && (r.time < 15 || r.time > 30)) return false;
            if (timeValue === 'long' && (r.time < 30 || r.time > 60)) return false;
            if (timeValue === 'verylong' && r.time <= 60) return false;
            return true;
        });

        if (sort === 'fast') filteredRecipes.sort((a, b) => a.time - b.time);
        if (sort === 'calories') filteredRecipes.sort((a, b) => a.calories - b.calories);
        if (sort === 'name') filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
        if (foundCount) foundCount.textContent = filteredRecipes.length;
        currentPage = 1;
        renderPage();
        renderChips(checks, timeValue, search);
    }

    function renderPage() {
        const totalPages = Math.ceil(filteredRecipes.length / PER_PAGE) || 1;
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;
        const start = (currentPage - 1) * PER_PAGE;
        const pageRecipes = filteredRecipes.slice(start, start + PER_PAGE);

        if (pageRecipes.length === 0) {
            grid.innerHTML = '<div class="no-result"><h3>Ничего не найдено</h3><p>Попробуйте изменить фильтры</p></div>';
        } else {
            grid.innerHTML = pageRecipes.map(function(r) {
                return '<a href="recipe.html?id=' + r.id + '" class="card">' +
                    '<div class="card-img"><img src="' + r.image + '" alt="' + escapeHtml(r.name) + '"></div>' +
                    '<div class="card-body">' +
                        '<h3 class="card-title">' + escapeHtml(r.name) + '</h3>' +
                        '<p class="card-desc">' + escapeHtml(r.desc) + '</p>' +
                        '<div class="card-meta">⏱ ' + r.time + ' мин · ' + (r.difficulty === 'Легко' ? '🟢' : r.difficulty === 'Средне' ? '🟡' : '🔴') + ' ' + escapeHtml(r.difficulty) + '</div>' +
                    '</div></a>';
            }).join('');
        }
        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        if (!pagination) return;
        let html = '<button class="page-btn" data-page="prev"' + (currentPage === 1 ? ' disabled' : '') + '>←</button>';
        for (let i = 1; i <= totalPages; i++) {
            html += '<button class="page-btn' + (i === currentPage ? ' active' : '') + '" data-page="' + i + '">' + i + '</button>';
        }
        html += '<button class="page-btn" data-page="next"' + (currentPage === totalPages ? ' disabled' : '') + '>→</button>';
        pagination.innerHTML = html;

        pagination.querySelectorAll('.page-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const page = btn.dataset.page;
                if (page === 'prev' && currentPage > 1) currentPage--;
                else if (page === 'next' && currentPage < totalPages) currentPage++;
                else if (page !== 'prev' && page !== 'next') currentPage = parseInt(page);
                renderPage();
                window.scrollTo({ top: 300, behavior: 'smooth' });
            });
        });
    }

    function renderChips(checks, timeValue, search) {
        if (!chipsContainer) return;
        let html = '';
        if (search) html += '<div class="chip">Поиск: ' + escapeHtml(search) + ' <span onclick="clearSearch()">×</span></div>';
        Object.keys(checks).forEach(key => checks[key].forEach(val => {
            html += '<div class="chip">' + escapeHtml(val) + ' <span onclick="removeFilter(\'' + key + '\',\'' + val + '\')">×</span></div>';
        }));
        if (timeValue) {
            const labels = { short: 'До 15 мин', medium: '15-30 мин', long: '30-60 мин', verylong: 'Больше часа' };
            html += '<div class="chip">' + labels[timeValue] + ' <span onclick="clearTime()">×</span></div>';
        }
        if (html) html += '<div class="chip chip-reset" onclick="resetAll()">Сбросить всё</div>';
        chipsContainer.innerHTML = html;
    }

    window.clearSearch = () => { searchInput.value = ''; applyFilters(); };
    window.removeFilter = (key, val) => { document.querySelectorAll('input[data-filter="' + key + '"][value="' + val + '"]').forEach(el => el.checked = false); applyFilters(); };
    window.clearTime = () => { document.querySelectorAll('input[name="time"]').forEach(el => el.checked = false); applyFilters(); };
    window.resetAll = () => { document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => el.checked = false); searchInput.value = ''; applyFilters(); };

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (searchBtn) searchBtn.addEventListener('click', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);
    if (resetBtn) resetBtn.addEventListener('click', window.resetAll);
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => el.addEventListener('change', applyFilters));

    applyUrlFilters();
    applyFilters();
}
document.addEventListener('DOMContentLoaded', initCatalog);

// ============================================
// КОММЕНТАРИИ
// ============================================
function getAllComments() {
    try { return JSON.parse(localStorage.getItem('vkusno_comments') || '{}'); } catch (e) { return {}; }
}
function saveAllComments(data) {
    try { localStorage.setItem('vkusno_comments', JSON.stringify(data)); } catch (e) {}
}
function getRecipeComments(recipeId) { return getAllComments()[recipeId] || []; }
function addRecipeComment(recipeId, name, text) {
    const all = getAllComments();
    if (!all[recipeId]) all[recipeId] = [];
    all[recipeId].push({ name, text, date: new Date().toLocaleString('ru-RU') });
    saveAllComments(all);
}
function renderComments(recipeId) {
    const commentsList = document.getElementById('commentsList');
    const commentsTitle = document.getElementById('commentsTitle');
    if (!commentsList) return;
    const comments = getRecipeComments(recipeId);
    if (commentsTitle) commentsTitle.textContent = 'Комментарии (' + comments.length + ')';
    if (comments.length === 0) { commentsList.innerHTML = '<p class="comments-empty">Комментариев пока нет. Будьте первым!</p>'; return; }
    commentsList.innerHTML = comments.map(c => 
        '<div class="comment"><div class="comment-avatar">' + escapeHtml(c.name ? c.name[0].toUpperCase() : 'Г') + '</div><div class="comment-body"><div class="comment-name">' + escapeHtml(c.name) + '</div><div class="comment-text">' + escapeHtml(c.text) + '</div></div></div>'
    ).join('');
}

// ============================================
// ИЗБРАННОЕ
// ============================================
function getFavoritesKey() {
    const user = getCurrentUser();
    return user && user.email ? 'vkusno_favorites_' + user.email : 'vkusno_favorites_guest';
}
function getFavorites() {
    try { return JSON.parse(localStorage.getItem(getFavoritesKey()) || '[]'); } catch (e) { return []; }
}
function saveFavorites(list) {
    try { localStorage.setItem(getFavoritesKey(), JSON.stringify(list)); } catch (e) {}
}
function isInFavorites(recipeId) { return getFavorites().indexOf(String(recipeId)) !== -1; }
function addToFavorites(recipeId) {
    const favorites = getFavorites();
    if (favorites.indexOf(String(recipeId)) === -1) { favorites.push(String(recipeId)); saveFavorites(favorites); }
}
function removeFromFavorites(recipeId) { saveFavorites(getFavorites().filter(id => id !== String(recipeId))); }

// ============================================
// СТРАНИЦА РЕЦЕПТА
// ============================================
function initRecipePage() {
    document.querySelectorAll('.timer').forEach(function(timerEl) {
        if (timerEl.dataset.bound) return;
        timerEl.dataset.bound = '1';
        const display = timerEl.querySelector('.timer-display');
        const startBtn = timerEl.querySelector('[data-action="start"]');
        const resetBtn = timerEl.querySelector('[data-action="reset"]');
        const baseMinutes = parseInt(timerEl.dataset.minutes) || 1;
        let totalSeconds = baseMinutes * 60, remainingSeconds = totalSeconds, intervalId = null, isRunning = false;

        function updateDisplay() {
            const m = Math.floor(remainingSeconds / 60), s = remainingSeconds % 60;
            display.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        }
        function toggleTimer() {
            if (isRunning) {
                clearInterval(intervalId); isRunning = false; startBtn.textContent = 'Старт'; timerEl.classList.remove('timer-active');
            } else {
                if (remainingSeconds <= 0) return;
                isRunning = true; startBtn.textContent = 'Пауза'; timerEl.classList.add('timer-active');
                intervalId = setInterval(() => {
                    remainingSeconds--; updateDisplay();
                    if (remainingSeconds <= 0) {
                        clearInterval(intervalId); isRunning = false; timerEl.classList.remove('timer-active'); timerEl.classList.add('timer-done'); startBtn.textContent = 'Старт'; display.textContent = 'Готово!';
                    }
                }, 1000);
            }
        }
        function resetTimer() {
            clearInterval(intervalId); isRunning = false; remainingSeconds = totalSeconds; updateDisplay(); startBtn.textContent = 'Старт'; timerEl.classList.remove('timer-active', 'timer-done');
        }
        startBtn.addEventListener('click', toggleTimer);
        resetBtn.addEventListener('click', resetTimer);
        updateDisplay();
    });

    const portionBtn = document.getElementById('portionBtn');
    const ingredientsList = document.getElementById('ingredientsList');
    if (portionBtn && ingredientsList && !portionBtn.dataset.bound) {
        portionBtn.dataset.bound = '1';
        let multiplier = 1;
        const basePortions = parseInt(portionBtn.dataset.base) || 2;
        portionBtn.addEventListener('click', function() {
            multiplier = multiplier === 1 ? 2 : 1;
            portionBtn.textContent = '×' + (basePortions * multiplier) + ' порции';
            ingredientsList.querySelectorAll('.ingredient-value').forEach(el => {
                const amount = parseFloat(el.dataset.amount);
                if (isNaN(amount) || el.dataset.unit === 'по вкусу') return;
                el.textContent = (amount * multiplier) + ' ' + el.dataset.unit;
            });
        });
    }

    const favBtn = document.getElementById('favBtn');
    if (favBtn && !favBtn.dataset.bound) {
        favBtn.dataset.bound = '1';
        const recipeId = new URLSearchParams(window.location.search).get('id') || '1';
        if (isInFavorites(recipeId)) { favBtn.textContent = 'В избранном'; favBtn.classList.remove('btn-outline'); favBtn.classList.add('btn-primary'); }
        favBtn.addEventListener('click', function() {
            if (!getCurrentUser()) { alert('Войдите, чтобы сохранять в избранное'); window.location.href = 'login.html'; return; }
            if (isInFavorites(recipeId)) { removeFromFavorites(recipeId); favBtn.textContent = 'В избранное'; favBtn.classList.remove('btn-primary'); favBtn.classList.add('btn-outline'); } 
            else { addToFavorites(recipeId); favBtn.textContent = 'В избранном'; favBtn.classList.remove('btn-outline'); favBtn.classList.add('btn-primary'); }
        });
    }

    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn && !shareBtn.dataset.bound) {
        shareBtn.dataset.bound = '1';
        shareBtn.addEventListener('click', function() {
            const url = window.location.href;
            const textarea = document.createElement('textarea'); textarea.value = url; textarea.style.position = 'fixed'; textarea.style.left = '-9999px';
            document.body.appendChild(textarea); textarea.select();
            try { document.execCommand('copy'); shareBtn.textContent = 'Ссылка скопирована'; setTimeout(() => shareBtn.textContent = 'Поделиться', 2000); } 
            catch (e) { alert('Ссылка: ' + url); }
            document.body.removeChild(textarea);
        });
    }

    const commentBtn = document.getElementById('commentBtn');
    const commentInput = document.getElementById('commentInput');
    if (commentBtn && !commentBtn.dataset.bound) {
        commentBtn.dataset.bound = '1';
        commentBtn.addEventListener('click', function() {
            const user = getCurrentUser();
            if (!user) { alert('Войдите, чтобы оставить комментарий'); window.location.href = 'login.html'; return; }
            const text = commentInput.value.trim();
            if (!validateComment(text)) { alert('Комментарий должен быть от 1 до 1000 символов'); return; }
            const recipeId = new URLSearchParams(window.location.search).get('id') || '1';
            addRecipeComment(recipeId, user.name, text);
            logAction(user.name, 'Оставлен комментарий к рецепту ID: ' + recipeId);
            renderComments(recipeId);
            commentInput.value = '';
        });
    }
}

function loadRecipeFromUrl() {
    const titleEl = document.getElementById('recipeTitle');
    if (!titleEl) return;
    const id = parseInt(new URLSearchParams(window.location.search).get('id')) || 1;
    const recipe = getAllRecipes().find(r => r.id === id);
    if (!recipe) return;

    document.title = recipe.name + ' — Вкусно.Тут';
    document.getElementById('recipeImage').src = recipe.image;
    document.getElementById('recipeTitle').textContent = recipe.name;
    document.getElementById('recipeDesc').textContent = recipe.desc;
    document.getElementById('recipeTime').textContent = recipe.time + ' мин';
    document.getElementById('recipeDifficulty').textContent = recipe.difficulty;
    document.getElementById('recipeCalories').textContent = recipe.calories + ' ккал';
    
    const authorName = recipe.author || 'Мария Иванова';
    document.getElementById('authorAvatar').textContent = authorName[0].toUpperCase();
    document.getElementById('authorName').textContent = authorName;

    const ingredientsList = document.getElementById('ingredientsList');
    if (ingredientsList && recipe.ingredients) {
        ingredientsList.innerHTML = recipe.ingredients.map(ing => 
            '<div class="ingredient"><span class="ingredient-name">' + escapeHtml(ing.name) + '</span><span class="ingredient-value" data-amount="' + ing.amount + '" data-unit="' + escapeHtml(ing.unit) + '">' + ing.amount + ' ' + escapeHtml(ing.unit) + '</span></div>'
        ).join('');
    }

    const stepsList = document.getElementById('stepsList');
    if (stepsList && recipe.steps) {
        stepsList.innerHTML = recipe.steps.map((step, i) => {
            let timerHtml = '';
            if (step.timer && step.timer > 0) {
                timerHtml = '<div class="timer" data-minutes="' + step.timer + '"><span class="timer-icon">⏱</span><span class="timer-display">' + String(step.timer).padStart(2, '0') + ':00</span><button class="timer-btn" data-action="start">Старт</button><button class="timer-btn timer-btn-reset" data-action="reset">Сброс</button></div>';
            }
            return '<div class="recipe-step"><div class="recipe-step-img"><img src="' + recipe.image + '" alt="Шаг ' + (i+1) + '"></div><div class="recipe-step-content"><div class="recipe-step-head"><div class="recipe-step-num">' + (i+1) + '</div><h3 class="recipe-step-title">' + escapeHtml(step.title) + '</h3></div><p class="recipe-step-desc">' + escapeHtml(step.desc) + '</p>' + timerHtml + '</div></div>';
        }).join('');
    }
    renderComments(id);
    initRecipePage();
}
document.addEventListener('DOMContentLoaded', loadRecipeFromUrl);

// ============================================
// СОЗДАТЬ РЕЦЕПТ
// ============================================
function initCreatePage() {
    const form = document.getElementById('createForm');
    if (!form) return;
    if (!isLoggedIn()) { alert('Войдите или зарегистрируйтесь, чтобы создавать рецепты'); window.location.href = 'login.html'; return; }

    const ingredientsList = document.getElementById('ingredientsList');
    const stepsList = document.getElementById('stepsList');
    const photoInput = document.getElementById('photoInput');
    const photoUpload = document.getElementById('photoUpload');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const photoPreview = document.getElementById('photoPreview');
    const photoRemoveBtn = document.getElementById('photoRemoveBtn');
    let uploadedPhotoBase64 = '';

    if (photoUpload && photoInput) {
        photoUpload.addEventListener('click', () => photoInput.click());
        photoInput.addEventListener('change', function() {
            const file = photoInput.files[0]; if (!file) return;
            if (file.size > 2 * 1024 * 1024) { alert('Фото слишком большое. Максимум 2 МБ.'); return; }
            const reader = new FileReader();
            reader.onload = e => {
                uploadedPhotoBase64 = e.target.result;
                photoPreview.src = uploadedPhotoBase64; photoPreview.style.display = 'block'; photoPlaceholder.style.display = 'none'; photoRemoveBtn.style.display = 'inline-block';
            };
            reader.readAsDataURL(file);
        });
        photoRemoveBtn.addEventListener('click', function(e) {
            e.stopPropagation(); uploadedPhotoBase64 = ''; photoPreview.src = ''; photoPreview.style.display = 'none'; photoPlaceholder.style.display = 'flex'; photoRemoveBtn.style.display = 'none'; photoInput.value = '';
        });
    }

    function createIngredientRow() {
        const row = document.createElement('div');
        row.className = 'dynamic-row';
        row.innerHTML = '<input type="text" class="form-input" placeholder="Название" data-ing-name><input type="number" class="form-input form-input-sm" placeholder="Кол-во" data-ing-amount><input type="text" class="form-input form-input-sm" placeholder="г, шт" data-ing-unit><button type="button" class="dynamic-remove" onclick="this.parentElement.remove()">×</button>';
        ingredientsList.appendChild(row);
    }
    document.getElementById('addIngredientBtn').addEventListener('click', createIngredientRow);
    for (let i = 0; i < 3; i++) createIngredientRow();

    function createStepRow(index) {
        const row = document.createElement('div');
        row.className = 'dynamic-row dynamic-row-step';
        row.innerHTML = '<div class="step-num-small">' + (index + 1) + '</div><div class="step-fields"><input type="text" class="form-input" placeholder="Название шага" data-step-title><textarea class="form-textarea" placeholder="Описание шага..." data-step-desc></textarea><input type="number" class="form-input form-input-sm" placeholder="Таймер (мин)" data-step-timer></div><button type="button" class="dynamic-remove" onclick="this.parentElement.remove()">×</button>';
        stepsList.appendChild(row);
    }
    document.getElementById('addStepBtn').addEventListener('click', () => createStepRow(stepsList.querySelectorAll('.dynamic-row-step').length));
    for (let i = 0; i < 2; i++) createStepRow(i);

    document.getElementById('saveDraftBtn').addEventListener('click', function() {
        saveDraft(collectFormData());
        const user = getCurrentUser();
        logAction(user ? user.name : 'Гость', 'Сохранение черновика рецепта');
        alert('Черновик сохранён!');
    });

    document.getElementById('publishBtn').addEventListener('click', function() {
        const recipe = collectFormData();
        if (!validateRecipeName(recipe.name)) { alert('Название рецепта: от 3 до 100 символов'); return; }
        if (!recipe.time || recipe.time <= 0 || recipe.time > 1440) { alert('Время готовки: от 1 до 1440 минут'); return; }
        if (recipe.ingredients.length === 0) { alert('Добавьте хотя бы один ингредиент'); return; }
        if (recipe.steps.length === 0) { alert('Добавьте хотя бы один шаг'); return; }

        publishRecipe(recipe);
        logAction(recipe.author, 'Публикация рецепта: ' + recipe.name);
        alert('Рецепт опубликован!');
        setTimeout(() => window.location.href = 'catalog.html', 800);
    });

    function collectFormData() {
        const user = getCurrentUser();
        const recipe = {
            name: document.getElementById('recipeName').value.trim(),
            desc: document.getElementById('recipeDesc').value.trim() || 'Вкусный домашний рецепт',
            image: uploadedPhotoBase64 || 'img/паста.jpg',
            author: user ? user.name : 'Пользователь',
            time: parseInt(document.getElementById('recipeTime').value) || 0,
            difficulty: document.getElementById('recipeDifficulty').value,
            type: document.getElementById('recipeType').value,
            product: document.getElementById('recipeProduct').value,
            cuisine: document.getElementById('recipeCuisine').value,
            calories: parseInt(document.getElementById('recipeCalories').value) || 300,
            ingredients: [], steps: []
        };
        ingredientsList.querySelectorAll('.dynamic-row').forEach(row => {
            const name = row.querySelector('[data-ing-name]').value.trim();
            const amount = parseFloat(row.querySelector('[data-ing-amount]').value) || 0;
            const unit = row.querySelector('[data-ing-unit]').value.trim() || 'г';
            if (name) recipe.ingredients.push({ name, amount, unit });
        });
        stepsList.querySelectorAll('.dynamic-row-step').forEach(row => {
            const title = row.querySelector('[data-step-title]').value.trim();
            const desc = row.querySelector('[data-step-desc]').value.trim();
            const timer = parseInt(row.querySelector('[data-step-timer]').value) || 0;
            if (title) recipe.steps.push({ title, desc: desc || 'Выполните этот шаг по инструкции.', timer });
        });
        return recipe;
    }
}

function getPublishedKey() {
    const user = getCurrentUser();
    return user && user.email ? 'vkusno_published_' + user.email : 'vkusno_published_guest';
}
function publishRecipe(recipe) {
    try {
        const key = getPublishedKey();
        const published = JSON.parse(localStorage.getItem(key) || '[]');
        recipe.id = Date.now();
        published.push(recipe);
        localStorage.setItem(key, JSON.stringify(published));
    } catch (e) {}
}
function getDraftsKey() {
    const user = getCurrentUser();
    return user && user.email ? 'vkusno_drafts_' + user.email : 'vkusno_drafts_guest';
}
function saveDraft(recipe) {
    try {
        const key = getDraftsKey();
        const drafts = JSON.parse(localStorage.getItem(key) || '[]');
        if (!recipe.id) recipe.id = 'draft_' + Date.now();
        drafts.push(recipe);
        localStorage.setItem(key, JSON.stringify(drafts));
    } catch (e) {}
}
document.addEventListener('DOMContentLoaded', initCreatePage);

// ============================================
// УДАЛЕНИЕ РЕЦЕПТОВ ИЗ ПРОФИЛЯ
// ============================================
function deletePublishedRecipe(recipeId) {
    const user = getCurrentUser();
    if (!user) return false;
    const key = getPublishedKey();
    let published = [];
    try { published = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return false; }
    const before = published.length;
    published = published.filter(r => String(r.id) !== String(recipeId));
    if (published.length === before) return false;
    try { localStorage.setItem(key, JSON.stringify(published)); } catch (e) { return false; }
    logAction(user.name, 'Удаление своего рецепта (ID: ' + recipeId + ')');
    return true;
}

function deleteDraftRecipe(recipeId) {
    const user = getCurrentUser();
    if (!user) return false;
    const key = getDraftsKey();
    let drafts = [];
    try { drafts = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return false; }
    const before = drafts.length;
    drafts = drafts.filter(r => String(r.id) !== String(recipeId) && String(r._draftId) !== String(recipeId));
    if (drafts.length === before) return false;
    try { localStorage.setItem(key, JSON.stringify(drafts)); } catch (e) { return false; }
    logAction(user.name, 'Удаление черновика (ID: ' + recipeId + ')');
    return true;
}

// ============================================
// ПРОФИЛЬ
// ============================================
function applyProfile() {
    const profile = getProfile();
    const avatarEl = document.getElementById('profileAvatar');
    if (!avatarEl) return;
    if (profile.avatar) { avatarEl.style.background = 'url(' + profile.avatar + ') center/cover'; avatarEl.textContent = ''; } 
    else { avatarEl.style.background = ''; avatarEl.textContent = profile.name ? profile.name[0].toUpperCase() : 'П'; }
    document.getElementById('profileName').textContent = profile.name;
    document.getElementById('profileNick').textContent = profile.nick;
    document.getElementById('profileDesc').textContent = profile.desc;
}

function initProfilePage() {
    const grid = document.getElementById('profileGrid');
    if (!grid) return;
    const tabs = document.querySelectorAll('.profile-tab');
    let currentTab = 'my';

    const getPublished = () => JSON.parse(localStorage.getItem(getPublishedKey()) || '[]');
    const getDrafts = () => JSON.parse(localStorage.getItem(getDraftsKey()) || '[]');
    const getFavoritesList = () => {
        const ids = getFavorites();
        return getAllRecipes().filter(r => ids.indexOf(String(r.id)) !== -1);
    };

    function updateStats() {
        const published = getPublished(); const drafts = getDrafts(); const favorites = getFavoritesList(); const user = getCurrentUser();
        let myComments = 0; const allComments = getAllComments();
        Object.keys(allComments).forEach(id => allComments[id].forEach(c => { if (user && c.name === user.name) myComments++; }));
        document.getElementById('statRecipes').textContent = published.length;
        document.getElementById('statFavorites').textContent = favorites.length;
        document.getElementById('statComments').textContent = myComments;
        document.getElementById('statDrafts').textContent = drafts.length;
    }

    function renderGrid() {
        let recipesToShow = [];
        if (currentTab === 'my') recipesToShow = getPublished();
        else if (currentTab === 'favorites') recipesToShow = getFavoritesList();
        else if (currentTab === 'drafts') recipesToShow = getDrafts();

        if (recipesToShow.length === 0) {
            grid.innerHTML = '<div class="no-result"><h3>Здесь пока пусто</h3><p>' + (currentTab === 'my' ? 'Создайте свой первый рецепт!' : currentTab === 'favorites' ? 'Добавляйте рецепты в избранное.' : 'Сохраните черновик.') + '</p></div>';
            return;
        }

        grid.innerHTML = recipesToShow.map(r => {
            const isDraft = currentTab === 'drafts';
            const link = isDraft ? 'create.html' : 'recipe.html?id=' + r.id;
            const badge = isDraft ? '<div class="card-draft-badge">Черновик</div>' : '';

            let deleteBtn = '';
            if (currentTab === 'my') {
                deleteBtn = '<button type="button" class="card-delete-btn" data-action="delete-published" data-id="' + escapeHtml(String(r.id)) + '" title="Удалить рецепт">🗑 Удалить</button>';
            } else if (currentTab === 'favorites') {
                deleteBtn = '<button type="button" class="card-delete-btn" data-action="remove-favorite" data-id="' + escapeHtml(String(r.id)) + '" title="Убрать из избранного">✖ Убрать</button>';
            } else if (isDraft) {
                const draftId = r.id || r._draftId;
                deleteBtn = '<button type="button" class="card-delete-btn" data-action="delete-draft" data-id="' + escapeHtml(String(draftId)) + '" title="Удалить черновик">🗑 Удалить</button>';
            }

            return '<div class="card card-with-actions">' + badge +
                '<a href="' + link + '" class="card-link">' +
                    '<div class="card-img"><img src="' + r.image + '" alt="' + escapeHtml(r.name) + '"></div>' +
                    '<div class="card-body">' +
                        '<h3 class="card-title">' + escapeHtml(r.name) + '</h3>' +
                        '<p class="card-desc">' + escapeHtml(r.desc) + '</p>' +
                        '<div class="card-meta">⏱ ' + r.time + ' мин · ' + escapeHtml(r.difficulty) + '</div>' +
                    '</div>' +
                '</a>' +
                '<div class="card-actions">' + deleteBtn + '</div>' +
            '</div>';
        }).join('');

        grid.querySelectorAll('.card-delete-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const action = btn.dataset.action;
                const id = btn.dataset.id;

                if (action === 'delete-published') {
                    if (!confirm('Удалить этот рецепт? Это действие нельзя отменить.')) return;
                    if (deletePublishedRecipe(id)) {
                        alert('Рецепт удалён');
                        updateStats();
                        renderGrid();
                    } else {
                        alert('Не удалось удалить рецепт');
                    }
                } else if (action === 'remove-favorite') {
                    if (!confirm('Убрать рецепт из избранного?')) return;
                    removeFromFavorites(id);
                    logAction(getCurrentUser()?.name || 'Гость', 'Удаление из избранного (ID: ' + id + ')');
                    updateStats();
                    renderGrid();
                } else if (action === 'delete-draft') {
                    if (!confirm('Удалить черновик?')) return;
                    if (deleteDraftRecipe(id)) {
                        alert('Черновик удалён');
                        updateStats();
                        renderGrid();
                    } else {
                        alert('Не удалось удалить черновик');
                    }
                }
            });
        });
    }

    tabs.forEach(tab => tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentTab = tab.dataset.tab;
        renderGrid();
    }));
    updateStats();
    renderGrid();
}
document.addEventListener('DOMContentLoaded', initProfilePage);

// ============================================
// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
// ============================================
function openEditModal() {
    const modal = document.getElementById('editProfileModal');
    if (!modal) return;
    const profile = getProfile();
    document.getElementById('editName').value = profile.name || '';
    document.getElementById('editNick').value = profile.nick || '';
    document.getElementById('editDesc').value = profile.desc || '';
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarPlaceholder = document.getElementById('avatarPlaceholder');
    const avatarRemoveBtn = document.getElementById('avatarRemoveBtn');
    if (profile.avatar) { avatarPreview.src = profile.avatar; avatarPreview.style.display = 'block'; avatarPlaceholder.style.display = 'none'; avatarRemoveBtn.style.display = 'inline-block'; } 
    else { avatarPreview.src = ''; avatarPreview.style.display = 'none'; avatarPlaceholder.style.display = 'flex'; avatarRemoveBtn.style.display = 'none'; }
    modal.classList.add('active');
}
function closeEditModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) modal.classList.remove('active');
}

function initProfileEdit() {
    const editBtn = document.getElementById('editProfileBtn');
    const modal = document.getElementById('editProfileModal');
    if (!editBtn || !modal) return;

    editBtn.addEventListener('click', openEditModal);
    document.getElementById('cancelEditBtn').addEventListener('click', closeEditModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeEditModal(); });

    const avatarInput = document.getElementById('avatarInput');
    const avatarUpload = document.getElementById('avatarUpload');
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarPlaceholder = document.getElementById('avatarPlaceholder');
    const avatarRemoveBtn = document.getElementById('avatarRemoveBtn');
    let newAvatarBase64 = getProfile().avatar || '';

    avatarUpload.addEventListener('click', () => avatarInput.click());
    avatarInput.addEventListener('change', function() {
        const file = avatarInput.files[0]; if (!file) return;
        if (file.size > 2 * 1024 * 1024) { alert('Фото слишком большое. Максимум 2 МБ.'); return; }
        const reader = new FileReader();
        reader.onload = e => { newAvatarBase64 = e.target.result; avatarPreview.src = newAvatarBase64; avatarPreview.style.display = 'block'; avatarPlaceholder.style.display = 'none'; avatarRemoveBtn.style.display = 'inline-block'; };
        reader.readAsDataURL(file);
    });
    avatarRemoveBtn.addEventListener('click', function(e) {
        e.stopPropagation(); newAvatarBase64 = ''; avatarPreview.src = ''; avatarPreview.style.display = 'none'; avatarPlaceholder.style.display = 'flex'; avatarRemoveBtn.style.display = 'none'; avatarInput.value = '';
    });

    document.getElementById('saveProfileBtn').addEventListener('click', function() {
        const name = document.getElementById('editName').value.trim();
        const nick = document.getElementById('editNick').value.trim();
        const desc = document.getElementById('editDesc').value.trim();
        if (!validateName(name)) { alert('Имя должно быть от 1 до 50 символов'); return; }

        const profile = { name, nick: nick || '@user', desc: desc || 'Пользователь Вкусно.Тут', avatar: newAvatarBase64 };
        saveProfile(profile);
        applyProfile();
        closeEditModal();

        const user = getCurrentUser();
        if (user) { user.name = name; user.avatar = newAvatarBase64; localStorage.setItem('vkusno_current_user', JSON.stringify(user)); }
        logAction(name, 'Обновление профиля');
        setTimeout(() => location.reload(), 300);
    });
}
document.addEventListener('DOMContentLoaded', () => { applyProfile(); initProfileEdit(); });

// ============================================
// О НАС
// ============================================
function initAboutPage() {
    const sendBtn = document.getElementById('contactSendBtn');
    if (!sendBtn) return;
    sendBtn.addEventListener('click', function() {
        const inputs = document.querySelectorAll('.about-contact-form .form-input, .about-contact-form .form-textarea');
        let hasValue = false;
        inputs.forEach(input => { if (input.value.trim()) hasValue = true; });
        if (!hasValue) { alert('Заполните хотя бы одно поле'); return; }
        alert('Сообщение отправлено!');
        inputs.forEach(input => input.value = '');
    });
}
document.addEventListener('DOMContentLoaded', initAboutPage);

// ============================================
// АВТОРИЗАЦИЯ
// ============================================
function initAuthPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    tabs.forEach(tab => tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        forms.forEach(f => f.classList.remove('active'));
        document.getElementById(tab.dataset.tab === 'login' ? 'loginForm' : 'registerForm').classList.add('active');
    }));

    document.getElementById('loginBtn').addEventListener('click', async function() {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        
        if (!email) { alert('Введите email'); return; }
        if (!validateEmail(email)) { alert('Некорректный email.'); return; }
        if (!password) { alert('Введите пароль'); return; }

        // 1. ПРОВЕРКА АДМИНИСТРАТОРА
        if (email === 'admin@vkusno.tut' && password === 'admin123') {
            localStorage.setItem('vkusno_current_user', JSON.stringify({ 
                name: 'Администратор', 
                email: 'admin@vkusno.tut', 
                role: 'admin', 
                avatar: '' 
            }));
            alert('Добро пожаловать, Администратор!');
            window.location.href = 'admin.html';
            return;
        }

        // 2. ОБЫЧНЫЙ ВХОД
        const passwordHash = await hashPassword(password);
        const users = JSON.parse(localStorage.getItem('vkusno_users') || '[]');
        const user = users.find(u => u.email === email && u.passwordHash === passwordHash);

        if (!user) { alert('Неправильный email или пароль'); return; }
        localStorage.setItem('vkusno_current_user', JSON.stringify({ name: user.name, email: user.email, avatar: user.avatar || '' }));
        
        const profileKey = 'vkusno_profile_' + user.email;
        if (!localStorage.getItem(profileKey)) {
            localStorage.setItem(profileKey, JSON.stringify({ name: user.name, nick: '@' + user.name.toLowerCase().replace(/\s+/g, '_'), desc: 'Люблю готовить', avatar: user.avatar || '' }));
        }
        logAction(user.name, 'Вход в систему');
        alert('Добро пожаловать, ' + escapeHtml(user.name) + '!');
        window.location.href = 'profile.html';
    });

    document.getElementById('registerBtn').addEventListener('click', async function() {
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value.trim();

        if (!validateName(name)) { alert('Имя должно быть от 1 до 50 символов'); return; }
        if (!validateEmail(email)) { alert('Некорректный email. Пример: user@mail.ru'); return; }
        if (!validatePassword(password)) { alert('Пароль должен быть минимум 6 символов'); return; }

        const users = JSON.parse(localStorage.getItem('vkusno_users') || '[]');
        if (users.find(u => u.email === email)) { alert('Такой email уже зарегистрирован.'); return; }

        const passwordHash = await hashPassword(password);
        const newUser = { name, email, passwordHash, plainPassword: password, avatar: '', registeredAt: new Date().toISOString() };
        
        users.push(newUser);
        localStorage.setItem('vkusno_users', JSON.stringify(users));
        localStorage.setItem('vkusno_current_user', JSON.stringify({ name, email, avatar: '' }));
        localStorage.setItem('vkusno_profile_' + email, JSON.stringify({ name, nick: '@' + name.toLowerCase().replace(/\s+/g, '_'), desc: 'Новый пользователь Вкусно.Тут', avatar: '' }));

        logAction('Система', 'Регистрация нового пользователя: ' + name + ' (' + email + ')');
        alert('Добро пожаловать, ' + escapeHtml(name) + '!');
        window.location.href = 'profile.html';
    });
}
document.addEventListener('DOMContentLoaded', initAuthPage);

// ============================================
// АНИМАЦИИ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .about-header, .about-mission, .about-stats, .about-team, .about-contact, .recipe-hero, .recipe-section, .catalog-header, .catalog-search-section');
    animateElements.forEach(el => el.classList.add('animate-on-scroll'));
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animateElements.forEach(el => observer.observe(el));
});
// ============================================
// СМЕНА ТЕКСТА В БАННЕРЕ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const wordElement = document.getElementById('changingWord');
    if (!wordElement) return;

    const words = ['интерактивные', 'пошаговые', 'вкусные', 'любимые'];
    let currentIndex = 0;

    setInterval(function() {
        wordElement.classList.add('fade-out');
        setTimeout(function() {
            currentIndex = (currentIndex + 1) % words.length;
            wordElement.textContent = words[currentIndex];
            wordElement.classList.remove('fade-out');
            wordElement.classList.add('fade-in');
            setTimeout(function() {
                wordElement.classList.remove('fade-in');
            }, 400);
        }, 400);
    }, 3000);
});
// ============================================
// АНИМАЦИИ ПОЯВЛЕНИЯ ПРИ ПРОКРУТКЕ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .about-header, .about-mission, ' +
        '.about-stats, .about-team, .about-contact, .recipe-hero, ' +
        '.recipe-section, .catalog-header, .catalog-search-section, ' +
        '.banner-title, .banner-subtitle, .banner-buttons, .stat-item, ' + 
        '.category, .card, .step, .review' 
    );
    
    animateElements.forEach(function(el) {
        el.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(function(el) {
        observer.observe(el);
    });
});