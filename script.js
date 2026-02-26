// ===== Product Data =====
const products = [
    {
        id: 1,
        name: 'Butter Croissants',
        price: 7500,
        category: 'pastries',
        rating: 5,
        reviews: 127,
        image: 'assets/close-up-composition-tasty-croissants.jpg',
        description: 'Flaky, buttery layers of perfection baked fresh daily',
        specs: ['Made with French butter', 'Baked fresh daily', 'Contains wheat, dairy']
    },
    {
        id: 2,
        name: 'Rich Chocolate Cake',
        price: 37500,
        category: 'cakes',
        rating: 4.5,
        reviews: 98,
        image: 'assets/front-view-delicious-cake-concept.jpg',
        description: 'Decadent chocolate delight with smooth frosting',
        specs: ['Double chocolate layers', 'Premium cocoa', 'Contains wheat, dairy, eggs']
    },
    {
        id: 3,
        name: 'Artisan Sourdough',
        price: 13500,
        category: 'bread',
        rating: 5,
        reviews: 156,
        image: 'assets/side-view-qoqal-with-semeni-wooden-box.jpg',
        description: 'Traditional sourdough with wild fermentation',
        specs: ['Wild fermented', 'Organic flour', 'No preservatives']
    },
    {
        id: 4,
        name: 'French Macarons',
        price: 19500,
        category: 'cookies',
        rating: 5,
        reviews: 203,
        image: 'assets/colorful-macarons-plate.jpg',
        description: 'Delicate almond meringue cookies in assorted flavors',
        specs: ['12-piece assortment', 'Almond-based', 'Contains eggs, dairy']
    },
    {
        id: 5,
        name: 'Gourmet Cupcakes',
        price: 10500,
        category: 'cakes',
        rating: 4.5,
        reviews: 89,
        image: 'assets/delicious-cupcakes-with-blueberries.jpg',
        description: 'Moist cakes with premium frosting and toppings',
        specs: ['6-piece box', 'Premium vanilla', 'Customizable flavors']
    },
    {
        id: 6,
        name: 'Danish Pastries',
        price: 9000,
        category: 'pastries',
        rating: 5,
        reviews: 134,
        image: 'assets/delicious-cinnamon-rolls-tray.jpg',
        description: 'Buttery layers with sweet fillings',
        specs: ['Fresh daily', 'Multiple flavors', 'Contains wheat, dairy']
    }
];

// ===== Hamburger Menu ===== 
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===== Cart Management =====
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cart = getCart();
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = total;
    }
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart(cart);
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartItemQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(cart);
    }
}

// ===== User Authentication =====
function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function saveUser(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
    updateAuthMenu();
}

function logout() {
    localStorage.removeItem('user');
    updateAuthMenu();
    showNotification('Logged out successfully');
    setTimeout(() => window.location.href = 'index.html', 1000);
}

function updateAuthMenu() {
    const authMenu = document.getElementById('authMenu');
    const user = getUser();
    
    if (authMenu) {
        if (user) {
            authMenu.innerHTML = `
                <a href="profile.html" class="nav-link">
                    <i class="fas fa-user"></i> ${user.fullname || user.email}
                </a>
            `;
        } else {
            authMenu.innerHTML = `<a href="login.html" class="nav-link">Login</a>`;
        }
    }
}

// ===== Notifications =====
function showNotification(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    if (type === 'error') {
        toast.style.backgroundColor = '#dc3545';
    } else if (type === 'warning') {
        toast.style.backgroundColor = '#ffc107';
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Login Page =====
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                const userData = {
                    email: email,
                    fullname: email.split('@')[0],
                    loginDate: new Date().toISOString()
                };
                saveUser(userData);
                showNotification('Login successful!');
                setTimeout(() => window.location.href = 'index.html', 1000);
            }
        });
    }
}

// ===== Register Page =====
function initRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            if (fullname && email && password) {
                const userData = {
                    fullname: fullname,
                    email: email,
                    phone: '',
                    address: '',
                    registeredDate: new Date().toISOString()
                };
                saveUser(userData);
                showNotification('Account created successfully!');
                setTimeout(() => window.location.href = 'index.html', 1000);
            }
        });
    }
}

// ===== Products Page =====
function initProductsPage() {
    displayProducts(products);
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            let sorted = [...products];
            switch(e.target.value) {
                case 'price-low':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    sorted.sort((a, b) => b.rating - a.rating);
                    break;
            }
            displayProducts(sorted);
        });
    }
}

function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" width="300" height="250" loading="lazy" onerror="this.src='./assets/backup-image.jpg'">
                <span class="badge">Featured</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-rating">
                    ${Array(Math.floor(product.rating)).fill('<i class="fas fa-star"></i>').join('')}
                    ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half"></i>' : ''}
                    <span>(${product.reviews} reviews)</span>
                </div>
                <div class="product-footer">
                    <span class="price">₦${product.price.toFixed(0)}</span>
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// ===== Product Detail Page =====
function initProductDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id')) || 1;
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    document.getElementById('breadcrumbName').textContent = product.name;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('mainImage').src = product.image;
    document.getElementById('mainImage').loading = 'lazy';
    document.getElementById('mainImage').onerror = function() { this.src = './assets/backup-image.jpg'; };
    document.getElementById('productPrice').textContent = `₦${product.price.toFixed(0)}`;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productStars').innerHTML = Array(Math.floor(product.rating)).fill('<i class="fas fa-star"></i>').join('');
    document.getElementById('reviewCount').textContent = `(${product.reviews} reviews)`;

    const specsList = document.getElementById('productSpecs');
    specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');

    const quantityInput = document.getElementById('quantity');
    document.getElementById('decreaseQty')?.addEventListener('click', () => {
        quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
    });
    document.getElementById('increaseQty')?.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    document.getElementById('addToCartBtn')?.addEventListener('click', () => {
        addToCart(product.id, parseInt(quantityInput.value));
    });

    const related = products.filter(p => p.category === product.category && p.id !== product.id);
    const relatedContainer = document.getElementById('relatedProducts');
    if (relatedContainer) {
        relatedContainer.innerHTML = related.map(p => `
            <div class="product-card" onclick="goToProduct(${p.id})">
                <div class="product-image">
                    <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='./assets/backup-image.jpg'">
                </div>
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <div class="product-footer">
                        <span class="price">₦${p.price.toFixed(0)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// ===== Shopping Cart Page =====
function initCartPage() {
    const cart = getCart();
    const emptyMessage = document.getElementById('emptyCartMessage');
    const cartItems = document.getElementById('cartItemsContainer');
    const cartSummary = document.getElementById('cartSummary');

    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        cartItems.style.display = 'none';
        cartSummary.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        cartItems.style.display = 'flex';
        cartSummary.style.display = 'block';

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='./assets/backup-image.jpg'">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">₦${item.price.toFixed(0)} each</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1}); initCartPage();">-</button>
                        <input type="number" value="${item.quantity}" readonly>
                        <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1}); initCartPage();">+</button>
                    </div>
                    <span class="cart-item-price">₦${(item.price * item.quantity).toFixed(0)}</span>
                    <button class="remove-item" onclick="removeFromCart(${item.id}); initCartPage();">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        updateCartSummary();
    }
}

function updateCartSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `₦${subtotal.toFixed(0)}`;
    document.getElementById('shipping').textContent = `₦${shipping.toFixed(0)}`;
    document.getElementById('total').textContent = `₦${total.toFixed(0)}`;
}

// ===== Checkout Page =====
function initCheckoutPage() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Cart is empty', 'warning');
        window.location.href = 'cart.html';
        return;
    }

    displayCheckoutItems();
    updateCheckoutSummary();

    const user = getUser();
    if (user) {
        document.getElementById('firstName').value = (user.fullname || '').split(' ')[0];
        document.getElementById('lastName').value = (user.fullname || '').split(' ')[1] || '';
        document.getElementById('email').value = user.email;
    }
}

function displayCheckoutItems() {
    const cart = getCart();
    const container = document.getElementById('checkoutItems');
    if (!container) return;

    container.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="checkout-item-info">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity}</p>
                <p class="checkout-item-price">₦${(item.price * item.quantity).toFixed(0)}</p>
            </div>
        </div>
    `).join('');
}

function updateCheckoutSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingMethod = document.querySelector('input[name="shipping"]:checked')?.value;
    let shipping = 0;
    
    if (shippingMethod === 'express') shipping = 9.99;
    if (shippingMethod === 'overnight') shipping = 19.99;
    
    const total = subtotal + shipping;

    document.getElementById('checkoutSubtotal').textContent = `₦${subtotal.toFixed(0)}`;
    document.getElementById('checkoutShipping').textContent = `₦${shipping.toFixed(0)}`;
    document.getElementById('checkoutTotal').textContent = `₦${total.toFixed(0)}`;
}

function proceedToPayment() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    
    if (!firstName || !lastName || !email) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    document.getElementById('shippingForm').style.display = 'none';
    document.getElementById('paymentForm').style.display = 'block';

    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active');
        if (index < 1) step.classList.add('active');
        if (index === 1) step.classList.add('active');
    });
}

function backToShipping() {
    document.getElementById('paymentForm').style.display = 'none';
    document.getElementById('shippingForm').style.display = 'block';
    document.querySelectorAll('.step')[0].classList.add('active');
    document.querySelectorAll('.step')[1].classList.remove('active');
}

function processPayment() {
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    if (!cardName || !cardNumber || !expiryDate || !cvv) {
        showNotification('Please fill in all payment details', 'error');
        return;
    }

    function normalizeCurrency(str) {
        if (!str) return '₦0.00';
        return String(str).replace(/\$/g, '₦');
    }

    const order = {
        id: 'ORD' + Date.now(),
        date: new Date().toISOString(),
        items: getCart(),
        total: normalizeCurrency(document.getElementById('checkoutTotal').textContent),
        status: 'processing'
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    localStorage.removeItem('cart');
    updateCartCount();

    window.location.href = `order-confirmation.html?id=${order.id}`;
}

// ===== Order Confirmation Page =====
function initConfirmationPage() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('id');
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('orderNumber').textContent = order.id;
    document.getElementById('orderDate').textContent = new Date(order.date).toLocaleDateString();
    document.getElementById('deliveryDate').textContent = new Date(new Date(order.date).getTime() + 5*24*60*60*1000).toLocaleDateString();
    document.getElementById('orderTotal').textContent = String(order.total).replace(/\$/g, '₦');

    const itemsContainer = document.getElementById('confirmationItems');
    itemsContainer.innerHTML = order.items.map(item => `
        <div class="order-item">
            <div class="order-item-info">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="order-item-price">
                <p class="price">₦${(item.price * item.quantity).toFixed(0)}</p>
            </div>
        </div>
    `).join('');
}

// ===== User Profile Page =====
function initProfilePage() {
    const user = getUser();
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('profileName').textContent = user.fullname || user.email;
    document.getElementById('profileEmail').textContent = user.email;

    document.querySelectorAll('.profile-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            showProfileSection(section);
            
            document.querySelectorAll('.profile-menu-item').forEach(m => m.classList.remove('active'));
            item.classList.add('active');
        });
    });

    loadProfileDashboard();
    loadOrders();
    loadAddresses();
    loadWishlist();
}

function showProfileSection(section) {
    document.querySelectorAll('.profile-section-content').forEach(el => {
        el.classList.remove('active');
    });
    const sectionEl = document.getElementById(`${section}-section`);
    if (sectionEl) sectionEl.classList.add('active');
}

function loadProfileDashboard() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('pendingOrders').textContent = orders.filter(o => o.status === 'processing').length;

    const recentOrders = document.getElementById('recentOrders');
    if (orders.length > 0) {
        recentOrders.innerHTML = orders.slice(-3).map(order => {
            const displayTotal = String(order.total).replace(/\$/g, '₦');
            return `
            <div class="order-card">
                <div class="order-info">
                    <h3>${order.id}</h3>
                    <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
                    <p>Total: ${displayTotal}</p>
                </div>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
        `}).join('');
    }
}

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const container = document.getElementById('ordersContainer');
    
    if (orders.length === 0) {
        container.innerHTML = '<p>No orders yet</p>';
        return;
    }

    container.innerHTML = orders.map(order => {
        const displayTotal = String(order.total).replace(/\$/g, '₦');
        return `
        <div class="order-card">
            <div class="order-info">
                <h3>${order.id}</h3>
                <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
                <p>Items: ${order.items.length}</p>
            </div>
            <div style="text-align: right;">
                <p style="margin-bottom: 0.5rem;">${displayTotal}</p>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
        </div>
    `}).join('');
}

function loadAddresses() {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const container = document.getElementById('addressesContainer');
    
    if (addresses.length === 0) {
        container.innerHTML = '<p>No addresses saved</p>';
        return;
    }

    container.innerHTML = addresses.map((addr, index) => `
        <div class="address-card">
            <h4>${addr.fullName}</h4>
            <p>${addr.address}</p>
            <p>${addr.city}, ${addr.state} ${addr.zip}</p>
            <p>${addr.phone}</p>
            <div class="address-card-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn" onclick="deleteAddress(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteAddress(index) {
    let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    addresses.splice(index, 1);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    loadAddresses();
    showNotification('Address deleted');
}

function showAddressForm() {
    document.getElementById('addressForm').style.display = 'block';
}

function hideAddressForm() {
    document.getElementById('addressForm').style.display = 'none';
}

function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const container = document.getElementById('wishlistContainer');
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p>No items in wishlist</p>';
        return;
    }

    const wishlistItems = products.filter(p => wishlist.includes(p.id));
    container.innerHTML = wishlistItems.map(p => `
        <div class="product-card" onclick="goToProduct(${p.id})">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='./assets/backup-image.jpg'">
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="product-footer">
                    <span class="price">₦${p.price.toFixed(0)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function deleteAccount() {
    if (confirm('Are you sure? This cannot be undone.')) {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        localStorage.removeItem('orders');
        showNotification('Account deleted');
        setTimeout(() => window.location.href = 'index.html', 1000);
    }
}

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    updateCartCount();
    updateAuthMenu();

    const path = window.location.pathname;
    
    if (path.includes('login.html')) initLoginPage();
    if (path.includes('register.html')) initRegisterPage();
    if (path.includes('products.html')) initProductsPage();
    if (path.includes('product-detail.html')) initProductDetailPage();
    if (path.includes('cart.html')) initCartPage();
    if (path.includes('checkout.html')) initCheckoutPage();
    if (path.includes('order-confirmation.html')) initConfirmationPage();
    if (path.includes('profile.html')) initProfilePage();
});
