<template>
  <div style="margin-top: 100px;">
    <section
      class="vh-100"
      style="background-color: #eee; margin-bottom: 100px"
    >
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style="border-radius: 25px">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      ĐĂNG KÝ
                    </p>

                    <form class="mx-1 mx-md-4">
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            v-model="name"
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example1c"
                            >Tên của bạn</label
                          >
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-mobile-alt fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            v-model="sdt"
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example1c"
                            >Số điện thoại</label
                          >
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            v-model="email"
                            type="email"
                            id="form3Example3c"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example3c"
                            >Email của bạn</label
                          >
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            v-model="password"
                            type="password"
                            id="form3Example4c"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example4c"
                            >Mật khẩu</label
                          >
                        </div>
                      </div>
                      <div
                        class="form-check d-flex justify-content-center mb-5"
                      >
                        <input
                          class="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                        />
                        <label class="form-check-label" for="form2Example3">
                          Tôi đồng ý với điều khoản của Dịch vụ
                        </label>
                      </div>

                      <div
                        class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                      >
                        <button
                          type="button"
                          class="btn btn-primary btn-lg"
                          @click="registerUser"
                        >
                          Đăng ký
                        </button>
                      </div>
                    </form>
                  </div>
                  <div
                    class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      class="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import API from "@/api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

const SUCCESS_MESSAGE = "Đăng ký tài khoản thành công!";
const ERROR_MESSAGE = "Tài khoản đã tồn tại, vui lòng nhập lại!";

export default {
  data() {
    return {
      message: "",
      name: "",
      email: "",
      password: "",
      sdt: "",
      isSuccess: false,
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post(
          API.register,
          {
            password: this.password,
            email: this.email,
            quyen: 5,
            ho_ten: this.name,
            sdt: this.sdt,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        // Use SweetAlert to display success message
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!",
          text: SUCCESS_MESSAGE,
        });
      } catch (error) {
        console.error("API Error:", error);
        Swal.fire({
          icon: "error",
          title: "Đăng ký thất bại",
          text: ERROR_MESSAGE,
        });
      }
    },
  },
};
</script>
<style></style>
