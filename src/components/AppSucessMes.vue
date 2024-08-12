<template>
  <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
</template>

<script>
export default {
  name: 'AppSucessMes',
  data() {
    return {
      query: '',
      isLoggedIn: false,
      avatarUrl: '',
      username: ''
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        this.avatarUrl = `/images/accounts/${user.avatar || 'default-avatar.png'}`;
        this.username = user.username
        console.log(">> ", user.username)
      }
    },
    search() {
      if (this.query.trim()) {
        this.$router.push({ path: '/search', query: { q: this.query } });
      }
    },
    goToProfile() {
      this.$router.push('/profile');
    }
  }
};
</script>

<style scoped>
header {
  background-color: rgb(235, 232, 232);
  width: 100vw;
  color: rgb(232, 63, 238);
  padding: 10px 20px;
  position: fixed;
  top: 0;
  font-size: 18px;
  left: 0;

  z-index: 10;
}

nav {
  margin: auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-left {
  width: 20%;
}

.logo {
  height: 60px;
}
nav a {
  color: rgb(232, 63, 238);
  text-decoration: none;
}

nav a:hover {
  color: rgb(255, 4, 129);
}

.nav-mid {
  width: 50%;
}

input {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  display: flex;
  align-items: center;

}

input:focus {
  outline: none;
}

.link-cart {
  margin-right: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
}
.link-cart ion-icon {
  margin-right: 5px;
}

.nav-right {
  display: flex;
  height: 100%;
  align-items: center;
  width: 26%;
}

.account-view {
  display: flex;
  align-items: center;
}
.account-view span:hover {
  color: rgb(255, 4, 129);
  cursor: pointer;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
}
.avatar:hover {
  border: 2px double rgb(255, 4, 129);
}

.login-register a {
  margin: 0;
}
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
  }

  nav a {
    margin-right: 0;
    margin-bottom: 10px;
  }

  input {
    max-width: 100%;
    margin-bottom: 10px;
  }
}
</style>
