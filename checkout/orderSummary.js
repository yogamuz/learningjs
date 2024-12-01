import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { getProduct, products } from '../data/product.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions, getDeliveryOption } from '../data/deliveryoptions.js';
import { orderPaymentSummary } from '../checkout/paymentSummary.js';



export function renderOrderSummary() {
  let cartSummaryHTML = ''

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId)

    const deliveryOptionId = cartItem.deliveryOptionId

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs()
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    );

    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML += `
    <main>
      <div class="page-title"></div>
      <section class="checkout-grid">
        <div class="js-cart-summary cart-summary">
          <div class="cart-item js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              <span class="js-delivery-date">
                Delivery Date: ${dateString}
              </span>
            </div>
            <div class="cart-item-details grid">
              <img class="product-image" src="">
              ${matchingProduct.image}
              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${matchingProduct.getPrice()}
                </div>
                <div class="js-quantity-container quantity-container">
                  <span class="js-quantity-label quantity-label" data-testid="quantity-label">
                    ${cartItem.quantity}
                  </span>
                  <input class="js-quantity-input new-quantity-input" 
                         type="number" 
                         value="1" 
                         data-testid="${matchingProduct.quantity}">
                  Quantity:
                  <span class="js-update-quantity-link update-quantity-link link-primary" 
                        data-testid="update-quantity-link">
                    Update
                  </span>
                  <span class="js-save-quantity-link save-quantity-link link-primary" 
                        data-testid="save-quantity-link">
                    Save
                  </span>
                  <span class="js-delete-link delete-quantity-link link-primary" 
                        data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)} 
            </div>
          </div>
        </div>
        <div class="js-payment-summary payment-summary">
          <div class="js-payment-info"></div>
          <div class="paypal-toggle"></div>
          <div class="js-payment-buttons-container false" 
               data-testid="payment-buttons-container">
          </div>
        </div>
      </section>
    </main>
    `
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ''
    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs()
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${(deliveryOption.priceCents / 100).toFixed(2)} +`

      // Use a unique name attribute for each product's delivery options

      html += `
      <div class="delivery-options js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <div class="delivery-option" data-testid="delivery-option">
          <input class="js-delivery-option-input delivery-option-input"
            name="delivery-option-${matchingProduct.id}" type="radio" ${isChecked ? 'checked' : ''}
            data-product-id="${matchingProduct.id}">
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>
    `
    })
    return html;
  }

  document.querySelector('.js-order-summary').
    innerHTML = cartSummaryHTML

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId
        removeFromCart(productId)
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove()
        orderPaymentSummary()
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId)
        renderOrderSummary()
        orderPaymentSummary()
      })
    });
}
renderOrderSummary();