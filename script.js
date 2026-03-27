// Book Hub - Main Script

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Data ---
    const products = [
        {
            id: 1,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            price: 15.99,
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: 2,
            title: 'Atomic Habits',
            author: 'James Clear',
            price: 21.50,
            image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: 3,
            title: '1984',
            author: 'George Orwell',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: 4,
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            price: 18.00,
            image: 'https://images.unsplash.com/photo-1629196914225-ebefa716279f?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: 5,
            title: 'Sapiens: A Brief History',
            author: 'Yuval Noah Harari',
            price: 24.99,
            image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: 6,
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            price: 14.50,
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: 7,
            title: 'Design Patterns',
            author: 'Gang of Four',
            price: 35.00,
            image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: 8,
            title: 'Dune',
            author: 'Frank Herbert',
            price: 22.00,
            image: 'https://images.unsplash.com/photo-1476275466078-4007374efac4?q=80&w=600&auto=format&fit=crop'
        }
    ];

    let cart = [];

    // --- DOM Elements ---
    const productsGrid = document.getElementById('products-grid');
    const cartIcon = document.getElementById('cart-icon');
    const cartBadge = document.getElementById('cart-badge');
    const cartOverlay = document.getElementById('cart-overlay');
    const sideCart = document.getElementById('side-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMsg = document.getElementById('empty-cart-msg');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderBooksInput = document.getElementById('order-books');
    
    const orderForm = document.getElementById('order-form');
    const orderConfirmation = document.getElementById('order-confirmation');
    const continueShoppingBtn = document.getElementById('continue-shopping');

    // --- Render Products ---
    function renderProducts() {
        productsGrid.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-author">${product.author}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            productsGrid.appendChild(card);
        });

        // Add event listeners right after creation
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.add-to-cart-btn').getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }

    // --- Cart Functions ---
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({ ...product, cartItemId: Date.now() }); // Unique ID for each cart item
            updateCartUI();
            openCart(); // Instantly appear as per requirement
        }
    }

    function removeFromCart(cartItemId) {
        cart = cart.filter(item => item.cartItemId !== cartItemId);
        updateCartUI();
    }

    function updateCartUI() {
        // Update badge
        cartBadge.textContent = cart.length;

        // Render items
        const existingItems = document.querySelectorAll('.cart-item');
        existingItems.forEach(el => el.remove());

        if (cart.length === 0) {
            emptyCartMsg.style.display = 'block';
            orderBooksInput.value = '';
            orderBooksInput.placeholder = "Your cart is currently empty...";
        } else {
            emptyCartMsg.style.display = 'none';
            let bookNames = [];

            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <button class="remove-item" data-id="${item.cartItemId}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(itemEl);
                bookNames.push(item.title);
            });

            // Update order form input
            orderBooksInput.value = bookNames.join(', ');

            // Add remove listeners
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const cartItemId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
                    removeFromCart(cartItemId);
                });
            });
        }

        // Update total price
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    function openCart() {
        cartOverlay.classList.add('active');
        sideCart.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeCart() {
        cartOverlay.classList.remove('active');
        sideCart.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- Event Listeners ---
    cartIcon.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    checkoutBtn.addEventListener('click', () => {
        closeCart();
        document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    });

    // --- Order Form Handling ---
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('Your cart is empty! Please add some books before placing an order.');
            return;
        }

        // Show confirmation success message
        orderForm.style.display = 'none';
        orderConfirmation.classList.remove('hidden');

        // Clear Cart
        cart = [];
        updateCartUI();
        orderForm.reset();
    });

    continueShoppingBtn.addEventListener('click', () => {
        orderConfirmation.classList.add('hidden');
        orderForm.style.display = 'block';
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            navMenu.style.display = 'block';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = 'white';
            navMenu.style.padding = '20px';
            navMenu.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            
            const ul = navMenu.querySelector('ul');
            ul.style.flexDirection = 'column';
            ul.style.gap = '15px';
            ul.style.alignItems = 'center';
            
            // Add click listener to close menu when a link is clicked
            const links = navMenu.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navMenu.style.display = 'none';
                });
            });
        } else {
            navMenu.style.display = 'none';
            navMenu.style.position = 'static';
            const ul = navMenu.querySelector('ul');
            ul.style.flexDirection = 'row';
        }
    });

    // Initialization
    renderProducts();
});
