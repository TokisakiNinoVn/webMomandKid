<template>
  <div>
    <div v-for="product in products" :key="product.id" class="product-item">
      <img :src="`/images/products/${product.images[0]}`" alt="Product Image" class="product-image" />
      <p>{{ product.phone.name }}</p>
      <p>Price: ${{ product.phone.price.current }}</p>
      <p>Sale: ${{ product.phone.price.msrp }}</p>
      <button @click="addToCart(product)">Add to Cart</button>
      <router-link :to="`/product/${product.id}`">
        <button>View Details</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: []
    };
  },
  mounted() {
    axios.get('/products.json')
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  },
  methods: {
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
};
</script>

<style scoped>
.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.product-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
}
</style>
