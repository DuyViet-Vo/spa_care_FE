<template>
  <div>
    <button @click="addAppointment">Thêm dịch vụ</button>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Hình ảnh</th>
          <th scope="col">Tên dịch vụ</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Giá</th>
          <th scope="col">Thời gian thực hiện(giờ)</th>
          <th scope="col">Danh mục</th>
          <th scope="col">Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, id) in appointments" :key="id">
          <th scope="row">{{ id + 1 }}</th>
          <td>
            <div class="div-image">
              <img
                class="img-fluid"
                :src="appointment.hinh_anh"
                alt="Uploaded Image"
              />
            </div>
          </td>
          <td>{{ appointment.ten_dich_vu }}</td>
          <td>{{ appointment.mo_ta }}</td>
          <td>{{ appointment.gia }}</td>
          <td>{{ appointment.thoi_gian_thuc_hien }}</td>
          <td>{{ appointment.danh_muc.ten_danh_muc }}</td>
          <td><button>Sửa</button><button>Xoá</button></td>
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
      await this.fetchDichVu();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },
  methods: {
    async fetchDichVu() {
      try {
        const response = await axios.get(API.get_dich_vu, {
          headers: {
            Accept: "application/json",
          },
        });

        this.appointments = response.data.results;
        console.log("Dịch vụ:", this.services);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
  },
};
</script>

<style>
.div-image {
  width: 90px;
}
</style>
