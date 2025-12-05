// ecommerce.js — renders product grid, handles search and cart
document.addEventListener('DOMContentLoaded', function() {
    // product data (could be replaced by a fetch from an API)
    const products = [
        { product_id: 1, name: "Smartphone", description: "High-end smartphone.", price: 599.99, image: "https://via.placeholder.com/600x400?text=Smartphone", category: "Electronics" },
        { product_id: 2, name: "Laptop", description: "Powerful laptop.", price: 999.99, image: "https://via.placeholder.com/600x400?text=Laptop", category: "Electronics" },
        { product_id: 3, name: "Wireless Headphones", description: "Noise-cancelling.", price: 149.99, image: "https://via.placeholder.com/600x400?text=Headphones", category: "Audio" },
        { product_id: 4, name: "Smartwatch", description: "Fitness tracking.", price: 199.99, image: "https://via.placeholder.com/600x400?text=Smartwatch", category: "Wearables" },
        { product_id: 5, name: "Wooden Table", description: "Handmade table.", price: 159.00, image: "https://via.placeholder.com/600x400?text=Table", category: "Home" },
        { product_id: 6, name: "Cozy Sofa", description: "Comfortable sofa.", price: 299.00, image: "https://via.placeholder.com/600x400?text=Sofa", category: "Home" }
    ];

    // DOM references
    const grid = document.querySelector('.products .grid');
    const searchInput = document.querySelector('.search-form input[type="search"]');
    const headerInner = document.querySelector('.header-inner');

    // Create cart indicator in header
    let cart = { count: 0, items: {} };
    try { const stored = localStorage.getItem('eco_cart'); if (stored) cart = JSON.parse(stored); } catch (e) { console.warn('localStorage parse failed', e) }

    function createCartElement() {
        const el = document.createElement('div');
        el.className = 'cart-indicator';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.gap = '0.5rem';
        el.innerHTML = `<button class="btn" aria-label="Open cart" style="display:flex;align-items:center;gap:.5rem"><i class=\"fa-solid fa-bag-shopping\"></i><span class=\"cart-count\">${cart.count}</span></button>`;
        return el;
    }

    let cartEl = null;
    if (headerInner) {
        cartEl = createCartElement();
        headerInner.appendChild(cartEl);
        cartEl.addEventListener('click', () => {
            alert(`Cart: ${cart.count} item(s)`);
        });
    }

    function saveCart() {
        try { localStorage.setItem('eco_cart', JSON.stringify(cart)); } catch (e) { console.warn('localStorage set failed', e) }
        const countNode = document.querySelector('.cart-count');
        if (countNode) countNode.textContent = cart.count;
    }

    // Render products into grid
    function renderProducts(list) {
        if (!grid) return;
        grid.innerHTML = '';
        list.forEach(p => {
            const article = document.createElement('article');
            article.className = 'card';

            const img = document.createElement('img');
            img.src = p.image;
            img.alt = p.name;
            img.onerror = () => { img.src = 'https://via.placeholder.com/600x400?text=No+Image' }

            const body = document.createElement('div');
            body.className = 'card-body';

            const h3 = document.createElement('h3');
            h3.textContent = p.name;

            const price = document.createElement('p');
            price.className = 'price';
            price.textContent = '$' + Number(p.price).toFixed(2);

            const add = document.createElement('a');
            add.href = '#';
            add.className = 'btn small';
            add.textContent = 'Add to cart';
            add.dataset.id = p.product_id;

            body.appendChild(h3);
            body.appendChild(price);
            body.appendChild(add);

            article.appendChild(img);
            article.appendChild(body);
            grid.appendChild(article);
        });
    }

    // Initial render
    renderProducts(products);
    saveCart();

    // Add to cart handler (event delegation)
    if (grid) {
        grid.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn.small');
            if (!btn) return;
            e.preventDefault();
            const id = btn.dataset.id;
            const product = products.find(p => String(p.product_id) === String(id));
            if (!product) return;
            cart.count = (cart.count || 0) + 1;
            cart.items[id] = (cart.items[id] || 0) + 1;
            saveCart();
            // small visual feedback
            btn.textContent = 'Added ✓';
            setTimeout(() => btn.textContent = 'Add to cart', 1200);
        });
    }

    // Search/filter
    if (searchInput) {
        let timer = null;
        searchInput.addEventListener('input', function(e) {
            clearTimeout(timer);
            const q = e.target.value.trim().toLowerCase();
            timer = setTimeout(() => {
                if (!q) { renderProducts(products); return }
                const filtered = products.filter(p => (p.name + ' ' + (p.category || '') + ' ' + (p.description || '')).toLowerCase().includes(q));
                renderProducts(filtered);
            }, 200);
        });
    }

});
// old product array and previous DOM logic removed — replaced by dynamic renderer above