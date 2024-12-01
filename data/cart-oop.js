function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey))

            if (this.cartItems) {
                this.cartItems = [{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', // Socks
                    quantity: 0,
                    deliveryOptionId: '1'
                }, {
                    productId: 'f2b3a9de-7ba1-4a72-a18f-d3c19fe482b7', // hoodie
                    quantity: 0,
                    deliveryOptionId: '2'

                }, {
                    productId: 'd53729fa-9b34-41a7-9e7d-b2a18fb362cd', // luxury towel
                    quantity: 0,
                    deliveryOptionId: '3'
                }];
                this.saveToStorage()
            };
        },
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
        },
        addToCart(productId) {
            let matchingItem;
            // mengecek product sama dengan yang ditambahkan
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            // jika produk ditambahkan maka quantity +1
            if (matchingItem) {
                matchingItem.quantity += 1;

                // jika produk belum ada yang ditambahkan ini akan dijalankan
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                })
            }
            this.saveToStorage()
        },

        removeFromCart(productId) {``
            const newCart = [];

            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem)
                }
            })


            this.cartItems = newCart;
            this.saveToStorage()
        },
        updateDeliveryOption(productId, deliveryOptionsId) {
            let matchingItem;
            // mengecek product sama dengan yang ditambahkan
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });
            matchingItem.deliveryOptionId = deliveryOptionsId;
            this.saveToStorage();

        }
    }
    return cart;
}

const cart = Cart('cart-oop')
const businessCart = Cart('cart-business')

cart.loadFromStorage()
businessCart.loadFromStorage()

console.log(cart)
console.log(businessCart)
