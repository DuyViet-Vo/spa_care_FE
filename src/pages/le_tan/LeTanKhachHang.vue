<template>
  <div class="search-container">
    <h2 style="margin-bottom: 30px">Khách hàng</h2>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Nhập tên khách hàng..."
    />
    <button
      class="btn btn-primary"
      @click="searchAppointments"
      style="margin-left: 30px"
    >
      Tìm kiếm
    </button>
  </div>
  <div>
    <table class="table table-bordered mt-4">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Khách hàng</th>
          <th scope="col">Thời giạn hẹn</th>
          <th scope="col">Dịch vụ</th>
          <th scope="col">Trạng thái dịch vụ</th>
          <th scope="col">Tổng tiền</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, id) in appointments" :key="id">
          <th scope="row">{{ id + 1 }}</th>
          <td>{{ appointment.khach_hanh.ho_ten }}</td>
          <td>{{ formatDate(appointment.thoi_gian_hen) }}</td>
          <td>
            <ul>
              <li
                v-for="(service, serviceIndex) in appointment.chi_tiet_lich_hen"
                :key="serviceIndex"
              >
                {{ service.dich_vu.ten_dich_vu }}
              </li>
            </ul>
          </td>
          <td>
            <tr
              v-for="(service, serviceIndex) in appointment.chi_tiet_lich_hen"
              :key="serviceIndex"
            >
              {{
                service.trang_thai
              }}
            </tr>
          </td>

          <td>{{ appointment.tong_tien }}</td>
          <td>{{ appointment.trang_thai }}</td>
          <td>
            <button
              class="btn btn-info btn-sm"
              @click="openDetailPage(appointment)"
            >
              Xem chi tiết
            </button>
            <button
              type="button"
              class="btn btn-warning"
              @click="openModal(appointment.id)"
            >
              Update lich
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Sử dụng modalAppointment để hiển thị modal cụ thể -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h2 class="text-center">Update Lịch</h2>
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
        <label for="time">Thời Gian Hẹn:</label>
        <input
          type="time"
          id="time"
          name="time"
          class="form-control"
          v-model="selectedTime"
          required
        />
        <div class="mt-4">
          <div class="mt-4">
            <button
              type="button"
              class="btn btn-primary mr-3"
              @click="updatLichHen()"
            >
              Cập nhật
            </button>
            <button
              @click="showModal = false"
              type="button"
              class="btn btn-danger"
              style="margin-left: 30px"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API from "@/api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { convertDateTimeFormat } from "@/core/convertDateTimeFormat.js";
import convertToISOString from "@/core/convertToISOString";

export default {
  data() {
    return {
      appointments: [],
      modalAppointment: null,
      nhan_vien: null,
      list_nhan_vien: [],
      searchQuery: "",
      showModal: false,
      selectedDate: null,
      selectedTime: null,
      selectedAppointmentId: null,
    };
  },

  async created() {
    try {
      await this.fetchLichHen();
      await this.fetchNhanVien();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },

  computed: {
    currentDate() {
      return new Date().toISOString().split("T")[0];
    },
  },
  methods: {
    openModal(id) {
      this.selectedAppointmentId = id;
      this.showModal = true;
    },
    async updatLichHen() {
      const time = this.selectedDate + " " + this.selectedTime;
      const thoi_gian = convertToISOString(time);
      const appointmentId = this.selectedAppointmentId;
      const apiUrl = "http://localhost:8000/api/lich-hen/" + appointmentId;
      const token = await this.$store.getters.getToken;
      try {
        const response = await axios.patch(
          apiUrl,
          {
            thoi_gian_hen: thoi_gian,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        this.showModal = false;
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Cập nhật lịch hẹn thành công!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        onsole.error("API Error:", error);
      }
    },
    async fetchNhanVien() {
      try {
        const token = await this.$store.getters.getToken;
        const response_nhan_vien = await axios.get(API.get_nhan_vien, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("nhan vien: ", response_nhan_vien.data);
        this.list_nhan_vien = response_nhan_vien.data;
      } catch (error) {
        console.log("loi: ", error);
      }
    },
    async fetchLichHen() {
      try {
        const token = await this.$store.getters.getToken;
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(API.get_lich_hen, {
          params: {
            trang_thai: "Đã Duyệt",
          },
          headers,
        });
        console.log("lich hen: ", response.data.results);
        this.appointments = response.data.results;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    formatDate(dateTimeString) {
      return convertDateTimeFormat(dateTimeString);
    },
    // gọi api tìm kiếm lịch hẹn
    async searchAppointments() {
      try {
        const token = await this.$store.getters.getToken;
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${API.get_lich_hen}?search=${this.searchQuery}`,
          {
            params: {
              trang_thai: "Đã Duyệt",
            },
            headers,
          }
        );

        this.appointments = response.data.results;
      } catch (error) {
        console.error("Lỗi khi tìm kiếm lịch hẹn:", error);
      }
    },
    openDetailPage(appointment) {
      // Sử dụng Vue Router để chuyển hướng đến trang chi tiết
      this.$router.push({
        name: "chi_tiet_lich_hen",
        params: { id: appointment.id },
      });
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
