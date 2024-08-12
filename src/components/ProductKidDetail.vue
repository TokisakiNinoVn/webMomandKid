<template>
  <div class="main-detail" v-if="product">
    <div class="main-card-detal">
      <div class="detail-header">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-price">
          Giá: đ{{ product.price }}
          <span v-if="product.rawprice" class="product-rawprice">({{ product.rawprice }}đ)</span>
        </p>
      </div>
      <div class="detail-body">
        <img
          v-if="product.image && product.image.length"
          :src="`/images/products/forKid/${product.image[0]}`"
          alt="Product Image"
          class="product-detail-image"
        />
        <div class="product-info-container">
          <p class="product-description">{{ product.description }}</p>
          <p v-if="product.brand" class="product-info">Thương hiệu: {{ product.brand }}</p>
          <p v-if="product.volume" class="product-info">Khối lượng: {{ product.volume }}</p>
          <p v-if="product.dimensions" class="product-info">
            Thông tin chi tiết: {{ product.dimensions.length }} x {{ product.dimensions.width }} x {{ product.dimensions.height }} cm
          </p>
          <p v-if="product.weight_capacity" class="product-info">Khối lượng: {{ product.weight_capacity }} kg</p>
          <div class="quantity-container">
            <label for="quantity">Số lượng:</label>
            <input type="number" v-model.number="quantity" min="1" id="quantity" class="quantity-input" />
          </div>
          <button @click="addToCart(product, 'kid')" class="add-to-cart-button">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>      
    </div>
  <div v-else class="product-not-found">
    <p>Sản phẩm không tồn tại.</p>
  </div>
  <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: null,
      quantity: 1,
      products: [],
      successMessage: ''
    };
  },
  mounted() {
    axios
      .get('/jsondata/productKid.json')
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
      this.product = this.products.find(p => p.productId === productId);
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


.main-detail {
  margin-top: 90px;
  min-height: 90vh;
  padding: 20px;
}
.main-card-detal {
  margin-top: 90px;
  min-height: 20vh;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.product-name {
  font-size: 2rem;
  color: #333;
}

.product-price {
  font-size: 1.5rem;
  color: #e67e22;
}

.product-rawprice {
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
  margin-left: 10px;
}

.detail-body {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.product-detail-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-info-container {
  flex: 1;
  margin-left: 20px;
}

.product-description {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #555;
}

.product-info {
  margin-bottom: 10px;
  font-size: 1rem;
  color: #666;
}

.quantity-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.quantity-container label {
  margin-right: 10px;
  font-size: 1rem;
  color: #333;
}

.quantity-input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-to-cart-button {
  padding: 12px 20px;
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover {
  background-color: #219150;
}

.product-not-found {
  text-align: center;
  font-size: 1.5rem;
  color: #e74c3c;
  margin-top: 50px;
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
