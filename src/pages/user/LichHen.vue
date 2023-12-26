<template>
  <div id="app" class="container mt-5" style="width: 60%">
    <div
      v-if="this.$store.getters.getToken == null"
      class="alert alert-danger"
      role="alert"
    >
      {{ message }}
    </div>
    <h2 class="mb-4 text-center">Đặt lịch hẹn</h2>

    <div class="row">
      <div v-for="service in services" :key="service.id" class="col-md-3 mt-4">
        <div class="form-check">
          <input
            type="checkbox"
            :id="service.id"
            :value="service.id"
            class="form-check-input"
            v-model="service.selected"
          />
          <label :for="service.id" class="form-check-label">
            <img
              :src="service.hinh_anh"
              alt="Item Image"
              class="img-thumbnail"
            />
            <b>{{ service.ten_dich_vu }}</b>
            <br />
            <span class="text-muted"
              >Giá: <b>{{ formatPrice(service.gia) }}</b> VND</span
            >
            <br />
            <span>Mô tả: {{ service.mo_ta }} </span>
          </label>
        </div>
      </div>
    </div>

    <div class="form-group mt-4">
      <label for="date">Ngày Hẹn:</label>
      <input
        type="date"
        id="date"
        name="date"
        class="form-control"
        v-model="selectedDate"
        :min="currentDate"
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

    <div class="form-group">
      <label for="voucher">Nhập Voucher:</label>
      <input type="text" v-model="code_uu_dai" class="form-control" />
    </div>

    <div class="form-group">
      <label for="totalAmount">Tổng tiền:</label>
      <input
        type="text"
        id="totalAmount"
        :value="totalAmount"
        disabled
        class="form-control"
      />
    </div>
    <div v-if="successMessage" class="alert alert-success mt-4" role="alert">
      {{ successMessage }}
    </div>
    <button class="btn btn-primary mt-4 mb-4" @click="showPaymentModal">
      Đăng ký và thanh toán
    </button>
  </div>
  <div v-if="isPaymentModalVisible" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <!-- Add your PayPalButton component here -->
      <PayPalButton
        :tong_tien_LH="tong_tien_LH"
        @payment-successful="handlePaymentSuccess"
      />

      <!-- Close button or other modal content -->

      <button @click="closePaymentModal" class="btn btn-danger">
        Đóng thanh toán
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API from "@/api";
import convertToISOString from "@/core/convertToISOString";
import { findIdByMaUuDai } from "@/core/findIdByMaUuDai";
import PayPalButton from "@/pages/user/PayPalButton.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

export default {
  name: "LichHenUser",
  components: {
    PayPalButton,
  },
  data() {
    return {
      selectedDate: null,
      selectedTime: null,
      services: [],
      message: "Vui lòng đăng nhập để đặt lịch!",
      uu_dai_data: [],
      code_uu_dai: "",
      tong_tien_LH: 0,
      successMessage: "",
      isPaymentModalVisible: false,
    };
  },
  //tự động hiển thị tổng tiền
  computed: {
    totalAmount() {
      const selectedServices = this.services.filter(
        (service) => service.selected
      );
      const total = selectedServices.reduce(
        (sum, service) => sum + service.gia,
        0
      );
      this.tong_tien_LH = total;
      return this.formatPrice(total);
    },
    currentDate() {
      return new Date().toISOString().split("T")[0];
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
          trang_thai: "Chưa Hoàn Thành",
        }));

        const responseChiTiet = await axios.post(
          API.get_chi_tiet_lich_hen_bulk,
          requestData,
          { headers }
        );
        console.log("API Response chi tiết:", responseChiTiet.data);
        this.successMessage =
          "Bạn đã đăng ký lịch hẹn thành công. Vui lòng chờ Admin duyệt!";
        this.isPaymentModalVisible = false;
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    },
    async showSelectedDichVu() {
      return this.services.filter((service) => service.selected);
    },

    formatPrice(price) {
      // Sử dụng hàm toLocaleString để định dạng giá
      return price.toLocaleString("vi-VN");
    },
    showPaymentModal() {
      const areServicesSelected = this.services.some(
        (service) => service.selected
      );
      const isDateSelected = this.selectedDate !== null;
      const isTimeSelected = this.selectedTime !== null;
      if (!areServicesSelected || !isDateSelected || !isTimeSelected) {
        Swal.fire({
          icon: "warning",
          title: "Thông báo",
          text: "Vui lòng chọn dịch vụ, ngày hẹn và thời gian hẹn trước khi thanh toán.",
        });
        return;
      }
      this.isPaymentModalVisible = true;
    },

    closePaymentModal() {
      this.isPaymentModalVisible = false;
    },
    handlePaymentSuccess() {
      this.dangKyLichHen();
    },
  },
};
</script>

<style>
.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30%;
  height: auto;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
}
</style>
