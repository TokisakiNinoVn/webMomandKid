<template>
  <div class="main-form-login">
    <form class="login-form" @submit.prevent="login">
      <h1>Đăng nhập</h1>
      <div class="input-group">
        <input placeholder="Tên đăng nhập" v-model="username" id="username" type="text" class="input-field" />
      </div>
      <div class="input-group">
        <input placeholder="Mật khẩu" v-model="password" id="password" type="password" class="input-field" />
      </div>
      <button type="submit" class="submit-button">Đăng nhập</button>
      <router-link to="/register" class="register-link">Bạn chưa có tài khoản? Đăng ký</router-link>
    </form>
  </div>

  <p v-if="error" class="alert-message">{{ error }}</p>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.get('/jsondata/accounts.json');
        const accounts = response.data;

        const user = accounts.find(account => 
          account.username === this.username && account.password === this.password
        );

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push('/').then(() => {
            window.location.reload(); // Reload trang sau khi đăng nhập thành công
          });
        } else {
          this.error = 'Thông tin tài khoản hoặc mật khẩu không đúng!';
            setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
        this.error = 'Error logging in';
      }
    }
  }
};
</script>

<style scoped>
.main-form-login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
  width: 100%;
  max-width: 300px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.submit-button {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #45a049;
}

.register-link {
  display: block;
  margin-top: 15px;
  color: #007BFF;
  text-align: center;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

.alert-message {
  background-color: rgba(225, 230, 225, 0.842);
  font-weight: bold;
  margin-top: 10px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 10px 16px;
  border-radius: 8px;
  border-left: 4px solid rgb(255, 6, 6);
  width: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

input:focus {
  outline: none;
}

form.login-form {
  background-color: #e5e3e3;
  padding: 20px 40px;
  border-radius: 10px;
}
</style>
