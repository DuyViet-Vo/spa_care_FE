<template>
  <div>
    <button @click="addAppointment">Thêm sản phẩm</button>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Hình ảnh</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Giá</th>
          <th scope="col">Số lượng</th>
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
          <td>{{ appointment.ten_san_pham }}</td>
          <td>{{ appointment.mo_ta }}</td>
          <td>{{ appointment.gia }}</td>
          <td>{{ appointment.so_luong }}</td>
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
      await this.fetchSanPham();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },
  methods: {
    async fetchSanPham() {
      try {
        const response = await axios.get(API.get_san_pham, {
          headers: {
            Accept: "application/json",
          },
        });

        this.appointments = response.data.results;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
  },
};
</script>

<style></style>
