<template>
  <div v-if="product">
    <h1>{{ product.phone.name }}</h1>
    <p>{{ product.phone.description }}</p>
    <p>Model: {{ product.phone.model }}</p>
    <p>Manufacturer: {{ product.phone.manufacturer }}</p>
    <p>Price: ${{ product.phone.price.current }} (MSRP: ${{ product.phone.price.msrp }})</p>
    <img :src="`/images/products/${product.images[0]}`" alt="Product Image" class="product-detail-image" />
    <p>Quantity: <input type="number" v-model.number="quantity" min="1" /></p>
    <button @click="addToCart(product)">Add to Cart</button>
  </div>
  <div v-else>
    <p>Product not found.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: null,
      quantity: 1,
      products: []
    };
  },
  mounted() {
    axios.get('/products.json')
      .then(response => {
        this.products = response.data;
        this.loadProduct();
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  },
  methods: {
    loadProduct() {
      const productId = parseInt(this.$route.params.id, 10);
      this.product = this.products.find(p => p.id === productId);
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + this.quantity;
      } else {
        product.quantity = this.quantity;
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
};
</script>

<style scoped>
.product-detail-image {
  width: 200px;
  height: auto;
}
</style>
