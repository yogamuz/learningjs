class Cart {
    constructor() {
        this.cartItems = []; // Properti default diinisialisasi sebagai array kosong
        this.localStorageKey = ''; // Properti kunci penyimpanan
    }

    loadFromStorage() {
        // Ambil data dari localStorage menggunakan `this.localStorageKey`
        const storedData = localStorage.getItem(this.localStorageKey);
        if (storedData) {
            this.cartItems = JSON.parse(storedData);
        } else {
            // Inisialisasi default jika tidak ada data di localStorage
            this.cartItems = [
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', // Socks
                    quantity: 0,
                    deliveryOptionId: '1',
                },
                {
                    productId: 'f2b3a9de-7ba1-4a72-a18f-d3c19fe482b7', // Hoodie
                    quantity: 0,
                    deliveryOptionId: '2',
                },
                {
                    productId: 'd53729fa-9b34-41a7-9e7d-b2a18fb362cd', // Luxury towel
                    quantity: 0,
                    deliveryOptionId: '3',
                },
            ];
            this.saveToStorage();
        }
    }

    saveToStorage() {
        // Simpan data ke localStorage menggunakan `this.localStorageKey`
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);

        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1',
            });
        }
        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
        if (matchingItem) {
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    }
}

// Contoh Penggunaan
const cart = new Cart();
const businessCart = new Cart();

cart.localStorageKey = 'cart-oop';
businessCart.localStorageKey = 'business-oop';

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
