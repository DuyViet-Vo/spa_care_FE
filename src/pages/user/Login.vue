<template>
  <div class="container">
    <section class="vh-100">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form @submit.prevent="login">
              <!-- ... (các phần đã có) -->

              <!-- Email input -->
              <div class="form-outline mb-4">
                <input
                  v-model="email"
                  type="email"
                  id="form3Example3"
                  class="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                />
                <label class="form-label" for="form3Example3"
                  >Email address</label
                >
              </div>

              <!-- Password input -->
              <div class="form-outline mb-3">
                <input
                  v-model="password"
                  type="password"
                  id="form3Example4"
                  class="form-control form-control-lg"
                  placeholder="Enter password"
                />
                <label class="form-label" for="form3Example4">Password</label>
              </div>
              <!-- Hiển thị thông báo lỗi nếu có -->
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>

              <div class="d-flex justify-content-between align-items-center">
                <!-- Checkbox -->
                <div class="form-check mb-0">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label class="form-check-label" for="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" class="text-body">Forgot password?</a>
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  style="padding-left: 2.5rem; padding-right: 2.5rem"
                >
                  Login
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <router-link to="/user/register" class="link-danger"
                    >Register</router-link
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import API from "@/api";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    // hàm login
    async login() {
      try {
        const token = await this.getToken();

        const user = await this.getUsername(token);
        const username = user.ho_ten
        const user_id = user.id
       
        this.$store.dispatch("saveToken", { token, username, user_id});
        this.$router.push("/user/trang-chu");
      } catch (error) {
        this.handleError(error);
      }
    },
    // Call api get token
    async getToken() {
      const response = await axios.post(
        API.login,
        { email: this.email, password: this.password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.access;
    },
    // call api get username
    async getUsername(token) {
      const response = await axios.get(API.get_user, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return response.data[0];
    },
    // if error show error
    handleError(error) {
      console.error(error);
      this.error = "Email hoặc mật khẩu chưa chính xác! Vui lòng nhập lại!";
    },
  },
};
</script>
<style>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
