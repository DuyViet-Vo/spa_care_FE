<template>
    <div class="container mx-auto mt-5">
      <div class="row" >
        <div class="col-md-4 mt-4" v-for="(service, id) in services" :key="id">
          <div class="card" style="width: 18rem; height: 400px">
            <img
              :src="service.hinh_anh"
              class="card-img-top"
              alt="anh dich vu"
            />
            <div class="card-body">
              <h5 class="card-title">{{ service.ten_dich_vu }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Giá: {{ service.gia }}</h6>
              <p class="card-text">{{ service.mo_ta }}</p>

              <button>Xem chi tiết</button>
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
  name: "DichVu",
  data() {
    return {
      services: [],
    };
  },
  async created() {
    try {
      await this.getDichVuData();
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
  },
};
</script>

<style>
/* Your styles remain unchanged */
</style>
