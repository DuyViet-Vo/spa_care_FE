<template>
  <div>
    <h2 style="margin-bottom: 30px">CÔNG VIỆC ĐÃ HOÀN THÀNH</h2>
    <table class="table table-bordered table-responsive mt-2">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên dịch vụ</th>
          <th scope="col">Thời gian hẹn</th>
          <th scope="col">Thời gian Đã Thực hiện</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, id) in appointments" :key="id">
          <th scope="row">{{ id + 1 }}</th>
          <td>{{ appointment.dich_vu.ten_dich_vu }}</td>
          <td>{{ formatDate(appointment.lich_hen.thoi_gian_hen) }}</td>
          <td>{{ formatDate(appointment.updated_at) }}</td>
          <td>{{ appointment.trang_thai }}</td>
          <td>{{ appointment.ghi_chu }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import API from "@/api";
import { convertDateTimeFormat } from "@/core/convertDateTimeFormat.js";

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
    formatDate(dateTimeString) {
      return convertDateTimeFormat(dateTimeString);
    },
    async fetchAppointments() {
      try {
        const user_id = this.$store.getters.getUserId;
        const token = await this.$store.getters.getToken;
        const params = {
          trang_thai: "Đã hoàn thành",
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
        this.appointments = response_chi_tiet_lich_hen.data.results;
        console.log(
          "response_chi_tiet_lich_hen: ",
          response_chi_tiet_lich_hen.data.results
        );
      } catch (error) {
        console.error("loi: ", error);
      }
    },
  },
};
</script>
<style></style>
