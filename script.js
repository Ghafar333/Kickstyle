// ================================================
//  KickStyle — Shared JS (All Pages)
//  WhatsApp: 03491705092 | Email: ghotoghotki185@gmail.com
//  Currency: PKR | Location: Karachi, Pakistan
// ================================================

/* ---- PRODUCT DATA (prices in PKR) ---- */
const PRODUCTS = [
  { id:'p1',  name:'Nike Air Max 270',    brand:'Nike',        price:41999, rating:4.5, category:'running',    img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { id:'p2',  name:'Adidas Ultraboost 22',brand:'Adidas',      price:49999, rating:5.0, category:'running',    img:'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80' },
  { id:'p3',  name:'Jordan Retro 4',      brand:'Jordan',      price:55999, rating:4.0, category:'basketball', img:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80' },
  { id:'p4',  name:'Puma RS-X Toys',      brand:'Puma',        price:33999, rating:4.5, category:'lifestyle',  img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80' },
  { id:'p5',  name:'Nike Air Force 1',    brand:'Nike',        price:35999, rating:4.8, category:'lifestyle',  img:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80' },
  { id:'p6',  name:'New Balance 574',     brand:'New Balance', price:27999, rating:4.2, category:'lifestyle',  img:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80' },
  { id:'p7',  name:'Converse Chuck 70',   brand:'Converse',    price:24999, rating:4.6, category:'lifestyle',  img:'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80' },
  { id:'p8',  name:'Adidas NMD R1',       brand:'Adidas',      price:38999, rating:4.3, category:'running',    img:'https://images.unsplash.com/photo-1556048219-bb6978360b84?w=500&q=80' },
  { id:'p9',  name:'Nike React Infinity', brand:'Nike',        price:44999, rating:4.7, category:'running',    img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { id:'p10', name:'Jordan 1 High OG',    brand:'Jordan',      price:61999, rating:4.9, category:'basketball', img:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80' },
  { id:'p11', name:'Vans Old Skool',      brand:'Vans',        price:22999, rating:4.4, category:'lifestyle',  img:'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80' },
  { id:'p12', name:'Reebok Classic',      brand:'Reebok',      price:30999, rating:4.1, category:'lifestyle',  img:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80' },
];

const WA_NUMBER = '923491705092';
const STORE_EMAIL = 'ghotoghotki185@gmail.com';

function formatPKR(n) { return 'PKR ' + Number(n).toLocaleString(); }

/* ---- CART ---- */
const Cart = {
  items: JSON.parse(localStorage.getItem('ks_cart') || '[]'),

  save() { localStorage.setItem('ks_cart', JSON.stringify(this.items)); this.updateBadge(); this.renderDrawer(); },

  add(product) {
    const ex = this.items.find(i => i.id === product.id && i.size === product.size);
    if (ex) ex.qty++;
    else this.items.push({ ...product, qty: 1 });
    this.save();
    showToast(`${product.name} added to cart!`, 'success');
    openCart();
  },

  remove(id, size) { this.items = this.items.filter(i => !(i.id === id && i.size === size)); this.save(); },

  updateQty(id, size, qty) {
    const item = this.items.find(i => i.id === id && i.size === size);
    if (item) { item.qty = parseInt(qty); if (item.qty <= 0) this.remove(id, size); }
    this.save();
  },

  total() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },

  updateBadge() {
    const c = this.count();
    document.querySelectorAll('.cart-badge').forEach(el => { el.textContent = c; el.style.display = c > 0 ? 'flex' : 'none'; });
  },

  renderDrawer() {
    const list = document.getElementById('cart-items-list');
    const total = document.getElementById('cart-total');
    if (!list) return;
    if (!this.items.length) {
      list.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p><a href="product.html" class="btn btn-sm" style="margin-top:1rem">Shop Now</a></div>`;
    } else {
      list.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <div class="cart-item-img"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>
          <div class="cart-item-info">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-size">Size: ${item.size} &nbsp;·&nbsp; ${formatPKR(item.price)}</p>
            <div class="cart-item-qty">
              <button onclick="Cart.updateQty('${item.id}','${item.size}',${item.qty-1})">−</button>
              <span>${item.qty}</span>
              <button onclick="Cart.updateQty('${item.id}','${item.size}',${item.qty+1})">+</button>
              <button class="remove-btn" onclick="Cart.remove('${item.id}','${item.size}')"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      `).join('');
    }
    if (total) total.textContent = formatPKR(this.total());
  }
};

/* ---- AUTH ---- */
const Auth = {
  currentUser: JSON.parse(localStorage.getItem('ks_user') || 'null'),
  login(email, pw) {
    const users = JSON.parse(localStorage.getItem('ks_users') || '[]');
    const user = users.find(u => u.email === email && u.password === pw);
    if (user) { this.currentUser = user; localStorage.setItem('ks_user', JSON.stringify(user)); return true; }
    return false;
  },
  register(name, email, pw) {
    const users = JSON.parse(localStorage.getItem('ks_users') || '[]');
    if (users.find(u => u.email === email)) return false;
    const user = { name, email, password: pw, id: Date.now() };
    users.push(user); localStorage.setItem('ks_users', JSON.stringify(users));
    this.currentUser = user; localStorage.setItem('ks_user', JSON.stringify(user));
    return true;
  },
  logout() { this.currentUser = null; localStorage.removeItem('ks_user'); updateUserUI(); showToast('Logged out.', 'info'); }
};

/* ---- TOAST ---- */
function showToast(msg, type = 'success') {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  const icon = type==='success'?'check-circle':type==='error'?'times-circle':'info-circle';
  t.innerHTML = `<i class="fas fa-${icon}"></i> ${msg}`;
  c.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3200);
}

/* ---- CART DRAWER ---- */
function openCart() { document.getElementById('cart-drawer')?.classList.add('open'); document.getElementById('overlay')?.classList.add('show'); Cart.renderDrawer(); }
function closeCart() { document.getElementById('cart-drawer')?.classList.remove('open'); checkOverlay(); }

/* ---- OVERLAY ---- */
function checkOverlay() {
  const any = ['auth-modal','cart-drawer','search-overlay','checkout-modal'].some(id => document.getElementById(id)?.classList.contains('open'));
  document.getElementById('overlay')?.classList.toggle('show', any);
}

/* ---- AUTH MODAL ---- */
function openAuthModal(tab='login') { document.getElementById('auth-modal')?.classList.add('open'); document.getElementById('overlay')?.classList.add('show'); switchAuthTab(tab); }
function closeAuthModal() { document.getElementById('auth-modal')?.classList.remove('open'); checkOverlay(); }
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
  document.getElementById(`${tab}-form`)?.classList.add('active');
}

/* ---- SEARCH ---- */
function openSearch() { document.getElementById('search-overlay')?.classList.add('open'); document.getElementById('overlay')?.classList.add('show'); setTimeout(() => document.getElementById('search-input')?.focus(), 80); }
function closeSearch() { document.getElementById('search-overlay')?.classList.remove('open'); const si=document.getElementById('search-input'); if(si) si.value=''; const sr=document.getElementById('search-results'); if(sr) sr.innerHTML=''; checkOverlay(); }
function handleSearch(e) {
  const q = e.target.value.toLowerCase().trim();
  const sr = document.getElementById('search-results');
  if (!sr) return;
  if (!q) { sr.innerHTML=''; return; }
  const results = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  sr.innerHTML = results.length
    ? results.map(p => `<div class="search-result-item" onclick="Cart.add({...PRODUCTS.find(x=>x.id==='${p.id}'),size:'US 10'})"><div class="sr-img"><img src="${p.img}" alt="${p.name}"></div><div class="sr-info"><p class="sr-name">${p.name}</p><p class="sr-brand">${p.brand} · ${formatPKR(p.price)}</p></div><button class="sr-add"><i class="fas fa-cart-plus"></i></button></div>`).join('')
    : `<p class="no-results">No results for "${q}"</p>`;
}

/* ---- CHECKOUT ---- */
function proceedToCheckout() { if (!Cart.items.length) { showToast('Your cart is empty!','error'); return; } closeCart(); renderCheckoutSummary(); document.getElementById('checkout-modal')?.classList.add('open'); document.getElementById('overlay')?.classList.add('show'); }
function closeCheckoutModal() { document.getElementById('checkout-modal')?.classList.remove('open'); checkOverlay(); }
function renderCheckoutSummary() {
  const el = document.getElementById('checkout-summary');
  if (!el) return;
  el.innerHTML = Cart.items.map(i => `<div class="checkout-item"><span>${i.name} (${i.size}) × ${i.qty}</span><span>${formatPKR(i.price*i.qty)}</span></div>`).join('')
    + `<hr style="border-color:#334155;margin:1rem 0"><div class="checkout-item total-row"><strong>Total</strong><strong>${formatPKR(Cart.total())}</strong></div>`;
}
function handleCheckout(e) {
  e.preventDefault();
  const f = e.target;
  const fname=f.querySelector('#co-fname')?.value||'', lname=f.querySelector('#co-lname')?.value||'',
        phone=f.querySelector('#co-phone')?.value||'', email=f.querySelector('#co-email')?.value||'',
        address=f.querySelector('#co-addr')?.value||'', city=f.querySelector('#co-city')?.value||'', zip=f.querySelector('#co-zip')?.value||'';
  let msg = `🛍️ *New KickStyle Order*\n\n*Customer:* ${fname} ${lname}\n*Email:* ${email}\n*Phone:* ${phone}\n*Address:* ${address}, ${city} ${zip}\n\n*Items:*\n`;
  Cart.items.forEach(i => { msg += `• ${i.name} (${i.size}) × ${i.qty} — ${formatPKR(i.price*i.qty)}\n`; });
  msg += `\n*Total: ${formatPKR(Cart.total())}*\n\nPlease confirm my order!`;
  closeCheckoutModal(); Cart.items=[]; Cart.save();
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  showToast('🎉 Order sent to WhatsApp!', 'success');
}

/* ---- WHATSAPP ---- */
function openWhatsApp(msg='') {
  const text = msg || `Hi KickStyle! I'm interested in your sneakers. Please share details.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}
function orderViaWhatsApp() {
  if (!Cart.items.length) { showToast('Your cart is empty!','error'); return; }
  let msg = `🛍️ *KickStyle Cart Order*\n\n`;
  Cart.items.forEach(i => { msg += `• ${i.name} (${i.size}) × ${i.qty} = ${formatPKR(i.price*i.qty)}\n`; });
  msg += `\n*Total: ${formatPKR(Cart.total())}*\n\nPlease confirm my order!`;
  openWhatsApp(msg);
}

/* ---- CONTACT FORM ---- */
function handleContactForm(e) {
  e.preventDefault();
  const f=e.target;
  const name=f.querySelector('[name="name"]')?.value||'', email=f.querySelector('[name="email"]')?.value||'',
        subject=f.querySelector('[name="subject"]')?.value||'KickStyle Inquiry', message=f.querySelector('[name="message"]')?.value||'';
  const body=`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  window.location.href=`mailto:${STORE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  showToast('Opening your email client...','info'); f.reset();
}

/* ---- USER UI ---- */
function updateUserUI() {
  const dd=document.getElementById('user-dropdown'); if(!dd) return;
  if(Auth.currentUser) {
    dd.innerHTML=`<div class="dropdown-user-info"><div class="user-avatar">${Auth.currentUser.name.charAt(0).toUpperCase()}</div><span style="color:white;font-size:.88rem">${Auth.currentUser.name}</span></div><a href="#" class="dropdown-item"><i class="fas fa-user"></i> My Profile</a><a href="#" class="dropdown-item"><i class="fas fa-box"></i> My Orders</a><a href="#" class="dropdown-item"><i class="fas fa-heart"></i> Wishlist</a><hr style="border-color:#334155;margin:8px 0"><a href="#" class="dropdown-item" onclick="Auth.logout()"><i class="fas fa-sign-out-alt"></i> Logout</a>`;
  } else {
    dd.innerHTML=`<a href="#" class="dropdown-item" onclick="openAuthModal('login')"><i class="fas fa-sign-in-alt"></i> Login</a><a href="#" class="dropdown-item" onclick="openAuthModal('register')"><i class="fas fa-user-plus"></i> Register</a>`;
  }
}

/* ---- NEWSLETTER ---- */
function handleNewsletter(inputId) {
  const el=document.getElementById(inputId||'nl-email');
  if(el?.value){ showToast('Thanks for subscribing! 🎉','success'); el.value=''; }
  else showToast('Please enter a valid email.','error');
}

/* ---- FAQ ---- */
function toggleFaq(el) { el.classList.toggle('open'); }

/* ---- ADD TO CART BUTTONS ---- */
function bindCartButtons() {
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.onclick = () => {
      const p=PRODUCTS.find(x=>x.id===btn.dataset.addToCart);
      if(p) Cart.add({...p, size: btn.dataset.size||'US 10'});
    };
  });
}

/* ---- STICKY HEADER ---- */
function initHeader() {
  const h=document.querySelector('header'); if(!h) return;
  const update=()=>h.classList.toggle('scrolled',window.scrollY>50);
  window.addEventListener('scroll',update,{passive:true}); update();
}

/* ---- MOBILE NAV ---- */
function toggleMobileNav() {
  const nav=document.getElementById('mobile-nav'), ham=document.getElementById('hamburger');
  nav?.classList.toggle('is-open'); ham?.classList.toggle('is-open');
  document.getElementById('overlay')?.classList.toggle('show', nav?.classList.contains('is-open'));
}
function closeMobileNav() {
  document.getElementById('mobile-nav')?.classList.remove('is-open');
  document.getElementById('hamburger')?.classList.remove('is-open');
  checkOverlay();
}

/* ---- DOMContentLoaded ---- */
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge(); updateUserUI(); initHeader(); bindCartButtons();
  document.getElementById('search-input')?.addEventListener('input', handleSearch);
  document.getElementById('overlay')?.addEventListener('click', () => { closeCart(); closeAuthModal(); closeSearch(); closeCheckoutModal(); closeMobileNav(); });
  document.getElementById('login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const email=document.getElementById('login-email').value, pw=document.getElementById('login-password').value;
    if(Auth.login(email,pw)){ closeAuthModal(); updateUserUI(); showToast(`Welcome back, ${Auth.currentUser.name}!`,'success'); }
    else showToast('Invalid email or password','error');
  });
  document.getElementById('register-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name=document.getElementById('reg-name').value, email=document.getElementById('reg-email').value, pw=document.getElementById('reg-password').value;
    if(Auth.register(name,email,pw)){ closeAuthModal(); updateUserUI(); showToast(`Welcome to KickStyle, ${name}!`,'success'); }
    else showToast('Email already registered','error');
  });
  document.getElementById('checkout-form')?.addEventListener('submit', handleCheckout);
  document.getElementById('user-icon-btn')?.addEventListener('click', e => { e.stopPropagation(); document.getElementById('user-dropdown')?.classList.toggle('show'); });
  document.addEventListener('click', () => { document.getElementById('user-dropdown')?.classList.remove('show'); });
  window.addEventListener('resize', () => { if(window.innerWidth>992) closeMobileNav(); });
  document.addEventListener('keydown', e => { if(e.key==='Escape'){ closeSearch(); closeAuthModal(); closeCart(); closeCheckoutModal(); closeMobileNav(); }});
});
