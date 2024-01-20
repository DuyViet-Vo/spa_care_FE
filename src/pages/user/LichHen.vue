<template>
  <div style="padding-top: 50px; margin-top: 100px">
    <div id="app" class="container mt-5" style="width: 90%">
      <div class="main-datlich">
        <div style="width: 75%">
          <h2 class="mb-4 text-center">ĐẶT LỊCH HẸN</h2>
          <h3>Dịch vụ</h3>
          <div class="row">
            <div
              v-for="service in services"
              :key="service.id"
              class="col-md-3 mt-4"
            >
              <div class="form-check">
                <input
                  type="checkbox"
                  :id="'service_' + service.id"
                  :value="service.id"
                  class="form-check-input"
                  v-model="service.selected"
                />
                <label :for="'service_' + service.id" class="form-check-label">
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
          <br />
          <h3>Combo</h3>
          <div class="row">
            <div v-for="combo in combos" :key="combo.id" class="col-md-3 mt-4">
              <div class="form-check">
                <input
                  type="checkbox"
                  :id="'combo_' + combo.id"
                  :value="combo.id"
                  class="form-check-input"
                  v-model="combo.selected"
                />
                <label :for="'combo_' + combo.id" class="form-check-label">
                  <img
                    :src="combo.hinh_anh"
                    alt="Item Image"
                    class="img-thumbnail"
                  />
                  <b>{{ combo.ten_combo }}</b>
                  <br />
                  <span class="text-muted"
                    >Giá: <b>{{ formatPrice(combo.gia) }}</b> VND</span
                  >
                  <br />
                  <span>Mô tả: {{ combo.mo_ta }} </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="box-datlich">
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
              :disabled="true"
              class="form-control"
            />
          </div>
          <button class="btn btn-primary mt-4 mb-4" @click="showPaymentModal">
            Đăng ký và thanh toán
          </button>
        </div>
      </div>
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
      combos: [],
    };
  },
  //tự động hiển thị tổng tiền
  computed: {
    totalAmount() {
      const selectedServices = this.services.filter(
        (service) => service.selected
      );
      const selectedCombos = this.combos.filter((combo) => combo.selected);

      const servicesTotal = selectedServices.reduce(
        (sum, service) => sum + service.gia,
        0
      );

      const combosTotal = selectedCombos.reduce(
        (sum, combo) => sum + combo.gia,
        0
      );

      this.tong_tien_LH = servicesTotal + combosTotal;

      return this.formatPrice(this.tong_tien_LH);
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
      await this.getComboData();
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
    // Api du lieu combo
    async getComboData() {
      try {
        const response_combo = await axios.get(API.get_combo, {
          headers: {
            Accept: "application/json",
          },
        });
        this.combos = response_combo.data.results;
        console.log("combo: ", this.combos);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu combo:", error);
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
        const selectedCombos = this.combos.filter((combo) => combo.selected);

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

        const requestDataDichVu = selectedDichVu.map((dichVu) => ({
          dich_vu: dichVu.id,
          lich_hen: id_lich_hen,
          trang_thai: "Chưa Thực Hiện",
        }));

        const requestDataCombos = selectedCombos.flatMap((combo) =>
          combo.chi_tiet_combo.map((chiTiet) => ({
            dich_vu: chiTiet.dich_vu,
            lich_hen: id_lich_hen,
            trang_thai: "Chưa Thực Hiện",
          }))
        );

        console.log("mã id của dich vu: ", requestDataCombos);
        const requestData = requestDataDichVu.concat(requestDataCombos);

        const responseChiTiet = await axios.post(
          API.get_chi_tiet_lich_hen_bulk,
          requestData,
          { headers }
        );

        console.log("API Response chi tiết:", responseChiTiet.data);

        this.successMessage =
          "Bạn đã đăng ký lịch hẹn thành công. Vui lòng chờ Admin duyệt!";
        this.isPaymentModalVisible = false;
        const send_email = await axios.post(
          API.get_send_email_lich_hen,
          {
            id_lich_hen: id_lich_hen,
          },
          {
            headers,
          }
        );
        console.log("send email: ", send_email);
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
      const areCombosSelected = this.combos.some((combo) => combo.selected);
      const isDateSelected = this.selectedDate !== null;
      const isTimeSelected = this.selectedTime !== null;
      const token = this.$store.getters.getToken;
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Thông báo",
          text: "Vui lòng đăng nhập để đặt lịch và thanh toán.",
        });
        // Redirect to the login page or perform any other action
        // Example: this.$router.push("/login");
        return;
      }

      if (!areServicesSelected && !areCombosSelected) {
        Swal.fire({
          icon: "warning",
          title: "Thông báo",
          text: "Vui lòng chọn ít nhất một dịch vụ hoặc combo trước khi thanh toán.",
        });
        return;
      }

      if (!isDateSelected || !isTimeSelected) {
        Swal.fire({
          icon: "warning",
          title: "Thông báo",
          text: "Vui lòng chọn ngày hẹn và thời gian hẹn trước khi thanh toán.",
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
.main-datlich {
  display: flex;
  gap: 0 15px;
}
.box-datlich {
  position: fixed;
  right: 150px;
  top: 200px;
}
</style>
