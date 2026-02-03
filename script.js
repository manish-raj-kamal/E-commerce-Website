// Sample Product Data
const products = [
    { id: 1, name: 'Smart Watch WH22-6 Fitne...', category: 'deals', brand: 'Apple', price: 35999, originalPrice: null, rating: 4.5, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop', topItem: true, favorited: false },
    { id: 2, name: 'Tennis Rackets for Beginners', category: 'sport', brand: 'Nike', price: 2499, originalPrice: null, rating: 4.3, image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400&h=400&fit=crop', topItem: false, favorited: false },
    { id: 3, name: 'Premium Boxing Gloves for...', category: 'sport', brand: 'Adidas', price: 15799, originalPrice: 21999, rating: 4.6, image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=400&fit=crop', topItem: false, favorited: true },
    { id: 4, name: 'Club Kit 1 Recurve Archer...', category: 'sport', brand: 'Demix', price: 3899, originalPrice: null, rating: 4.2, image: 'https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=400&h=400&fit=crop', topItem: false, favorited: false },
    { id: 5, name: 'Nike White Therma-Fit Pullover Training Hoodie', category: 'fashion', brand: 'Nike', price: 12399, originalPrice: null, rating: 4.6, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', topItem: false, favorited: true, featured: true },
    { id: 6, name: 'Lightweight White Nike T...', category: 'sport', brand: 'Nike', price: 16799, originalPrice: null, rating: 4.8, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', topItem: true, favorited: false },
    { id: 7, name: 'Crypto Wallet Hardware', category: 'crypto', brand: 'Samsung', price: 7199, originalPrice: null, rating: 4.7, image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop', topItem: false, favorited: false },
    { id: 8, name: 'Fitness Tracker Band', category: 'health', brand: 'Xiaomi', price: 3999, originalPrice: 5599, rating: 4.4, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop', topItem: false, favorited: false },
    { id: 9, name: 'Yoga Mat Premium', category: 'health', brand: 'Adidas', price: 3199, originalPrice: null, rating: 4.5, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', topItem: false, favorited: false },
    { id: 10, name: 'Designer T-Shirt', category: 'fashion', brand: 'Nike', price: 3599, originalPrice: null, rating: 4.3, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', topItem: false, favorited: false },
    { id: 11, name: 'Canvas Wall Art', category: 'art', brand: 'Columbia', price: 9599, originalPrice: null, rating: 4.8, image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400&h=400&fit=crop', topItem: false, favorited: false },
    { id: 12, name: 'Smart Home Speaker', category: 'home', brand: 'Xiaomi', price: 6399, originalPrice: 7999, rating: 4.6, image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=400&fit=crop', topItem: true, favorited: false },
    { id: 13, name: 'Gaming Headset Pro', category: 'gaming', brand: 'Sony', price: 12799, originalPrice: null, rating: 4.7, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop', topItem: true, favorited: false },
    { id: 14, name: 'Wireless Earbuds', category: 'music', brand: 'Apple', price: 15899, originalPrice: 19899, rating: 4.8, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop', topItem: false, favorited: true },
    { id: 15, name: 'Coffee Maker Deluxe', category: 'home', brand: 'Samsung', price: 7199, originalPrice: null, rating: 4.4, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', topItem: false, favorited: false },
];

let cart = [];
let filters = {
    category: 'all',
    maxPrice: 40000,
    ratings: [],
    brands: []
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupEventListeners();
});

// Display Products
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    if (product.featured) {
        card.classList.add('featured');
    }
    if (product.favorited) {
        card.classList.add('favorited');
    }
    
    const favoriteIcon = product.favorited ? '♥' : '♡';
    const topItemBadge = product.topItem ? '<div class="top-item-badge">Top item</div>' : '';
    const originalPriceHTML = product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : '';
    
    card.innerHTML = `
        ${topItemBadge}
        <button class="favorite-btn" onclick="toggleFavorite(${product.id})">${favoriteIcon}</button>
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-price">
                ₹${product.price.toLocaleString('en-IN')}
                ${originalPriceHTML}
            </div>
        </div>
    `;
    
    return card;
}

// Toggle Favorite
function toggleFavorite(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.favorited = !product.favorited;
        applyFilters();
        
        // Show notification
        if (product.favorited) {
            showNotification(`${product.name} added to wishlist!`);
        } else {
            showNotification(`${product.name} removed from wishlist!`);
        }
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

// Update Cart Count
function updateCartCount() {
    const cartItems = document.querySelector('.cart-items');
    if (cartItems) {
        cartItems.textContent = cart.length;
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: #1a1a2e;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Nav Tab Buttons
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Category Buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filters.category = btn.dataset.category;
            applyFilters();
        });
    });

    // Price Slider
    const priceSlider = document.getElementById('priceSlider');
    const maxPriceDisplay = document.getElementById('maxPrice');
    
    priceSlider.addEventListener('input', (e) => {
        filters.maxPrice = parseInt(e.target.value);
        maxPriceDisplay.textContent = `₹${filters.maxPrice}`;
        applyFilters();
    });

    // Delivery Toggle
    const deliveryBtns = document.querySelectorAll('.delivery-btn');
    deliveryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            deliveryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Rating Filters
    const ratingFilters = document.querySelectorAll('.rating-filter');
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            applyFilters();
        });
    });

    // Brand Filters
    const brandFilters = document.querySelectorAll('.brand-filter');
    brandFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            applyFilters();
        });
    });
}

// Apply Filters
function applyFilters() {
    let filteredProducts = products;

    // Category Filter
    if (filters.category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }

    // Price Filter
    filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);

    // Rating Filter
    if (filters.ratings.length > 0) {
        const minRating = Math.min(...filters.ratings);
        filteredProducts = filteredProducts.filter(p => p.rating >= minRating);
    }

    // Brand Filter
    if (filters.brands.length > 0) {
        filteredProducts = filteredProducts.filter(p => filters.brands.includes(p.brand));
    }

    displayProducts(filteredProducts);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
