<template>
    <div class="cart-container">
      <Cart />
    </div>
  </template>
  
  <script>
  import Cart from '../components/AppCart.vue';
  
  export default {
    name: 'CartView',
    components: {
      Cart
    }
  };
  </script>
  
  <style scoped>
    .cart-container {
      margin-top: 100px;
      min-height: 100vh;
    }
  </style>
  