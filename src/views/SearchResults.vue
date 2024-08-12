<template>
  <div class="search-result">
    <div class="main-search-result">
      <div v-if="results.length">
        <div v-for="product in results" :key="product.productId" class="product-item">
          <img :src="getProductImagePath(product)" alt="Product Image" class="product-image" />
          <div class="product-details">
            <p class="product-name">{{ product.name }}</p>
            <p class="product-price">{{ product.price }}₫</p>
            <div v-if="product.type === 1" class="product-actions">
              <button @click="addToCart(product, 'kid')" class="action-button">Thêm vào giỏ hàng</button>
              <router-link :to="`/product/kid/${product.productId}`">
                <button class="action-button">Xem chi tiết</button>
              </router-link>
            </div>
            <div v-else-if="product.type === 2" class="product-actions">
              <button @click="addToCart(product, 'mom')" class="action-button">Thêm vào giỏ hàng</button>
              <router-link :to="`/product/mom/${product.productId}`">
                <button class="action-button">Xem chi tiết</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-results">
        <p>Không tìm thấy sản phẩm nào có từ khóa.</p>
      </div>
    </div>
  </div>

  <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      results: [],
      query: this.$route.query.q || '',
      successMessage: ''
    };
  },
  mounted() {
    if (this.query.trim()) {
      Promise.all([
        axios.get('/jsondata/productKid.json'),
        axios.get('/jsondata/productMom.json')
      ])
      .then(responses => {
        const [kidsData, momsData] = responses.map(response => response.data);
        this.results = [...kidsData, ...momsData].filter(product =>
          product.name.toLowerCase().includes(this.query.toLowerCase())
        );
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
    }
  },
  methods: {
    getProductImagePath(product) {
      const basePath = product.type === 1 ? '/images/products/forKid/' : '/images/products/forMom/';
      return `${basePath}${product.image[0]}`;
    },
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
      this.successMessage = `Đã thêm "${product.name}" vào giỏ hàng`;
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
};
</script>

<style scoped>
.main-search-result {
  min-height: 100vh;
  margin-top: 90px;
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  width: 100vw;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 700px;
}

.product-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.product-details {
  flex: 1;
}

.product-name {
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

.product-price {
  font-size: 1rem;
  margin-bottom: 15px;
  color: #27ae60;
}

.product-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  padding: 10px 15px;
  background-color: #2980b9;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #216f99;
}

.no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  padding: 50px;
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
  width: 250px;
  text-align: center;
}
</style>
