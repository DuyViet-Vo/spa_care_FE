<template>
  <div class="mb-4 mt-4">
    <h2 class="pagination justify-content-center">Sản Phẩm</h2>
    <div class="container mx-auto mt-5">
      <div class="row">
        <div class="col-md-4 mt-4" v-for="(product, id) in products" :key="id">
          <div class="card" style="width: 18rem; height: 400px">
            <img
              :src="product.hinh_anh"
              class="card-img-top"
              alt="anh dich vu"
            />
            <div class="card-body">
              <h5 class="card-title">{{ product.ten_san_pham }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                Giá: {{ product.gia }}
              </h6>
              <p class="card-text">{{ product.mo_ta }}</p>

              <button>Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import API from "@/api";
export default {
  name: "SanPham",
  data() {
    return {
      products: [],
    };
  },
  async created() {
    try {
      await this.fetchSanPham();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },
  methods: {
    async fetchSanPham() {
      try {
        const response = await axios.get(API.get_san_pham, {
          headers: {
            Accept: "application/json",
          },
        });

        this.products = response.data.results;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
  },
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
</style>
