export let cart = JSON.parse(localStorage.getItem('cart'))

if (!cart) {
    cart = [{
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
};




function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}


export function addToCart(productId) {
    let matchingItem;
    // mengecek product sama dengan yang ditambahkan
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    // jika produk ditambahkan maka quantity +1
    if (matchingItem) {
        matchingItem.quantity += 1;

        // jika produk belum ada yang ditambahkan ini akan dijalankan
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        })
    }
    saveToStorage()
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        }
    })


    cart = newCart;
    saveToStorage()
}

export function updateDeliveryOption(productId, deliveryOptionsId) {
    let matchingItem;
    // mengecek product sama dengan yang ditambahkan
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionsId;
    saveToStorage();

}
