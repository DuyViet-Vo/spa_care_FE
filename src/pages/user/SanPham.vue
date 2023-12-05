<template>
  <h2>Sản phẩm</h2>
  <div class="container mx-auto mt-5">
    <div class="row">
      <div class="col-md-4">
        <div class="card" style="width: 18rem; height: 400px">
          <img
            src="https://i.imgur.com/ZTkt4I5.jpg"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>

            <button>Xem chi tiết</button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card" style="width: 18rem; height: 400px">
          <img
            src="https://i.imgur.com/ZTkt4I5.jpg"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button class="ChiTiet">Xem chi tiết</button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card" style="width: 18rem; height: 400px">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGcrUDFPgHI64ebdoMsF2hJnXJfvaTL5oOA&usqp=CAU"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button>Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SanPham",
};
</script>
<style>
:root {
  --gradient: linear-gradient(to left top, #dd2476 10%, #ff512f 90%) !important;
}

body {
}

.card {
  border: 1px solid black;
  margin-bottom: 2rem;
}

.btn {
  border: 5px solid;
  border-image-slice: 1;
  background: var(--gradient) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  border-image-source: var(--gradient) !important;
  text-decoration: none;
  transition: all 0.4s ease;
}

.btn:hover,
.btn:focus {
  background: var(--gradient) !important;
  -webkit-background-clip: none !important;
  -webkit-text-fill-color: #fff !important;
  border: 5px solid #fff !important;
  box-shadow: #222 1px 0 10px;
  text-decoration: underline;
}
img {
  height: 180px;
}
h2 {
  text-align: center;
  margin-top: 35px;
}
.ChiTiet {
}
</style>
