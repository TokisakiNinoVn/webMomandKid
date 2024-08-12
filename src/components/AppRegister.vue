<template>
  <div class="main-form-register">
    <h1>Đăng ký tài khoản</h1>
    <form @submit.prevent="register">
      <div class="input-group">
        <!-- <label for="username">Username:</label> -->
        <input v-model="username" id="username" type="text" class="input-field" placeholder="Enter your username" />
      </div>
      <div class="input-group">
        <!-- <label for="password">Password:</label> -->
        <input v-model="password" id="password" type="password" class="input-field" placeholder="Enter your password" />
      </div>
      <button type="submit" class="submit-button">Đăng ký</button>
      <router-link to="/login" class="login-link">Bạn đã có tài khoản? Đăng nhập</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    register() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = { username: this.username, password: this.password };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.main-form-register {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eef2f3;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

form {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 20px;
  width: 100%;
}

/* label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
} */

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #66afe9;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #218838;
}

.login-link {
  display: block;
  margin-top: 15px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
