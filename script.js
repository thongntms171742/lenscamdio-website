// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeDatePicker();
    initializeFormValidation();
    initializeBookingSystem();
});

// Navbar functionality
function initializeNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage.includes(linkPath) || (currentPage === '/' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Date Picker functionality
function initializeDatePicker() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.min = today;
    });
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                showNotification('Đã gửi thành công!', 'success');
            }
        });
    });
    
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input, 'Vui lòng điền thông tin này');
                isValid = false;
            } else {
                clearError(input);
            }
        });
        
        return isValid;
    }
    
    function showError(input, message) {
        clearError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = 'red';
    }
    
    function clearError(input) {
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        input.style.borderColor = '';
    }
}

// Booking System
function initializeBookingSystem() {
    const bookingBtns = document.querySelectorAll('.book-btn');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    bookingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const studioName = this.dataset.studioName;
            showNotification(`Đang chuyển đến trang đặt lịch ${studioName}...`, 'info');
        });
    });
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.dataset.itemName;
            showNotification(`Đã thêm ${itemName} vào giỏ hàng!`, 'success');
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create icon based on type
    const iconMap = {
        'success': '<i class="fas fa-check-circle"></i>',
        'error': '<i class="fas fa-exclamation-circle"></i>',
        'info': '<i class="fas fa-info-circle"></i>',
        'warning': '<i class="fas fa-exclamation-triangle"></i>'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">${iconMap[type] || iconMap.info}</div>
        <div class="notification-message">${message}</div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        min-width: 300px;
        max-width: 400px;
    `;
    
    // Set background based on type
    const backgrounds = {
        'success': 'linear-gradient(135deg, #10b981, #059669)',
        'error': 'linear-gradient(135deg, #ef4444, #dc2626)',
        'info': 'linear-gradient(135deg, #3b82f6, #2563eb)',
        'warning': 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    
    notification.style.background = backgrounds[type] || backgrounds.info;
    
    // Style internal elements
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 1.25rem;
        opacity: 0.9;
    `;
    
    const messageEl = notification.querySelector('.notification-message');
    messageEl.style.cssText = `
        flex: 1;
        line-height: 1.4;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        opacity: 0.7;
        transition: all 0.2s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.7';
        closeBtn.style.background = 'none';
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%) translateY(-20px);
            opacity: 0;
            scale: 0.9;
        }
        to {
            transform: translateX(0) translateY(0);
            opacity: 1;
            scale: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0) translateY(0);
            opacity: 1;
            scale: 1;
        }
        to {
            transform: translateX(100%) translateY(-20px);
            opacity: 0;
            scale: 0.9;
        }
    }
`;
document.head.appendChild(style); 

// ========== PRODUCTS PAGE FUNCTIONALITY ==========

// Initialize Products Page
function initializeProductsPage() {
    if (document.querySelector('.products-grid')) {
        initializeProductSearch();
        initializeProductFilters();
        initializeProductSort();
        initializeProductActions();
        initializeLoadMore();
    }
}

// Product Search
function initializeProductSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterProducts(searchTerm);
        });
    }
}

function filterProducts(searchTerm) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'block';
            product.classList.add('fade-in');
        } else {
            product.style.display = 'none';
            product.classList.remove('fade-in');
        }
    });
}

// Product Filters
function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            filterProductsByCategory(filterValue);
        });
    });
}

function filterProductsByCategory(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            product.classList.add('fade-in');
        } else {
            product.style.display = 'none';
            product.classList.remove('fade-in');
        }
    });
}

// Product Sort
function initializeProductSort() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            sortProducts(sortValue);
        });
    }
}

function sortProducts(sortBy) {
    const productsGrid = document.querySelector('.products-grid');
    const products = Array.from(productsGrid.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.querySelector('.product-title').textContent.localeCompare(b.querySelector('.product-title').textContent);
            case 'price-low':
                return getProductPrice(a) - getProductPrice(b);
            case 'price-high':
                return getProductPrice(b) - getProductPrice(a);
            case 'popular':
                return parseFloat(b.querySelector('.product-rating span').textContent.slice(1, -1)) - 
                       parseFloat(a.querySelector('.product-rating span').textContent.slice(1, -1));
            default:
                return 0;
        }
    });
    
    // Re-append sorted products
    products.forEach(product => productsGrid.appendChild(product));
}

function getProductPrice(productCard) {
    const priceText = productCard.querySelector('.product-price').textContent;
    return parseInt(priceText.replace(/[^\d]/g, ''));
}

// Product Actions
function initializeProductActions() {
    // Heart/Wishlist buttons
    const heartBtns = document.querySelectorAll('.action-btn[title="Yêu thích"]');
    heartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fas')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Đã xóa khỏi yêu thích', 'info');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Đã thêm vào yêu thích', 'success');
            }
        });
    });
    
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.product-btn');
    addToCartBtns.forEach(btn => {
        if (btn.textContent.includes('Thêm vào giỏ')) {
            btn.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('.product-title').textContent;
                addToCart(productName);
                showNotification(`Đã thêm ${productName} vào giỏ hàng!`, 'success');
            });
        }
    });
}

// Load More Products
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more products
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus"></i> Xem thêm sản phẩm';
                showNotification('Đã tải thêm sản phẩm!', 'info');
            }, 1500);
        });
    }
}

// Update cart badge function - improved to handle both navbar and floating button
function updateCartBadge() {
    const cartBadges = document.querySelectorAll('.cart-count, .cart-badge, #cart-count, #floating-cart-badge');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartBadges.forEach(badge => {
        if (badge) {
            badge.textContent = totalItems;
            if (totalItems > 0) {
                badge.classList.remove('hidden');
                // Set attribute for CSS selector
                badge.setAttribute('data-count', totalItems);
            } else {
                badge.classList.add('hidden');
                badge.setAttribute('data-count', '0');
            }
        }
    });
}

// Enhanced Add to Cart Function
function addToCart(productName, price = null, category = null, image = null) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Try to get additional info from button if not provided
    if (!price || !category) {
        const button = document.querySelector(`[onclick*="${productName}"]`);
        if (button) {
            const card = button.closest('.card') || button.closest('.product-card');
            if (card) {
                const priceElement = card.querySelector('.price, .product-price');
                if (priceElement && !price) {
                    price = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
                }
                
                if (!category) {
                    const categoryElement = card.querySelector('.product-badge');
                    if (categoryElement) {
                        category = categoryElement.textContent.trim();
                    }
                }
                
                if (!image) {
                    const imageElement = card.querySelector('img');
                    if (imageElement) {
                        image = imageElement.src;
                    }
                }
            }
        }
    }
    
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price || 0,
            category: category || 'Product',
            image: image || 'https://via.placeholder.com/150',
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Show notification
    showCartNotification(`Đã thêm "${productName}" vào giỏ hàng!`);
}

// Show cart notification
function showCartNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; margin-left: auto;">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Enhanced cart management functions
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (index >= 0 && index < cart.length) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        showCartNotification(`Đã xóa "${removedItem.name}" khỏi giỏ hàng!`, 'error');
        
        // Log activity
        logActivity('cart', 'Xóa khỏi giỏ hàng', `Đã xóa "${removedItem.name}" khỏi giỏ hàng`, {
            productName: removedItem.name,
            price: removedItem.price
        });
        
        // Reload cart if on cart page
        if (window.location.pathname.includes('cart.html')) {
            if (typeof loadCartItems === 'function') {
                loadCartItems();
            }
        }
    }
}

function updateCartItemQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (index >= 0 && index < cart.length) {
        if (newQuantity <= 0) {
            removeFromCart(index);
        } else {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartBadge();
            
            // Reload cart if on cart page
            if (window.location.pathname.includes('cart.html')) {
                if (typeof loadCartItems === 'function') {
                    loadCartItems();
                }
            }
        }
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartBadge();
    showCartNotification('Giỏ hàng đã được làm trống!', 'success');
    
    // Reload cart if on cart page
    if (window.location.pathname.includes('cart.html')) {
        if (typeof loadCartItems === 'function') {
            loadCartItems();
        }
    }
}

function getCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Activity Tracking System
function logActivity(type, title, description, additionalData = {}) {
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    const activity = {
        id: Date.now().toString(),
        type: type,
        title: title,
        description: description,
        timestamp: new Date().toISOString(),
        ...additionalData
    };
    
    activities.unshift(activity);
    
    // Keep only last 50 activities
    if (activities.length > 50) {
        activities.splice(50);
    }
    
    localStorage.setItem('activities', JSON.stringify(activities));
    
    // Trigger custom event for real-time updates
    window.dispatchEvent(new CustomEvent('activityLogged', { detail: activity }));
}

// Enhanced Add to Cart Function with activity tracking
function addToCartWithTracking(productName, price = null, category = null, image = null) {
    const result = addToCart(productName, price, category, image);
    
    // Log activity
    logActivity('cart', 'Thêm vào giỏ hàng', `Đã thêm "${productName}" vào giỏ hàng`, {
        productName: productName,
        price: price,
        category: category
    });
    
    return result;
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    
    // Update cart badge every 5 seconds to sync across tabs
    setInterval(updateCartBadge, 5000);
    
    // Listen for localStorage changes from other tabs
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart' || e.key === 'orders' || e.key === 'activities') {
            updateCartBadge();
            
            // Refresh dashboard if exists
            if (typeof loadUserDashboard === 'function') {
                loadUserDashboard();
            }
        }
    });
});

// ========== LOGIN PAGE FUNCTIONALITY ==========

// Initialize Login Page
function initializeLoginPage() {
    if (document.querySelector('.login-section')) {
        initializeAuthForms();
        initializePasswordToggle();
        initializeLoginValidation();
    }
}

// Auth Forms (Login, Register, Forgot Password)
function initializeAuthForms() {
    // Form switching
    window.showLoginForm = function() {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('forgotPasswordForm').style.display = 'none';
    };
    
    window.showRegisterForm = function() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('forgotPasswordForm').style.display = 'none';
    };
    
    window.showForgotPassword = function() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('forgotPasswordForm').style.display = 'block';
    };
    
    // Form submissions
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');
    const forgotPasswordForm = document.getElementById('forgotPasswordFormElement');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Social login buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            showNotification(`Đang chuyển hướng đến ${provider}...`, 'info');
        });
    });
}

// Password Toggle
function initializePasswordToggle() {
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        const button = input.nextElementSibling;
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };
}

// Login Validation
function initializeLoginValidation() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                showFieldError(this, 'Email không hợp lệ');
            } else {
                clearFieldError(this);
            }
        });
    });
    
    // Password validation
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.id.includes('register')) {
            input.addEventListener('input', function() {
                if (this.value.length < 6) {
                    showFieldError(this, 'Mật khẩu phải có ít nhất 6 ký tự');
                } else {
                    clearFieldError(this);
                }
            });
        }
    });
    
    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = document.getElementById('registerPassword').value;
            if (this.value !== password) {
                showFieldError(this, 'Mật khẩu xác nhận không khớp');
            } else {
                clearFieldError(this);
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(input, message) {
    clearFieldError(input);
    const inputGroup = input.closest('.input-group');
    inputGroup.style.borderColor = '#ef4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        margin-left: 0.5rem;
    `;
    
    inputGroup.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
    const inputGroup = input.closest('.input-group');
    inputGroup.style.borderColor = '';
    
    const errorDiv = inputGroup.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Form Handlers
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showNotification('Vui lòng điền đầy đủ thông tin', 'error');
        return;
    }
    
    // Simulate login
    showNotification('Đang đăng nhập...', 'info');
    
    setTimeout(() => {
        // Store user session
        const userData = {
            email: email,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };
        
        localStorage.setItem('userSession', JSON.stringify(userData));
        
        // Log login activity
        logActivity('auth', 'Đăng nhập', `Người dùng ${email} đã đăng nhập thành công`, {
            email: email,
            userAgent: navigator.userAgent
        });
        
        showNotification('Đăng nhập thành công!', 'success');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('Vui lòng điền đầy đủ thông tin', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showNotification('Vui lòng đồng ý với điều khoản sử dụng', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp', 'error');
        return;
    }
    
    // Simulate registration
    showNotification('Đang tạo tài khoản...', 'info');
    
    setTimeout(() => {
        showNotification('Tạo tài khoản thành công! Vui lòng đăng nhập.', 'success');
        showLoginForm();
    }, 2000);
}

function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    
    if (!email) {
        showNotification('Vui lòng nhập email', 'error');
        return;
    }
    
    // Simulate forgot password
    showNotification('Đang gửi email khôi phục...', 'info');
    
    setTimeout(() => {
        showNotification('Email khôi phục đã được gửi!', 'success');
        showLoginForm();
    }, 2000);
}

// Check User Session
function checkUserSession() {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
        const userData = JSON.parse(userSession);
        
        // Update login button to show user info
        const loginBtns = document.querySelectorAll('.login-btn');
        loginBtns.forEach(btn => {
            btn.innerHTML = `<i class="fas fa-user-circle"></i> ${userData.email.split('@')[0]}`;
            btn.onclick = function() {
                if (confirm('Bạn có muốn đăng xuất?')) {
                    localStorage.removeItem('userSession');
                    showNotification('Đã đăng xuất', 'info');
                    location.reload();
                }
            };
        });
    }
}

// Initialize on document ready
document.addEventListener('DOMContentLoaded', function() {
    // Existing initializations
    initializeNavbar();
    initializeDatePicker();
    initializeFormValidation();
    initializeBookingSystem();
    
    // New initializations
    initializeProductsPage();
    initializeLoginPage();
    checkUserSession();
    updateCartBadge();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 

// Simple Chat Box
// (Chỉ thêm 1 lần ở cuối file, không lặp lại)
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('chatbox-toggle');
  const container = document.getElementById('chatbox-container');
  const input = document.getElementById('chatbox-input');
  const send = document.getElementById('chatbox-send');
  const messages = document.getElementById('chatbox-messages');

  if (!toggle || !container) return;

  toggle.onclick = function() {
    if (container.style.display === 'flex') {
      container.style.display = 'none';
    } else {
      container.style.display = 'flex';
      input.focus();
              if (messages.children.length === 0) {
        addMsg('Xin chào! Tôi là trợ lý AI của LENSCAMDIO. Tôi có thể giúp bạn về đặt lịch studio, thuê máy ảnh và tư vấn dịch vụ. Bạn cần hỗ trợ gì?', 'bot');
      }
    }
  };

  send.onclick = sendMsg;
  input.onkeypress = function(e) { if (e.key === 'Enter') sendMsg(); };

  function sendMsg() {
    const text = input.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    input.value = '';
    setTimeout(() => {
      addMsg(fakeBotReply(text), 'bot');
    }, 700);
  }

  function addMsg(text, who) {
    const div = document.createElement('div');
    div.className = 'chatbox-message ' + who;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function fakeBotReply(text) {
    const t = text.toLowerCase();
    if (t.includes('giá')) return 'Giá thuê studio từ 500.000đ/ngày.';
    if (t.includes('studio')) return 'LENSCAMDIO có nhiều studio với các phong cách khác nhau: Modern, Vintage, Minimalist. Bạn muốn tìm hiểu về loại nào?';
    if (t.includes('đặt lịch')) return 'Bạn muốn đặt lịch studio ngày nào? Chúng tôi có sẵn từ 8:00 - 22:00 hằng ngày.';
    if (t.includes('máy ảnh') || t.includes('camera')) return 'LENSCAMDIO cho thuê các dòng máy ảnh Canon, Sony, Nikon và phụ kiện chuyên nghiệp.';
    if (t.includes('giờ mở cửa') || t.includes('thời gian')) return 'LENSCAMDIO mở cửa từ 8:00 - 22:00, thứ 2 đến chủ nhật.';
    if (t.includes('địa chỉ') || t.includes('ở đâu')) return 'LENSCAMDIO có địa chỉ tại 123 Đường ABC, Quận 1, TP.HCM. Bạn có thể xem bản đồ trong trang Liên hệ.';
    if (t.includes('thanh toán')) return 'LENSCAMDIO hỗ trợ thanh toán qua chuyển khoản, thẻ tín dụng và QR Code.';
    return 'Cảm ơn bạn đã liên hệ LENSCAMDIO! Tôi có thể giúp bạn về giá cả, đặt lịch studio, thuê máy ảnh. Bạn cần hỗ trợ gì?';
  }
}); 