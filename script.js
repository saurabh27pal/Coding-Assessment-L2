document.addEventListener('DOMContentLoaded', () => {
    let productData = {}; // To store product data
    let currentCategory = 'Men'; // Default category

    // Fetch product data from the provided URL
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            productData = formatProductData(data);
            showProducts(currentCategory);
        })
        .catch(error => console.error('Error fetching product data:', error));

    function formatProductData(data) {
        const productData = {};
        data.categories.forEach(category => {
            productData[category.category_name] = category.category_products;
        });
        return productData;
    }

    function showProducts(category) {
        currentCategory = category;
        const products = productData[category];

        const productContainer = document.querySelector('.product-list');
        productContainer.innerHTML = '';

        products.forEach(product => {
            const card = createProductCard(product);
            productContainer.appendChild(card);
        });

        updateActiveTab();
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Image with badge
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;
        imageContainer.appendChild(image);

        if (product.badge_text) {
            const badge = document.createElement('div');
            badge.classList.add('badge');
            badge.textContent = product.badge_text;
            imageContainer.appendChild(badge);
        }

        card.appendChild(imageContainer);

        // Title and Vendor
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');

        const title = document.createElement('h3');
        title.classList.add('product-title');
        title.textContent = product.title;
        titleContainer.appendChild(title);

        const vendorContainer = document.createElement('div');
        vendorContainer.classList.add('vendor-container');

        const vendorDot = document.createElement('span');
        vendorDot.classList.add('vendor-dot');
        vendorDot.textContent = '•';
        vendorContainer.appendChild(vendorDot);

        const vendor = document.createElement('span');
        vendor.classList.add('vendor');
        vendor.textContent = product.vendor;
        vendorContainer.appendChild(vendor);

        titleContainer.appendChild(vendorContainer);

        card.appendChild(titleContainer);

        // Price and Discount
        const priceContainer = document.createElement('div');
        priceContainer.classList.add('price-container');

        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = `Rs ${product.price}.00`;

        const comparePrice = document.createElement('p');
        comparePrice.classList.add('compare-price');
        comparePrice.textContent = `Rs ${product.compare_at_price}.00`;

        const discount = document.createElement('span');
        discount.classList.add('discount');
        const discountValue = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
        discount.textContent = `${discountValue}% Off`;

        priceContainer.appendChild(price);
        priceContainer.appendChild(comparePrice);
        priceContainer.appendChild(discount);
        card.appendChild(priceContainer);

        // Add to Cart Button
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.add('add-to-cart');
        card.appendChild(addToCartBtn);

        return card;
    }

    function updateActiveTab() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.id === `${currentCategory}-tab`) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    document.getElementById('Men-tab').addEventListener('click', () => {
        showProducts('Men');
    });

    document.getElementById('Women-tab').addEventListener('click', () => {
        showProducts('Women');
    });

    document.getElementById('Kids-tab').addEventListener('click', () => {
        showProducts('Kids');
    });
});