import { addToCart, cart } from '../../data/cart.js'

describe('an existing cart to product', () => {
    it('it adds existing product', () => {

    })
    it('adds new product to the cart', () => {
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
    });
})
console.log('work')