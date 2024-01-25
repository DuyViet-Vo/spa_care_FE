<template lang="">
  <h2 style="margin-bottom: 30px">Chi tiết lịch hẹn</h2>
  <div>
    <table class="table table-bordered mt-4">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Dịch Vụ</th>
          <th scope="col">Nhân viên</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Ghi chú</th>
          <th scope="col">Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, id) in appointmentDetail" :key="id">
          <th scope="row">{{ id + 1 }}</th>
          <td>{{ appointment.dich_vu.ten_dich_vu }}</td>
          <td>{{ appointment.nhan_vien?.ho_ten }}</td>
          <td>{{ appointment.trang_thai }}</td>
          <td>{{ appointment.ghi_chu }}</td>
          <td v-if="appointment.trang_thai !== 'Đang Thực Hiện'">
            <button class="btn btn-info btn-sm" @click="openModal(appointment)">
              Thực hiện
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Sử dụng modalAppointment để hiển thị modal cụ thể -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h2 class="text-center">Chọn nhân viên thực hiện</h2>
        <label for="category" class="mt-4">Chọn nhân viên: </label>
        <select id="category" v-model="nhan_vien">
          <option
            v-for="(nhan_vien, index) in list_nhan_vien"
            :key="index"
            :value="nhan_vien.id"
          >
            {{ nhan_vien.ho_ten }}
          </option>
        </select>
        <label for="description" class="mt-2">Ghi chú:</label>
        <textarea id="description" v-model="ghi_chu"></textarea>
        <div class="mt-4">
          <button
            type="button"
            class="btn btn-primary mr-3"
            @click="UpdateChiTiet(modalAppointment.id)"
          >
            Lưu
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
</template>
<script>
import axios from "axios";
import API from "@/api";
export default {
  data() {
    return {
      appointmentDetail: null,
      showModal: false,
      modalAppointment: null,
      list_nhan_vien: [],
      nhan_vien: null,
      ghi_chu: "",
    };
  },
  mounted() {
    // Gọi API chi tiết lịch hẹn khi component được mount
    this.fetchAppointmentDetail();
  },
  async created() {
    try {
      await this.fetchNhanVien();
    } catch (error) {
      console.error("Lỗi trong hook created:", error);
    }
  },
  methods: {
    openModal(appointment) {
      console.log("có lấy đc id", appointment);
      if (appointment) {
        this.modalAppointment = appointment;
        this.showModal = true;
      }
    },
    // hiển thị thông tin
    async fetchAppointmentDetail() {
      try {
        const token = await this.$store.getters.getToken; // Thay thế bằng token của bạn
        const response = await axios.get(
          `${API.get_lich_hen}/${this.$route.params.id}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(
          "response.data.chi_tiet_lich_hen",
          response.data.chi_tiet_lich_hen
        );
        this.appointmentDetail = response.data.chi_tiet_lich_hen;
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết lịch hẹn:", error);
      }
    },
    // hiển thị nhan viên
    async fetchNhanVien() {
      try {
        const token = await this.$store.getters.getToken;
        const response_nhan_vien = await axios.get(
          API.get_nhan_vien + "?quyen=2",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("nhan vien: ", response_nhan_vien.data);
        this.list_nhan_vien = response_nhan_vien.data;
      } catch (error) {
        console.log("loi: ", error);
      }
    },
    // Update chi tiết lịch hẹn
    async UpdateChiTiet(id) {
      try {
        console.log("nhân vien: ", this.nhan_vien);
        const token = await this.$store.getters.getToken;
        const requestData = {
          trang_thai: "Đang Thực Hiện",
          nhan_vien: this.nhan_vien,
          ghi_chu: this.ghi_chu,
        };
        const response_chi_tiet = await axios.get(
          API.get_chi_tiet_lich_hen + "/" + id,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("lichhen: ", response_chi_tiet.data.lich_hen);
        const id_lich_hen = response_chi_tiet.data.lich_hen;

        const response_update = await axios.patch(
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
        this.showModal = false;
        await this.fetchAppointmentDetail();
        const url = "http://localhost:8000/api/send-email/thuc-hien";
        const data = {
          id_chi_tiet: id,
        };
        const response = await axios.post(url, data, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("loi : ", error);
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
