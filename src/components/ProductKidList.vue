<template>
  <div class="list-product">
    <div v-for="product in products" :key="product.productId" class="product-item">
      <img v-if="product.image && product.image.length" :src="`/images/products/forKid/${product.image[0]}`" alt="Product Image" class="product-image" />
      <span class="product-name">{{ product.name }}</span>
      <span class="product-price">{{ product.price }}</span>
      <p v-if="product.rawprice && product.rawprice !== product.price" class="product-rawprice">{{ product.rawprice }}</p>
      <button @click="addToCart(product, 'kid')" class="add-to-cart-btn">Thêm vào giỏ hàng</button>
      <router-link :to="`product/kid/${product.productId}`">
        <button class="view-details-btn">Xem chi tiết</button>
      </router-link>
    </div>
  </div>

  <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      successMessage: ''
    };
  },
  mounted() {
    axios.get('jsondata/productKid.json')
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  },
  methods: {
    addToCart(product, category) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const productIdentifier = `${category}-${product.productId}`;
      
      const existingProduct = cart.find(p => p.identifier === productIdentifier);
      
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        product.quantity = 1;
        product.identifier = productIdentifier;
        cart.push(product);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));

      this.successMessage = `Đã thêm ${product.name} vào giỏ hàng`;

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }
};
</script>

<style scoped>
.list-product {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column;
  margin: 8px 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: calc(25% - 20px);
}
.product-item:hover {
  background-color: rgb(255, 236, 236);
}

.product-image {
  width: 100px;
  height: auto;
  margin-bottom: 10px;
}

.product-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.product-price {
  color: #e74c3c;
  margin-bottom: 5px;
}

.product-rawprice {
  text-decoration: line-through;
  color: #888;
  margin-bottom: 10px;
}

.add-to-cart-btn, .view-details-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover, .view-details-btn:hover {
  background-color: #2980b9;
}

.success-message {
  background-color: rgba(225, 230, 225, 0.842);
  font-weight: bold;
  margin-top: 10px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 10px 16px;
  border-radius: 8px;
  border-left: 4px solid green;
  width: 200px;
}
</style>
