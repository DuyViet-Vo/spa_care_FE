<script></script>

<template>
  <div>
    <!-- Footer Start -->
    <div
      class="footer container-fluid position-relative bg-dark py-5"
      style="margin-top: 90px"
    >
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-6 pr-lg-5 mb-5">
            <a href="index.html" class="navbar-brand">
              <h1 class="mb-3 text-white">
                <span class="text-primary">SPA</span> Care
              </h1>
            </a>
            <p>
              Aliquyam sed elitr elitr erat sed diam ipsum eirmod eos lorem
              nonumy. Tempor sea ipsum diam sed clita dolore eos dolores magna
              erat dolore sed stet justo et dolor.
            </p>
            <p>
              <i class="fa fa-map-marker-alt mr-2"></i>123 Hùng Vương, Tam Kỳ, Quảng Nam
            </p>
            <p><i class="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
            <p><i class="fa fa-envelope mr-2"></i>info@example.com</p>
            <div class="d-flex justify-content-start mt-4">
              <a class="btn btn-lg btn-primary btn-lg-square mr-2" href="#"
                ><i class="fab fa-twitter"></i
              ></a>
              <a class="btn btn-lg btn-primary btn-lg-square mr-2" href="#"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a class="btn btn-lg btn-primary btn-lg-square mr-2" href="#"
                ><i class="fab fa-linkedin-in"></i
              ></a>
              <a class="btn btn-lg btn-primary btn-lg-square" href="#"
                ><i class="fab fa-instagram"></i
              ></a>
            </div>
          </div>
          <div class="col-lg-6 pl-lg-5">
            <div class="row">
              <div class="col-sm-6 mb-5">
                <h5 class="text-white text-uppercase mb-4">Đường dẫn nhanh</h5>
                <div class="d-flex flex-column justify-content-start">
                  <a class="text-white-50 mb-2" href="#"
                    ><i class="fa fa-angle-right mr-2"></i>Trang Chủ</a
                  >
                  <a class="text-white-50 mb-2" href="#"
                    ><i class="fa fa-angle-right mr-2"></i>Giới thiệu</a
                  >
                  <a class="text-white-50 mb-2" href="#"
                    ><i class="fa fa-angle-right mr-2"></i>Dịch vụ</a
                  >
                  <a class="text-white-50" href="#"
                    ><i class="fa fa-angle-right mr-2"></i>Kết nối với chúng tôi</a
                  >
                </div>
              </div>
              <div class="col-sm-6 mb-5">
                <h5 class="text-white text-uppercase mb-4">DỊCH VỤ CỦA CHÚNG TÔI</h5>
                <div class="d-flex flex-column justify-content-start">
                  <a class="text-white-50 mb-2" href="#"
                    ><i class="fa fa-angle-right mr-2"></i>Mát xa cơ thể</a
                  >
                  <a class="text-white-50 mb-2" href="#"
                    ><i class="fa fa-angle-right mr-2"></i>Trị liệu bằng đá</a
                  >
                  <a class="text-white-50 mb-2" href="#"
                    ><i class="fa fa-angle-right mr-2"></i>Trị liệu mặt</a
                  >
                  <a class="text-white-50 mb-2" href="#"
                    ><i class="fa fa-angle-right mr-2"></i>Chăm sóc da</a
                  >
                  <a class="text-white-50" href="#"
                    ><i class="fa fa-angle-right mr-2"></i>Chăm sóc móng tay</a
                  >
                </div>
              </div>
              <div class="col-sm-12 mb-5">
                <h5 class="text-white text-uppercase mb-4">Bản tin</h5>
                <div class="w-100">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control border-light"
                      style="padding: 30px"
                      placeholder="Email của bạn"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-primary px-4">Đăng ký</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container-fluid bg-dark text-light border-top py-4"
      style="border-color: rgba(256, 256, 256, 0.15) !important"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
            <p class="m-0 text-white">
              &copy; <a href="#">Võ Duy Việt</a>. Đã đăng ký Bản quyền.
            </p>
          </div>
          <div class="col-md-6 text-center text-md-right">
            <p class="m-0 text-white">
              Thiết kế bởi <a href="https://htmlcodex.com">Võ Duy Việt  </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer End -->
  </div>
</template>

<style>
.btn-primary {
  color: #212529;
  background-color: #f9a392;
  border-color: #f9a392;
}

.btn-primary:hover {
  color: #212529;
  background-color: #f7846e;
  border-color: #f67a62;
}

.btn-primary:focus,
.btn-primary.focus {
  color: #212529;
  background-color: #f7846e;
  border-color: #f67a62;
  box-shadow: 0 0 0 0.2rem rgba(217, 144, 130, 0.5);
}

.btn-primary.disabled,
.btn-primary:disabled {
  color: #212529;
  background-color: #f9a392;
  border-color: #f9a392;
}

.btn-primary:not(:disabled):not(.disabled):active,
.btn-primary:not(:disabled):not(.disabled).active,
.show > .btn-primary.dropdown-toggle {
  color: #212529;
  background-color: #f67a62;
  border-color: #f67056;
}
.navbar-light .navbar-nav .nav-link {
  padding: 30px 15px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #211e1c;
  outline: none;
}
.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link.active {
  color: #f9a392;
}
.bg-light {
  background-color: #fef1ef !important;
}
.text-right {
  text-align: right !important;
}
.text-primary {
  color: #f9a392 !important;
}
.text-dark {
  color: #211e1c !important;
}
.mr-2,
.mx-2 {
  margin-right: 0.5rem !important;
}
.footer p,
.footer a,
.footer i {
  color: #cccccc !important;
}
@media (min-width: 992px) {
  .footer::after {
    position: absolute;
    content: "";
    width: 1px;
    height: 100%;
    top: 0;
    left: 50%;
    background: rgba(255, 255, 255, 0.15);
  }
  .pl-lg-5,
  .px-lg-5 {
    padding-left: 3rem !important;
  }
}
.input-group
  > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
    .valid-feedback
  ):not(.invalid-tooltip):not(.invalid-feedback) {
  margin-left: calc(var(--bs-border-width) * -1);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.input-group-append {
  display: flex;
}
a {
  text-decoration: none;
}
.btn {
  display: inline-block;
  /* font-weight: 400;
    color: #757575; */
  text-align: center;
  vertical-align: middle;
  user-select: none;
  /* background-color: transparent; */
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn.btn-primary,
.btn.btn-secondary {
  color: #ffffff !important;
}
</style>
