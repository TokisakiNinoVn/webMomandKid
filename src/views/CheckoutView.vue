<template>
  <div class="checkout-main">
    <div class="checkout-card">
      <h1 class="checkout-title">Thanh toán</h1>
      <form @submit.prevent="placeOrder" class="checkout-form">
        <div class="form-group">
          <label for="name" class="form-label">Người nhận</label>
          <input type="text" v-model="recipient.name" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="phone" class="form-label">Số điện thoại</label>
          <input type="text" v-model="recipient.phone" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="address" class="form-label">Địa chỉ</label>
          <input type="text" v-model="recipient.address" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="payment-method" class="form-label">Phương thức thanh toán</label>
          <select v-model="paymentMethod" @change="togglePaymentMethod" required class="form-select">
            <option value="cash-on-delivery">Thanh toán khi nhận hàng</option>
            <option value="bank-transfer">Thanh toán qua ngân hàng</option>
          </select>
        </div>

        <!-- Bank details section -->
        <div v-if="paymentMethod === 'bank-transfer'" class="bank-details">
          <div class="form-group">
            <label for="bankId" class="form-label">Số tài khoản</label>
            <input type="text" v-model="bankDetails.bankId" id="bankId" class="form-input" />
          </div>
          <div class="form-group">
            <label for="bankName" class="form-label">Tên ngân hàng</label>
            <input type="text" v-model="bankDetails.bankName" id="bankName" class="form-input" />
          </div>
          <div class="form-group">
            <label for="bankccv" class="form-label">CCV</label>
            <input type="text" v-model="bankDetails.bankccv" id="bankccv" class="form-input" />
          </div>
        </div>

        <button type="submit" class="submit-button">Đặt hàng</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipient: {
        name: '',
        phone: '',
        address: ''
      },
      paymentMethod: 'cash-on-delivery',
      bankDetails: {
        bankId: '',
        bankName: '',
        bankccv: ''
      }
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      this.$router.push('/login?redirect=/checkout');
    } else {
      this.recipient.name = user.fullname || '';
      this.recipient.phone = user.phone || '';
      this.recipient.address = user.address || '';
      this.bankDetails.bankId = user.bankId || '';
      this.bankDetails.bankName = user.bankName || '';
      this.bankDetails.bankccv = user.bankccv || '';
    }
  },
  methods: {
    togglePaymentMethod() {
      if (this.paymentMethod !== 'bank-transfer') {
        this.bankDetails = {
          bankId: '',
          bankName: '',
          bankccv: ''
        };
      }
    },
    placeOrder() {
      if (this.paymentMethod === 'bank-transfer') {
        if (!this.bankDetails.bankId || !this.bankDetails.bankName || !this.bankDetails.bankccv) {
          alert('Please fill in all bank details.');
          return;
        }
      }

      alert('Đặt hàng thành công!');
      localStorage.removeItem('cart');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.checkout-main {
  min-height: 100vh;
  margin-top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}

.checkout-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.checkout-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.checkout-form .form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-input,
.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.form-select {
  appearance: none;
}

.bank-details {
  margin-top: 20px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
}

.submit-button:hover {
  background-color: #219150;
}
</style>
