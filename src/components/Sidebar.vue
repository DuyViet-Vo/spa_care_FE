<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3>SpaCare</h3>
      </div>

      <ul class="list-unstyled components">
        <li>
          <router-link to="/admin/home">Trang Chủ</router-link>
        </li>
        <li>
          <router-link to="/admin/lich-hen">Lịch Hẹn</router-link>
        </li>
        <li>
          <a href="#">Dịch Vụ</a>
        </li>
        <li>
          <a href="#">Sản Phẩm</a>
        </li>
        <li>
          <a href="#">Nhân Viên</a>
        </li>
      </ul>
    </nav>

    <!-- Page Content -->
    <div id="content">
      <h2>{{ currentRoute }}</h2>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  }
};
</script>
<style>
body {
  font-family: "Roboto", sans-serif;
}

#sidebar {
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #343a40;
  padding-top: 20px;
}

#sidebar ul.components {
  padding: 0;
}

#sidebar ul li {
  list-style: none;
  font-size: 16px;
  margin-bottom: 12px;
}

#sidebar ul li a {
  text-decoration: none;
  color: white;
  padding: 10px 15px;
  display: block;
  border-bottom: 1px solid #4f5b66;
  transition: background 0.3s;
}

#sidebar ul li a:hover {
  background-color: #4f5b66;
}

#content {
  margin-left: 250px;
  padding: 20px;
}
</style>
