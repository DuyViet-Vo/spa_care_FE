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
      return this.$store.getters.getUserRole == 1;
    },
    isLeTan() {
      return this.$store.getters.getUserRole == 3;
    },
    isNhanVien() {
      return this.$store.getters.getUserRole == 2;
    },
    isKhachHang() {
      return this.$store.getters.getUserRole == 5;
    },
  },
};
</script>

<template>
  <div class="header">
    <!-- Topbar Start -->
    <div class="container-fluid bg-light d-none d-lg-block">
      <div
        class="row py-2 px-lg-5"
        style="background-color: rgba(255, 182, 193, 0.2)"
      >
        <div class="col-lg-6 text-left mb-2 mb-lg-0">
          <div class="d-inline-flex align-items-center">
            <small><i class="fa fa-phone-alt mr-2"></i>+012 345 6789</small>
            <small class="px-3">|</small>
            <small><i class="fa fa-envelope mr-2"></i>info@example.com</small>
          </div>
        </div>
        <div class="col-lg-6 text-right">
          <div class="d-inline-flex align-items-center" style="float: right">
            <a class="text-primary px-2" href="">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a class="text-primary px-2" href="">
              <i class="fab fa-twitter"></i>
            </a>
            <a class="text-primary px-2" href="">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a class="text-primary px-2" href="">
              <i class="fab fa-instagram"></i>
            </a>
            <a class="text-primary pl-2" href="">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Topbar End -->

    <!-- Navbar Start -->
    <div class="container-fluid p-0">
      <nav
        class="navbar navbar-expand-lg bg-white navbar-light py-4 py-lg-0 px-lg-5"
      >
        <router-link to="/user/trang-chu" class="navbar-brand ml-lg-3">
          <h1 class="m-0 text-primary">
            <span class="text-dark">SPA</span> Care
          </h1>
        </router-link>
        <button
          type="button"
          class="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-between px-lg-3 py-4"
          id="navbarCollapse"
        >
          <div class="navbar-nav m-auto py-0">
            <router-link to="/user/trang-chu" class="nav-item nav-link px-3"
              >Trang Chủ</router-link
            >
            <router-link to="/user/dich-vu" class="nav-item nav-link px-3"
              >Dịch Vụ</router-link
            >
            <router-link to="" class="nav-item nav-link px-2"
              >Giới Thiệu</router-link
            >
            <div
              v-if="getToken === null"
              style="display: flex; margin-left: 30px"
            >
              <router-link to="/user/login" class="nav-item nav-link px-2"
                >Đăng Nhập</router-link
              >
              <router-link to="/user/register" class="nav-item nav-link px-2"
                >Đăng Ký</router-link
              >
            </div>

            <div class="nav-item dropdown px-3" v-else>
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                >{{ getUsername }}</a
              >
              <div class="dropdown-menu rounded-0 m-0">
                <router-link
                  to="/admin/home"
                  class="dropdown-item"
                  v-if="isAdmin()"
                  >Admin</router-link
                >
                <router-link
                  to="/le-tan/khach-hang"
                  class="dropdown-item"
                  v-if="isLeTan()"
                  >Lễ Tân</router-link
                >
                <router-link
                  to="/nhan-vien/cong-viec"
                  class="dropdown-item"
                  v-if="isNhanVien()"
                  >Nhân viên</router-link
                >
                <router-link
                  to="/user/chi_tiet_lich_hen"
                  v-if="isKhachHang()"
                  class="dropdown-item"
                  >Lịch Hẹn</router-link
                >
                <a href="#" class="dropdown-item">Cá nhân</a>
                <a @click="LogOut" class="dropdown-item">Đăng Xuất</a>
              </div>
            </div>
          </div>
          <router-link
            to="/user/lich-hen"
            class="btn btn-primary d-none d-lg-block"
            style="
              display: inline-block;
              font-size: x-large;
              color: #f2f2f2;
              background-color: #f9a392;
              border-color: #f9a392;
              padding: 0.375rem 0.75rem;
              font-weight: bold;
            "
            >Đặt Lịch</router-link
          >
        </div>
      </nav>
    </div>
    <!-- Navbar End -->
  </div>
</template>

<style>
.header {
  font-family: "Arial", sans-serif;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.container-fluid {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
/* CSS for Dropdown */
.navbar-nav .dropdown:hover .dropdown-menu {
  display: block;
}

.navbar-nav .dropdown:hover .nav-link {
  color: #007bff; /* Change the color on hover if needed */
}

/* Optional: Add transition effect for smoother dropdown animation */
.dropdown-menu {
  transition: all 0.3s;
  display: none;
}

/* Optional: Style for dropdown items */
.dropdown-menu a {
  color: #333;
  padding: 10px 15px;
  display: block;
  text-decoration: none;
  transition: background-color 0.3s;
}

.dropdown-menu a:hover {
  background-color: #f8f9fa; /* Change the background color on hover if needed */
}
.btn:hover {
  color: #ffffff;
  background-color: #f7846e;
}
.nav-item {
  font-size: x-large;
  text-align: center;
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
  font-weight: bold;
}
.nav-item:hover {
  color: #f7846e;
}
</style>
