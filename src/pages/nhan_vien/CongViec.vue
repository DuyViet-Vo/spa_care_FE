<template>
  <h2 style="margin-bottom: 30px;">Công việc</h2>
  <div>
    <table class="table table-bordered table-responsive mt-2">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên dịch vụ</th>
          <th scope="col">Thời gian</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Ghi chú</th>
          <th scope="col">Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, id) in appointments" :key="id">
          <th scope="row">{{ id + 1 }}</th>
          <td>{{ appointment.dich_vu.ten_dich_vu }}</td>
          <td>{{ formatDateTime(appointment.lich_hen.thoi_gian_hen) }}</td>
          <td>{{ appointment.trang_thai }}</td>
          <td>{{ appointment.ghi_chu }}</td>
          <td>
            <button
              class="btn btn-info btn-sm"
              @click="UpdateChiTiet(appointment.id)"
            >
              Đã hoàn thành công việc
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

  async mounted() {
    await this.fetchAppointments();
  },

  methods: {
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
    async fetchAppointments() {
      try {
        const user_id = this.$store.getters.getUserId;
        const token = await this.$store.getters.getToken;
        const params = {
          trang_thai: "Đang Thực Hiện",
          nhan_vien: user_id,
        };
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response_chi_tiet_lich_hen = await axios.get(
          API.get_chi_tiet_lich_hen,
          { params, headers }
        );
        console.log(
          "response_chi_tiet_lich_hen: ",
          response_chi_tiet_lich_hen.data.results
        );
        this.appointments = response_chi_tiet_lich_hen.data.results;
      } catch (error) {
        console.error("loi: ", error);
      }
    },
    async UpdateChiTiet(id) {
      try {
        const token = await this.$store.getters.getToken;
        const requestData = {
          trang_thai: "Đã hoàn thành",
        };
        const response_chi_tiet = await axios.patch(
          API.get_chi_tiet_lich_hen + "/" + id,
          requestData,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        await this.fetchAppointments();
      } catch (error) {
        console.error("loi: ", error)
      }
    },
  },
};
</script>
<style></style>
