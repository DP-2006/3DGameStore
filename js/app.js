let cart = [];
let currentLang = 'fa';
const bgImages = {
    top: "url('https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1920&auto=format&fit=crop')",
    bottom: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop')"
};

window.onload = function() { renderProducts(); updateBackground(); };

function updateBackground() {
    const scrollY = window.scrollY;
    const body = document.body;
    if (scrollY < 100) { body.style.backgroundImage = bgImages.top; } else { body.style.backgroundImage = bgImages.bottom; }
}
window.addEventListener('scroll', updateBackground);

function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    products.forEach(p => {
        const title = p[`title_${currentLang}`];
        const html = `
            <div class="product-card">
                <img src="${p.img}" alt="${title}" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${title}</h3>
                    <span class="product-price">${p.price} ${translations[currentLang].currency}</span>
                    <button class="add-to-cart" onclick="addToCart(${p.id})">${translations[currentLang].btn_buy}</button>
                </div>
            </div>`;
        container.innerHTML += html;
    });
}

function addToCart(id) { cart.push(products.find(p => p.id === id)); updateCartUI(); showToast(); }
function updateCartUI() { document.getElementById('cart-count').innerText = cart.length; }
function showToast() { const t = document.getElementById('toast'); t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2000); }

function openCheckout() {
    if (cart.length === 0) return alert('Cart is empty');
    document.getElementById('checkout-modal').style.display = 'flex';
    document.getElementById('modal-count').innerText = cart.length;
    document.getElementById('modal-price').innerText = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('checkout-error').style.display = 'none';
}
function closeCheckout() { document.getElementById('checkout-modal').style.display = 'none'; }
function processPayment() {
    if (!document.getElementById('terms-check').checked) return document.getElementById('checkout-error').style.display = 'block';
    alert('Processing...'); cart = []; updateCartUI(); closeCheckout();
}

function changeLanguage(lang) {
    currentLang = lang;
    const isRtl = lang === 'fa' || lang === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); if(translations[lang][k]) el.innerText = translations[lang][k]; });
    renderProducts();
}
function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }
function toggleMenu() { document.getElementById('main-nav').classList.toggle('active'); }
function showConsultationAlert() { alert('Coming soon'); }
