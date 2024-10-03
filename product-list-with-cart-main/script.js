document.addEventListener('DOMContentLoaded', () => {
  let cart = {};
  const cartQuantityElement = document.querySelector('.quantity');
  const cartItemsContainer = document.querySelector('.cart-items');
  const emptyCartContent = document.querySelector('.empty-content');
  const cartTotalElement = document.querySelector('.cart-total');
  const confirmOrderButton = document.querySelector('.confirm-order');
  const overlay = document.querySelector('.overlay');
  const orderSummaryContainer = document.querySelector('.order-summary');
  const startNewOrderButton = document.querySelector('.start-new-order');
  const cartSummary = document.querySelector('.cart-summary');

  let productData = [];

  fetch('data.json')
      .then(response => response.json())
      .then(data => {
          productData = data;
          initializeCart();
      });

  const initializeCart = () => {
      document.querySelectorAll('.products-card').forEach(card => {
          const productName = card.querySelector('.product-name').textContent;
          const productPrice = parseFloat(card.querySelector('.price').textContent.replace('$', ''));
          const addToCartButton = card.querySelector('.addToCart');
          const counterElement = card.querySelector('.counter');
          const productImage = card.querySelector('.image-product');

          addToCartButton.addEventListener('click', () => {
              addToCartButton.classList.add('hidden');
              counterElement.classList.remove('hidden');
              productImage.classList.add('active');
              if (!cart[productName]) {
                  cart[productName] = { price: productPrice, quantity: 1 };
              } else {
                  cart[productName].quantity += 1;
              }
              counterElement.querySelector('span').textContent = cart[productName].quantity;
              updateCartDisplay();
          });

          card.querySelector('.icon-increment').addEventListener('click', () => {
              if (!cart[productName]) {
                  cart[productName] = { price: productPrice, quantity: 1 };
              } else {
                  cart[productName].quantity += 1;
              }
              counterElement.querySelector('span').textContent = cart[productName].quantity;
              updateCartDisplay();
          });

          card.querySelector('.icon-decrement').addEventListener('click', () => {
              if (cart[productName] && cart[productName].quantity > 0) {
                  cart[productName].quantity -= 1;
                  if (cart[productName].quantity === 0) {
                      delete cart[productName];
                      addToCartButton.classList.remove('hidden');
                      counterElement.classList.add('hidden');
                      productImage.classList.remove('active');
                  }
                  counterElement.querySelector('span').textContent = cart[productName] ? cart[productName].quantity : 0;
                  updateCartDisplay();
              }
          });
      });
  }; 