<template>
  <div>
    <button @click="addAppointment">Thêm dịch vụ</button>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Hình ảnh </th>
          <th scope="col">Tên dịch vụ</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Giá</th>
          <th scope="col">Thời gian thực hiện(giờ)</th>
          <th scope="col">Danh mục</th>
          <th scope="col">Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td></td>
          <td>Lấy nhân mụn</td>
          <td>lấy hết nhân mụn</td>
          <td>1000</td>
          <td>1</td>
          <td>Chăm sóc Da</td>
          <td>
            <button>Sửa</button><button>Xoá</button>
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
      await this.fetchDichVu();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },
  methods: {
    async fetchDichVu() {
      try {
      } catch (error) {}
    },
  },
};
</script>

<style></style>
