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

    <div v-for="service in services" :key="service.id" class="form-check mt-2">
      <input
        type="checkbox"
        :id="service.id"
        :value="service.id"
        class="form-check-input"
        v-model="service.selected"
      />
      <img :src="service.hinh_anh" alt="Item Image" style="width: 80px" />
      <label :for="service.id" class="form-check-label">{{
        service.ten_dich_vu
      }}</label>
      <p>giá: {{ service.gia }}</p>
    </div>
    <div>
      <h3>Nhập Voucher:</h3>
      <input type="text" v-model="code_uu_dai" />
    </div>
    <div>
      <h3>Tổng tiền:</h3>
      <input
        type="text"
        id="disabledInput"
        :value="totalAmount"
        disabled
        style="float: right"
      />
    </div>

    <div class="form-group mt-5">
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
import { findIdByMaUuDai } from "@/core/findIdByMaUuDai";

export default {
  data() {
    return {
      selectedDate: null,
      selectedTime: null,
      services: [],
      message: "Vui lòng đăng nhập để đặt lịch!",
      uu_dai_data: [],
      code_uu_dai: "",
      tong_tien_LH: 0,
    };
  },
  //tự động hiển thị tổng tiền
  computed: {
    totalAmount() {
      // Calculate the total amount based on selected services
      const selectedServices = this.services.filter(
        (service) => service.selected
      );
      const total = selectedServices.reduce(
        (sum, service) => sum + service.gia,
        0
      );
      this.tong_tien_LH = total
      return total;
    },
  },
  // Gọi api dịch vụ khi load trang
  async created() {
    try {
      await this.getDichVuData();
      await this.getUuDaiData();
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
    // api dữ liệu ưu đãi
    async getUuDaiData() {
      try {
        const token = await this.$store.getters.getToken;
        const response_uu_dai = await axios.get(API.get_uu_dai, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        this.uu_dai_data = response_uu_dai.data.results;
        console.log("Uu Dai:", this.uu_dai_data);
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
        const data = {
          thoi_gian_hen: convertToISOString(time),
          trang_thai: "Chưa Duyệt",
          khach_hanh: user_id,
          tien_coc: this.tong_tien_LH,
          tong_tien: this.tong_tien_LH,
          uu_dai: findIdByMaUuDai(this.uu_dai_data, this.code_uu_dai),
        };
        console.log("data: ", data);
        const response = await axios.post(API.get_lich_hen, data, {
          headers,
        });

        console.log("API Response:", response.data);

        const id_lich_hen = response.data.id;
        console.log("ID lịch hẹn: ", id_lich_hen);

        const requestData = selectedDichVu.map((dichVu) => ({
          dich_vu: dichVu.id,
          lich_hen: id_lich_hen,
          trang_thai: "chưa hoàn thành",
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
