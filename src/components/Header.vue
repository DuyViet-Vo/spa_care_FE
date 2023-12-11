<script>
export default {
  name: "Header",
  components: {},

  data() {
    return {};
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
    getUsername() {
      return this.$store.getters.getUsername;
    },
  },
  methods: {
    LogOut() {
      this.$store.dispatch("logout", "");
    },
    isAdmin() {
      // Thay thế bằng logic kiểm tra xem người dùng có quyền admin hay không
      return this.$store.getters.getUserRole == 1;
    },
  },
};
</script>

<template>
  <div class="header">
    <router-link to="/user/trang-chu" class="logo">SpaCare</router-link>
    <div class="header-right">
      <router-link to="/user/trang-chu">Trang Chủ</router-link>
      <router-link to="/user/lich-hen">Đặt lịch</router-link>
      <router-link to="/user/dich-vu">Dịch vụ</router-link>
      <router-link to="/user/san-pham">Sản phẩm</router-link>
      <div class="header-right" v-if="getToken === null">
        <router-link to="/user/login">Đăng nhập</router-link>
        <router-link to="/user/register">Đăng ký</router-link>
      </div>
      <div class="header-right" v-else>
        <div class="dropdown">
          <a class="dropbtn">{{ getUsername }}</a>
          <div class="dropdown-content">
            <router-link to="">Cá nhân</router-link>
            <router-link to="/admin/home" v-if="isAdmin()"
              >Admin</router-link
            >
            <a @click="LogOut">Đăng xuất</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  height: 80px ;
  background-color: rgb(111, 191, 226);
  padding: 20px 10px;
}

.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}

.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

.header a:hover {
  background-color: #ddd;
  color: black;
}

.header a.active {
  background-color: dodgerblue;
  color: white;
}

.header-right {
  float: right;
}

@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }

  .header-right {
    float: none;
  }
}
.dropdown {
  display: inline-block;
}

/* Dropdown button */
.dropbtn {
  color: black;
  padding: 12px;
  font-size: 18px;
  border: none;
  cursor: pointer;
}

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  
    z-index: 3;
    left: -40px;
    top: 53px;

}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
}

/* Change color on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
