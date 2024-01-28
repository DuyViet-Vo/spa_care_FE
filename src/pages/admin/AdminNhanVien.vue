<template>
  <div>
    <h2 style="margin-bottom: 30px">NHÂN VIÊN</h2>

    <div class="search-container">
      <button type="button" class="btn btn-primary mt-2" @click="openModal()">
        Thêm Nhân Viên
      </button>
      <div style="margin-top: 20px">
        <input type="text" v-model="searchQuery" placeholder="Nhập tên " />
        <button class="btn btn-primary" style="margin-left: 30px">
          Tìm kiếm
        </button>
      </div>
      <h4 style="float: right; margin-right: 200px">
        Tổng tiền lương: {{ formatNumber(totalSalary) }}
      </h4>
    </div>
    <!-- Sử dụng modalAppointment để hiển thị modal cụ thể -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h2 class="text-center">Thêm nhân viên</h2>
        <label for="category" class="mt-4">Nhập email: </label>
        <input type="email" v-model="email" :readonly="editMode" />
        <label for="category" class="mt-4">Nhập lương: </label>
        <input type="number" v-model="luong" />
        <label for="category" class="mt-4">Chọn chức vụ: </label>
        <select id="category" v-model="quyen">
          <option
            v-for="(nhan_vien, index) in list_nhan_vien"
            :key="index"
            :value="nhan_vien.id"
          >
            {{ nhan_vien.quyen }}
          </option>
        </select>
        <div class="mt-4">
          <div class="mt-4">
            <button
              type="button"
              class="btn btn-primary mr-3"
              @click="CreateNhanVien"
              v-if="!selectedUserId"
            >
              Lưu
            </button>
            <button
              type="button"
              class="btn btn-primary mr-3"
              @click="updateNhanVien"
              v-if="selectedUserId"
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

    <table class="table table-bordered mt-4">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Ngày sinh</th>
          <th scope="col">Email</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Chức vụ</th>
          <th scope="col">Lương</th>
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
          <td>{{ formatNumber(user.luong) }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="openEditModal(user)">
              Sửa
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteNhanVien(user.email)"
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
import { chuyenDoiSoThanhChuoi } from "../../core/chuyenDoiSoThanhChuoi";

export default {
  data() {
    return {
      users: [],
      showModal: false,
      modalAppointment: null,
      selectedUserId: null,
      email: null,
      quyen: null,
      luong: null,
      list_nhan_vien: [
        {
          id: 2,
          quyen: "Nhân viên Spa",
        },
        {
          id: 3,
          quyen: "Lễ tân",
        },
        {
          id: 4,
          quyen: "Kế toán",
        },
      ],
    };
  },
  async created() {
    try {
      await this.fetchNhanVien();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },
  computed: {
    totalSalary() {
      return this.users.reduce((total, user) => total + user.luong, 0);
    },
  },
  methods: {
    openEditModal(user) {
      this.selectedUserId = user.id;
      this.email = user.email;
      this.quyen = user.quyen.id; // Assuming user.quyen is an object with an id property
      this.luong = user.luong;
      this.showModal = true;
      this.editMode = true;
    },
    async updateNhanVien() {
      try {
        const token = await this.$store.getters.getToken;
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };

        const update_nhan_vien = await axios.patch(
          API.update_nhan_vien + `/${this.selectedUserId}`,
          {
            quyen: this.quyen,
            luong: this.luong,
          },
          { headers }
        );

        console.log("tra ve: ", update_nhan_vien);
        this.showModal = false;
        await this.fetchNhanVien();
        this.editMode = false;
      } catch (error) {
        console.error("Error updating Nhan Vien:", error);
      }
    },
    formatNumber(number) {
      return chuyenDoiSoThanhChuoi(number);
    },
    openModal() {
      this.showModal = true;
    },
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

    async CreateNhanVien() {
      try {
        const token = await this.$store.getters.getToken;
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const create_nhan_vien = await axios.post(
          API.create_nhan_vien,
          {
            email: this.email,
            quyen: this.quyen,
            luong: this.luong,
          },
          { headers }
        );
        console.log("tra ve: ", create_nhan_vien);
        this.showModal = false;
        await this.fetchNhanVien();
      } catch (error) {
        console.error("Error creating Nhan Vien:", error);
      }
    },
    async deleteNhanVien(email) {
      try {
        const token = await this.$store.getters.getToken;
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const create_nhan_vien = await axios.post(
          API.create_nhan_vien,
          {
            email: email,
            quyen: 5,
            luong: 0,
          },
          { headers }
        );
        console.log("tra ve: ", create_nhan_vien);
        await this.fetchNhanVien();
      } catch (error) {
        console.error("Error creating Nhan Vien:", error);
      }
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
