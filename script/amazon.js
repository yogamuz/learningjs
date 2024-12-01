import { cart, addToCart } from '../data/cart.js';
import { products} from '../data/product.js   '


// loadProducts(renderProducts)
// function renderProducts() {}


    let productsHTML = ''
    products.forEach((product) => {
        productsHTML += `<div class="js-products-container product-container">
                    <div class="product-image-container">
                        ${product.image}
                        <div class="product-name limit-to-2-lines">
                                ${product.name}
                        </div>
                    </div>
                    <div class="product-rating-container">
                        <img class="rating-img" src="${product.getStarsUrl()}" alt="">
                        <div class="product-rating-count link-primary">${product.rating.count}</div>
                    </div>
                    <div class="product-price">$${product.getPrice()}</div>
                    <div class="product-quantity-container">
                        <select class="js-quantity-selector" data-testid="quantity-selector">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        ${product.extraInfoHTML()}
                        <div class="product-spacer"></div>
                    </div>
                    <div class="js-added-to-cart-message added-to-cart-message" data-testid="added-to-cart-message">
                        <span class="added-sign"></span>
                    </div>
                    <button class="js-add-to-cart-button add-to-cart-button button-primary" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>`;
    });
    function updateCartQuantity() {

        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity += item.quantity
        })

        document.querySelector('.js-cart-quantity').
            innerHTML = cartQuantity
    }
    let timeoutId;

    function addedMsg(button) {
        const addedCartMessage = button.closest('.product-container').querySelector('.added-sign');

        // Menampilkan gambar centang dan teks "Added"
        addedCartMessage.innerHTML = `<img class="check-img" src="/img/green-check.png" alt=""> <span>Added</span>`;

        // Menambahkan kelas 'text-green' agar teks berwarna hijau
        addedCartMessage.classList.add('text-green');
        // Batalkan timer sebelumnya jika ada
        clearTimeout(timeoutId);

        // Buat timer baru untuk menghapus teks setelah 2 detik
        timeoutId = setTimeout(() => {
            addedCartMessage.innerHTML = ''; // Menghapus konten dalam .added-sign setelah 2 detik
        }, 2000);
        // Menghilangkan teks dan ikon setelah 2 detik

    }


    document.querySelector('.js-products-grid').
        innerHTML = productsHTML;

    document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartQuantity();
            addedMsg(button);

        });
    });
