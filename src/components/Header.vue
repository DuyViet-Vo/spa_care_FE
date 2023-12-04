<script>

export default {
    name: "Header",
    components: {

    },

    data() {
      return {};
    },

    methods:{
      Login() {
        console.log("chuyển đến trang đăng nhập!")
      },

      Register() {
        console.log("chuyển đến trang đăng ký!")
      },
    },
};
</script>

<template>
  <div class="header">
    <a href="#default" class="logo">SpaCare</a>
    <div class="header-right">
      <a href="#home">Trang Chủ</a>
      <router-link to="/user/lich-hen">Đặt lịch</router-link>
      <a href="#contact">Dịch vụ</a>
      <a href="#about">Sản phẩm</a>
      <div class="header-right">
        <router-link to="/user/login">Đăng nhập</router-link>
        <router-link to="/user/register">Đăng ký</router-link>
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
  overflow: hidden;
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
</style>
