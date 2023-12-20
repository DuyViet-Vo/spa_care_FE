<template>
  <div>
    <h2 class="text-center mt-4">Lịch hẹn của bạn</h2>
    <table
      class="table table-bordered mt-4 mb-4"
      style="width: 80%; margin-left: 10%"
    >
      <thead>
        <tr>
          <th scope="col">STT</th>

          <th scope="col">Thời giạn hẹn</th>
          <th scope="col">Tiền cọc</th>
          <th scope="col">Tổng tiền</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Dịch vụ</th>
          <th scope="col">Trạng thái dịch vụ</th>
          <th scope="col">Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, id) in appointments" :key="id">
          <th scope="row">{{ id + 1 }}</th>

          <td>{{ formatDateTime(appointment.thoi_gian_hen) }}</td>
          <td>{{ appointment.tien_coc }}</td>
          <td>{{ appointment.tong_tien }}</td>
          <td>{{ appointment.trang_thai }}</td>
          <td>
            <tr
              v-for="(service, serviceIndex) in appointment.chi_tiet_lich_hen"
              :key="serviceIndex"
            >
              {{
                service.dich_vu.ten_dich_vu
              }}
            </tr>
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
          <td>
            <button
              v-if="appointment.trang_thai !== 'Đã Duyệt'"
              class="btn btn-danger btn-sm"
              @click="deleteAppointment(appointment.id)"
            >
              Huỷ lịch hẹn
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

export default {
  data() {
    return {
      appointments: [],
    };
  },

  async created() {
    try {
      await this.fetchChiTietLichHen();
    } catch (error) {
      console.error("lỗi trong hook: ", error);
    }
  },
  methods: {
    async fetchChiTietLichHen() {
      try {
        const token = await this.$store.getters.getToken;
        const response_chi_tiet = await axios.get(API.get_lich_hen, {
          params: {
            khach_hanh: this.$store.getters.getUserId,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("chi tiet: ", response_chi_tiet.data.results);
        this.appointments = response_chi_tiet.data.results;
      } catch (error) {
        console.error("lỗi khi lấy dữ liệu: ", error);
      }
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
    async deleteAppointment(id) {
      const isConfirmed = await Swal.fire({
        title: "Bạn có chắc chắn không?",
        text: "Một khi đã huỷ, bạn sẽ không thể khôi phục lại lịch hẹn này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
      });

      if (isConfirmed.isConfirmed) {
        try {
          const token = await this.$store.getters.getToken;
          await axios.delete(`${API.get_lich_hen}/${id}`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          this.appointments = this.appointments.filter(
            (appointment) => appointment.id !== id
          );
          await this.fetchChiTietLichHen();
        } catch (error) {
          console.error("Lỗi khi xoá lịch hẹn:", error);
        }
      }
    },
  },
};
</script>
<style></style>
