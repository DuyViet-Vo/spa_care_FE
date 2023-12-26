<template>
  <div>
    <h2 style="margin-bottom: 30px;">Nhân viên</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Ngày sinh</th>
          <th scope="col">Email</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Chức vụ</th>
          <th scope="col">Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, id) in users" :key="id">
          <th scope="row">{{ id + 1 }}</th>
          <td>{{ user.ho_ten }}</td>
          <td>{{ user.sdt }}</td>
          <td>{{ user.ngay_sinh }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.dia_chi }}</td>
          <td>{{ user.quyen.ten_quyen }}</td>
          <td>
            <button class="btn btn-info btn-sm">Sửa</button>
            <button class="btn btn-danger btn-sm">Xoá</button>
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
      users: [],
    };
  },
  async created() {
    try {
      await this.fetchNhanVien();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },
  methods: {
    async fetchNhanVien() {
      try {
        const token = await this.$store.getters.getToken;
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(API.get_nhan_vien, {
          headers,
        });
        console.log("Nhan vien: ", response.data);
        this.users = response.data;
      } catch (error) {}
    },
  },
};
</script>

<style></style>
