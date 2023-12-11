<template>
  <section class="section-products">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-md-8 col-lg-6">
          <div class="header">
            <h2 class="pagination justify-content-center">Dịch Vụ</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- Single Product -->
        <div class="col-md-6 col-lg-4 col-xl-3" v-for="(service,id) in services" :key="id">
          <div id="product-1" class="single-product">
            <div class="part-1">
              <img style="width: 100%;height: auto;display: block;"
                :src="service.hinh_anh"
              />
            </div>
            <div class="part-2">
              <h3 class="product-title">{{ service.ten_dich_vu }}</h3>
              <h4 class="product-price">{{ service.gia }}</h4>
              <router-link to="/user/lich-hen" class="DatLich"
                >Đặt lịch</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section-products">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-md-8 col-lg-6">
          <div class="header">
            <h2 class="pagination justify-content-center">Sản phẩm</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- Single Product -->
        <div class="col-md-6 col-lg-4 col-xl-3" v-for="(product,id ) in products" :key="id">
          <div id="product-1" class="single-product">
            <div class="part-1">
              <img style="width: 100%;height: auto;display: block;"
                :src="product.hinh_anh"
              />
            </div>
            <div class="part-2">
              <h3 class="product-title">{{ product.ten_san_pham }}</h3>
              <h4 class="product-price">{{ product.gia }}</h4>
              <button class="DatLich">Mua</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import API from "@/api";

export default {
  data() {
    return {
      products: [],
      services: [],
    };
  },
  async created() {
    try {
      await this.getDichVuData();
      await this.fetchSanPham();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },
  methods: {
    async getDichVuData() {
      try {
        const response = await axios.get(API.get_dich_vu, {
          headers: {
            Accept: "application/json",
          },
        });

        this.services = response.data.results;
        console.log("Dịch vụ:", this.services);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap");

body {
  font-family: "Poppins", sans-serif;
  color: #444444;
}
a,
a:hover {
  text-decoration: none;
  color: inherit;
}

.section-products {
  padding: 80px 0 54px;
}

.section-products .header {
  margin-bottom: 50px;
}

.section-products .header h3 {
  font-size: 1rem;
  color: #fe302f;
  font-weight: 500;
}

.section-products .header h2 {
  font-size: 2.2rem;
  font-weight: 400;
  color: #444444;
}

.section-products .single-product {
  margin-bottom: 26px;
}

.section-products .single-product .part-1 {
  position: relative;
  height: 290px;
  max-height: 290px;
  margin-bottom: 20px;
  overflow: hidden;
}

.section-products .single-product .part-1::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all 0.3s;
}

.section-products .single-product:hover .part-1::before {
  transform: scale(1.2, 1.2) rotate(5deg);
}

.section-products .single-product .part-1 .discount,
.section-products .single-product .part-1 ul {
  position: absolute;
  bottom: -41px;
  left: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
  opacity: 0;
  transition: bottom 0.5s, opacity 0.5s;
}

.section-products .single-product:hover .part-1 ul {
  bottom: 30px;
  opacity: 1;
}

.section-products .single-product .part-1 ul li {
  display: inline-block;
  margin-right: 4px;
}

.section-products .single-product .part-1 ul li a {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
  color: #444444;
  text-align: center;
  box-shadow: 0 2px 20px rgb(50 50 50 / 10%);
  transition: color 0.2s;
}

.section-products .single-product .part-1 ul li a:hover {
  color: #fe302f;
}

.section-products .single-product .part-2 .product-title {
  font-size: 1rem;
}

.section-products .single-product .part-2 h4 {
  display: inline-block;
  font-size: 1rem;
}

.section-products .single-product .part-2 .product-old-price {
  position: relative;
  padding: 0 7px;
  margin-right: 2px;
  opacity: 0.6;
}

.section-products .single-product .part-2 .product-old-price::after {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #444444;
  transform: translateY(-50%);
}
.DatLich {
  margin-left: 55%;
  background-color: rgb(111, 191, 226);
  border: none;
  border-radius: 10px;
}
</style>
