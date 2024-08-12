<template>
  <div class="profile-container">
    <div class="main-card-profile">
      <div class="top-form">
      <h2>Hồ Sơ Của Tôi</h2>
      <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
    </div>
    <form class="main-form" @submit.prevent="updateProfile">
      <div class="main-forms">
        <div class="form-left">
        <table>
          <tr>
            <td class="column-1"><label for="username">Tên đăng nhập</label></td>
            <td class="column-2"><input v-model="user.username" id="username" type="text" /></td>
          </tr>
          <tr>
            <td class="column-1"><label for="phone">Số điện thoại</label></td>
            <td class="column-2"><input v-model="user.phone" id="phone" type="text" /></td>
          </tr>
          <tr>
            <td class="column-1"><label for="address">Địa chỉ</label></td>
            <td class="column-2"><input v-model="user.address" id="address" type="text" /></td>
          </tr>
          <tr>
            <td class="column-1"><label for="email">Email</label></td>
            <td class="column-2"><input v-model="user.email" id="email" type="email" /></td>
          </tr>
          <tr>
            <td class="column-1"><label for="gender">Giới tính</label></td>
            <td class="column-2">
              <select v-model="user.gender" id="gender">
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="column-1"><label for="bankId">Bank ID</label></td>
            <td class="column-2"><input v-model="user.bankId" id="bankId" type="password" /></td>
          </tr>
          <tr>
            <td class="column-1"><label for="bankName">Bank Name</label></td>
            <td class="column-2"><input v-model="user.bankName" id="bankName" type="text" /></td>
          </tr>
          <tr>
            <td class="column-1"><label for="bankccv">Bank CCV</label></td>
            <td class="column-2"><input v-model="user.bankccv" id="bankccv" type="password" /></td>
          </tr>
          <tr>
            <td class="column-1"></td>
            <td class="column-2"></td>
          </tr>
        </table>
      </div>
      <div class="form-right">
        <div class="majh">
          <img :src="avatarUrl" alt="User Avatar" class="avatar" />
          <input type="file" @change="handleAvatarUpload" />
        </div>
      </div>
      </div>
      
      <div>
          <label for="bio">Bio</label>
          <textarea v-model="user.bio" id="bio"></textarea>
        </div>  
      <button type="submit">Lưu</button>
    </form>
    <div class="tool-account">
      <button class="btn-tool-account" @click="logout">Đăng xuất</button>
      <button class="btn-tool-account" @click="deleteAccount">Xóa tài khoản</button>
    </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        phone: '',
        address: '',
        email: '',
        gender: 'male',
        bio: '',
        avatar: '',
        bankId: '',
        bankName: '',
        bankccv: ''
      }
    };
  },
  mounted() {
    this.loadUserProfile();
    this.checkLoginStatus();
  },
  methods: {
    loadUserProfile() {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      this.user = { ...this.user, ...user };
    },
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.user.avatar = file.name; // Save file name or perform further processing
        };
        reader.readAsDataURL(file);
      }
    },
    updateProfile() {
      // Save user information to localStorage
      localStorage.setItem('user', JSON.stringify(this.user));
      alert('Profile updated successfully!');
    },
    logout() {
      localStorage.removeItem('user');
      window.location.reload(); // Reload page to update login status
    },
    deleteAccount() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        localStorage.removeItem('user');
        setTimeout(() => {
          this.$router.push('/');
        }, 1000);
      }
    },
    checkLoginStatus() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        this.avatarUrl = `/images/accounts/${user.avatar || 'default-avatar.png'}`;
      }
    },
    handleAvatarError() {
      this.avatarUrl = '/images/accounts/default-avatar.png';
    }
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.main-card-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.main-forms {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

h2 {
  /* text-align: center; */
  color: #333;
}

p {
  /* text-align: center; */
  color: #777;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}


label {
  /* font-weight: bold; */
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#username {
  fill-rule: true;
}
.top-form {
  margin-bottom: 20px;
}
.column-1 {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  align-items: center;
}
.avatar {
  display: block;
  margin: 10px auto;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button + button {
  margin-left: 10px;
  background-color: #dc3545;
}

button + button:hover {
  background-color: #c82333;
}

.form-right .majh {
  display: flex;
  flex-direction: column;
  
}
.form-right input {
  width: max-content;
  padding: 3px 20px;
}

.btn-tool-account {
  margin-top: 10px;
}

</style>
