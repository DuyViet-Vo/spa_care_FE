<template>
  <div>
    <button @click="addAppointment">Thêm lịch hẹn</button>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Khách hàng</th>
          <th scope="col">Nhân viên</th>
          <th scope="col">Dịch vụ</th>
          <th scope="col">Thời giạn hẹn</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, id) in appointments" :key="id">
          <th scope="row">{{ id + 1 }}</th>
          <td>{{ appointment.khach_hanh.ho_ten }}</td>
          <td>{{ appointment.nhan_vien?.ho_ten }}</td>
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
          <td>{{ formatDateTime(appointment.thoi_gian_hen) }}</td>
          <td>{{ appointment.trang_thai }}</td>
          <td>
            <button
              @click="approveAppointment(index)"
              class="btn btn-info btn-sm"
            >
              Duyệt
            </button>
            <button
              @click="viewDetails(appointment.id)"
              class="btn btn-danger btn-sm"
            >
              Xoá
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import API from "@/api";

export default {
  data() {
    return {
      appointments: [],
    };
  },
  async created() {
    try {
      await this.fetchLichHen();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },
  methods: {
    async fetchLichHen() {
      try {
        const token = await this.$store.getters.getToken;
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(API.get_lich_hen, {
          headers,
        });
        console.log("lich hen: ", response.data.results);
        this.appointments = response.data.results;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    approveAppointment(index) {
      // Xử lý khi bấm nút Duyệt
    },
    viewDetails(index) {
      // Xử lý khi bấm nút Xem chi tiết
    },
    formatDateTime(dateTimeString) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };

      const date = new Date(dateTimeString);
      return date.toLocaleString("en-US", options).replace(/,/g, " ");
    },
  },
};
</script>

<style></style>
