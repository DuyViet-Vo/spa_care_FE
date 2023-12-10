<template>
    <div>
  
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
          <tr>
            <th scope="row">1</th>
            <td>Võ Duy Viêt</td>
            <td>0392252429</td>
            <td>18/10/2001</td>
            <td>duytviet1810@gmail.com</td>
            <td>Quảng Nam</td>
            <td>Nhân viên</td>
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
      approveAppointment(index) {
        // Xử lý khi bấm nút Duyệt
      },
      viewDetails(index) {
        // Xử lý khi bấm nút Xem chi tiết
      },
    },
  };
  </script>
  
  <style></style>
  