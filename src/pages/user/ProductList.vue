<template>
  <div>
    <!-- Carousel Start -->
    <div
      id="carouselExampleDark"
      class="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <img
            src="@/assets/img/spacare.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h2>TRUNG TÂM SPA & LÀM ĐẸP</h2>
            <p>
              Giúp chị em phụ nữ phục hồi lại làn da căng mướt cùng vẻ đẹp khỏe
              khoắn tươi mới như thời thanh xuân.
            </p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img
            src="@/assets/img/spacare.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h2>TRUNG TÂM SPA & LÀM ĐẸP</h2>
            <p>Giúp giải toả căng thẳng sau 1 ngày làm việc vất vả.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="@/assets/img/spacare.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h2>TRUNG TÂM SPA & LÀM ĐẸP</h2>
            <p>
              Nỗ lực giúp quý khách hàng cải thiện làn da trẻ trung như em bé.
            </p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- Carousel End -->

    <!-- About Start -->
    <div class="container-fluid py-5">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6 pb-5 pb-lg-0">
            <img class="img-fluid w-100" src="@/assets/img/about.jpg" alt="" />
          </div>
          <div class="col-lg-6">
            <h6
              class="d-inline-block text-primary text-uppercase bg-light py-1 px-2"
            >
              Giới thiệu
            </h6>
            <h1 class="mb-4">
              Spa tốt nhất của bạn, Trung Tâm Chăm Sóc Da & Sắc Đẹp
            </h1>
            <p class="pl-4 border-left border-primary">
              Chào mừng bạn đến Spa của chúng tôi! Nhân viên giàu kinh nghiệm,
              tận tâm, vui vẻ, thân thiện. Giá cả phải chăng. Đặt lịch ngay để
              trải nghiệm sự thư giãn và làm đẹp tuyệt vời!
            </p>
            <div class="row pt-3">
              <div class="col-6">
                <div class="bg-light text-center p-4">
                  <h3 class="display-4 text-primary" data-toggle="counter-up">
                    99
                  </h3>
                  <h6 class="text-uppercase">CHUYÊN GIA SPA</h6>
                </div>
              </div>
              <div class="col-6">
                <div class="bg-light text-center p-4">
                  <h3 class="display-4 text-primary" data-toggle="counter-up">
                    789
                  </h3>
                  <h6 class="text-uppercase">KHÁCH HÀNG</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- About End -->

    <!-- Open Hours Start -->
    <div class="container-fluid py-5">
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-6" style="min-height: 500px">
            <div class="position-relative h-100">
              <img
                class="position-absolute w-100 h-100"
                src="@/assets/img/opening.jpg"
                style="object-fit: cover"
              />
            </div>
          </div>
          <div class="col-lg-6 pt-5 pb-lg-5">
            <div class="hours-text bg-light p-4 p-lg-5 my-lg-5">
              <h6
                class="d-inline-block text-primary text-uppercase bg-light py-1 px-2"
              >
                Giờ Mở Cửa
              </h6>
              <h1 class="mb-4">Hãy đến với chúng tôi</h1>
              <p>
                Hãy đặt lịch ngay hôm nay để được hòa mình trong không gian sang
                trọng, dịch vụ chăm sóc tận tâm và giá cả hợp lý. Chúng tôi tự
                tin rằng bạn sẽ rời khỏi Spa của chúng tôi với tâm trạng thư
                thái và làn da rạng ngời.
              </p>
              <ul class="list-inline">
                <li class="h6 py-1">
                  <i class="far fa-circle text-primary mr-3"></i>Thứ 2 – thứ 6 :
                  9:00 AM - 7:00 PM
                </li>
                <li class="h6 py-1">
                  <i class="far fa-circle text-primary mr-3"></i>Thứ 7 : 9:00 AM
                  - 6:00 PM
                </li>
                <li class="h6 py-1">
                  <i class="far fa-circle text-primary mr-3"></i>Chủ nhật : 9:00
                  AM - 12:00 PM
                </li>
              </ul>
              <a href="" class="btn btn-primary mt-2">Dặt Lịch Ngay</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Open Hours End -->


    
  </div>
</template>

<script>
export default {
  // Your component logic here
};
</script>
