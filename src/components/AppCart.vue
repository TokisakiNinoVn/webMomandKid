<template>
  <div class="cart-main">
    <div class="top-cart">
      <span>Giỏ hàng của bạn</span>
    </div>
    <div v-for="item in cart" :key="item.identifier" class="cart-item">
      <div class="cart-item-header">
        <input type="checkbox" v-model="item.selected" class="item-checkbox" />
        <img v-if="item.image && item.image.length" 
             :src="imageSrc(item)" 
             alt="Product Image" 
             class="cart-item-image" />
        <div class="cart-item-details">
          <p class="cart-item-name">{{ item.name }}</p>
          <p class="cart-item-price">đ{{ item.price }}</p>
        </div>
        <div class="cart-item-quantity">
          <input type="number" v-model.number="item.quantity" min="1" @change="updateCart()" class="quantity-input" />
          <span class="cart-item-total">đ{{ item.price * item.quantity }}</span>
        </div>
        <button @click="removeFromCart(item)" class="remove-button">Xóa sản phẩm</button>
      </div>
    </div>

    <!-- Navbar with Total, Checkout, and Delete Selected -->
    <div class="cart-navbar">
      <router-link class="link-to-home" to="/">
        <ion-icon name="return-down-back-outline"></ion-icon>
        <span>Trở lại Trang chủ</span>
      </router-link>
      <label class="select-all">
        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" /> Chọn tất cả
      </label>
      <p class="cart-total">Tổng tiền: đ{{ totalPrice }}</p>
      <p class="selected-items">Số sản phẩm đã chọn: {{ selectedItemsCount }}</p>
      <p class="total-payment">Tổng thanh toán : đ{{ selectedItemsTotalPrice }}</p>
      <button @click="deleteSelected" :disabled="selectedItemsCount === 0" class="delete-selected">Xóa lựa chọn</button>
      <router-link to="/checkout" class="checkout-button-link">
        <button @click="checkoutSelected" :disabled="selectedItemsCount === 0" class="checkout-button">
          <ion-icon name="return-down-forward-outline"></ion-icon>Mua hàng
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      selectAll: false,
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    },
    selectedItemsCount() {
      return this.cart.filter(item => item.selected).reduce((sum, item) => sum + (item.quantity || 0), 0);
    },
    selectedItemsTotalPrice() {
      return this.cart.filter(item => item.selected).reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    },
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.cart.forEach(item => {
      if (!item.quantity) {
        item.quantity = 1;
      }
      // Ensure each item has a selected property
      if (item.selected === undefined) {
        item.selected = false;
      }
    });
  },
  methods: {
    imageSrc(item) {
      const category = item.identifier.split('-')[0];
      return `/images/products/${category === 'mom' ? 'forMom' : 'forKid'}/${item.image[0]}`;
    },
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    removeFromCart(item) {
      this.cart = this.cart.filter(cartItem => cartItem.identifier !== item.identifier);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    toggleSelectAll() {
      this.cart.forEach(item => {
        item.selected = this.selectAll;
      });
    },
    deleteSelected() {
      if (confirm('Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?')) {
        this.cart = this.cart.filter(cartItem => !cartItem.selected);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },
    checkoutSelected() {
      const selectedItems = this.cart.filter(item => item.selected);
      localStorage.setItem('selectedCartItems', JSON.stringify(selectedItems));
    }
  },
};
</script>

<style scoped>
.cart-main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  font-size: 18px;
}

.top-cart {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.cart-item {
  border-bottom: 1px solid #ebebeb;
  padding: 15px 0;
  display: flex;
  align-items: center;
}

.cart-item-header {
  display: flex;
  align-items: center;
  width: 100%;
}

.item-checkbox {
  margin-right: 10px;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-name {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.cart-item-price {
  color: #e74c3c;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.quantity-input {
  width: 50px;
  margin-right: 15px;
}

.cart-item-total {
  font-size: 1rem;
  color: #e74c3c;
  font-weight: bold;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}

.cart-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ebebeb;
  background-color: #fff;
  z-index: 99;
  font-size: 18px;
  padding: 20px 50px;
}

.link-to-home {
  color: #3498db;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.select-all {
  font-weight: bold;
}

.cart-total, .selected-items, .total-payment {
  font-weight: bold;
  color: #e74c3c;
}

.delete-selected {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

.checkout-button-link {
  text-decoration: none;
}

.checkout-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

ion-icon {
  margin-right: 8px;
  font-size: 18px;
}

button {
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

footer {
  display: none !important;
}
</style>
