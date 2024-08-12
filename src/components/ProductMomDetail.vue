<template>
  <div class="main-detail" v-if="product">
    <div class="card-detail">
      <div class="detail-left">
        <img v-if="product.image && product.image.length" :src="`/images/products/forMom/${product.image[0]}`" alt="Hình ảnh sản phẩm" class="product-detail-image" />
      </div>
  
      <div class="detail-right">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <p v-if="product.type" class="product-type">Loại: {{ product.type }}</p>
        <p v-if="product.brand" class="product-brand">Thương hiệu: {{ product.brand }}</p>
        <p v-if="product.volume" class="product-volume">Dung tích: {{ product.volume }}</p>
        <p v-if="product.dimensions" class="product-dimensions">Kích thước: {{ product.dimensions.length }} x {{ product.dimensions.width }} x {{ product.dimensions.height }} cm</p>
        <p v-if="product.weight_capacity" class="product-weight">Sức chứa: {{ product.weight_capacity }} kg</p>
        <p class="product-price">Giá: {{ product.price }}₫ <span v-if="product.rawprice" class="product-rawprice">(Giá gốc: {{ product.rawprice }}₫)</span></p>
        <p class="product-quantity">Số lượng: <input type="number" v-model.number="quantity" min="1" class="quantity-input" /></p>
        <button @click="addToCart(product, 'mom')" class="add-to-cart-button">Thêm vào giỏ hàng</button>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Không tìm thấy sản phẩm.</p>
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
    axios.get('/jsondata/productMom.json')
      .then(response => {
        this.products = response.data;
        this.loadProduct();
      })
      .catch(error => {
        console.error('Có lỗi khi tải sản phẩm!', error);
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
  min-height: 80vh;
  margin-top: 90px;
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-bottom: 50px;
}

.card-detail {
  display: flex;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
}

.detail-left {
  flex: 1;
  padding: 20px;
}

.product-detail-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
}

.detail-right {
  flex: 2;
  padding: 20px;
}

.product-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-description {
  font-size: 16px;
  margin-bottom: 10px;
}

.product-type,
.product-brand,
.product-volume,
.product-dimensions,
.product-weight {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 10px;
}

.product-rawprice {
  font-size: 14px;
  text-decoration: line-through;
  color: #888;
}

.product-quantity {
  margin-bottom: 20px;
}

.quantity-input {
  width: 60px;
  padding: 5px;
  margin-left: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.add-to-cart-button {
  background-color: #ff5a5f;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
}

.add-to-cart-button:hover {
  background-color: #e14a4f;
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
