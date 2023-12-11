<template>
  <div id="app" class="container mt-5" style="height: auto; width: 500px">
    <div
      v-if="this.$store.getters.getToken == null"
      class="alert alert-danger"
      role="alert"
    >
      {{ message }}
    </div>
    <h2 class="mb-4 pagination justify-content-center">Đặt lịch hẹn</h2>

    <div v-for="service in services" :key="service.id" class="form-check">
      <input
        type="checkbox"
        :id="service.id"
        :value="service.id"
        class="form-check-input"
        v-model="service.selected"
      />
      <label :for="service.id" class="form-check-label">{{
        service.ten_dich_vu
      }}</label>
    </div>

    <div class="form-group mt-4">
      <label for="date">Ngày Hẹn:</label>
      <input
        type="date"
        id="date"
        name="date"
        class="form-control"
        v-model="selectedDate"
        required
      />
    </div>

    <div class="form-group">
      <label for="time">Thời Gian Hẹn:</label>
      <input
        type="time"
        id="time"
        name="time"
        class="form-control"
        v-model="selectedTime"
        required
      />
    </div>

    <button @click="dangKyLichHen" class="btn btn-primary mt-4 mb-4">
      Đăng ký lịch hẹn
    </button>
  </div>
</template>

<script>
import axios from "axios";
import API from "@/api";
import convertToISOString from "@/core/convertToISOString";

export default {
  data() {
    return {
      selectedDate: null,
      selectedTime: null,
      services: [],
      message: "Vui lòng đăng nhập để đặt lịch!",
    };
  },
  // Gọi api dịch vụ khi load trang
  async created() {
    try {
      await this.getDichVuData();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },
  methods: {
    // API dữ liệu dịch vụ
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
    // Button đăng ký lịch
    async dangKyLichHen() {
      try {
        const selectedDichVu = await this.showSelectedDichVu();
        const time = this.selectedDate + " " + this.selectedTime;
        const user_id = this.$store.getters.getUserId;
        const token = await this.$store.getters.getToken;
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          API.get_lich_hen,
          {
            thoi_gian_hen: convertToISOString(time),
            trang_thai: "Chưa Duyệt",
            khach_hanh: user_id,
          },
          {
            headers,
          }
        );

        console.log("API Response:", response.data);

        const id_lich_hen = response.data.id;
        console.log("ID lịch hẹn: ", id_lich_hen);

        const requestData = selectedDichVu.map((dichVu) => ({
          dich_vu: dichVu.id,
          lich_hen: id_lich_hen,
        }));

        const responseChiTiet = await axios.post(
          API.get_chi_tiet_lich_hen_bulk,
          requestData,
          { headers }
        );
        console.log("API Response chi tiết:", responseChiTiet.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    },
    async showSelectedDichVu() {
      return this.services.filter((service) => service.selected);
    },
  },
};
</script>

<style></style>
