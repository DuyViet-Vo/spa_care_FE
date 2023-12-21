<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Nhập tên khách hàng..."
    />
    <button
      class="btn btn-primary"
      @click="searchAppointments"
      style="margin-left: 30px"
    >
      Tìm kiếm
    </button>
  </div>
  <div>
    <table class="table table-bordered mt-4">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Khách hàng</th>
          <th scope="col">Nhân viên</th>
          <th scope="col">Dịch vụ</th>
          <th scope="col">Trạng thái dịch vụ</th>
          <th scope="col">Thời giạn hẹn</th>
          <th scope="col">Tiền cọc</th>
          <th scope="col">Tổng tiền</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, id) in appointments" :key="id">
          <th scope="row">{{ id + 1 }}</th>
          <td>{{ appointment.khach_hanh.ho_ten }}</td>
          <td>{{ appointment.nhan_vien?.ho_ten }}</td>
          <td>
            <ul>
              <li
                v-for="(service, serviceIndex) in appointment.chi_tiet_lich_hen"
                :key="serviceIndex"
              >
                {{ service.dich_vu.ten_dich_vu }}
              </li>
            </ul>
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
          <td>{{ formatDateTime(appointment.thoi_gian_hen) }}</td>
          <td>{{ appointment.tien_coc }}</td>
          <td>{{ appointment.tong_tien }}</td>
          <td>{{ appointment.trang_thai }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="openModal(appointment)">
              Duyệt
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteAppointment(appointment.id)"
            >
              Xoá
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Sử dụng modalAppointment để hiển thị modal cụ thể -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h2 class="text-center">Duyệt lịch hẹn</h2>
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
        <div class="mt-4">
          <button
            type="button"
            class="btn btn-primary mr-3"
            @click="duyetLichHen(modalAppointment.id)"
          >
            Duyệt
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

export default {
  data() {
    return {
      appointments: [],
      showModal: false,
      modalAppointment: null,
      nhan_vien: null,
      list_nhan_vien: [],
      searchQuery: "",
    };
  },

  async created() {
    try {
      await this.fetchLichHen();
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
    async duyetLichHen(id) {
      try {
        console.log("nhan vien: ", this.nhan_vien);
        const token = await this.$store.getters.getToken;
        const requestData = {
          trang_thai: "Đã Duyệt",
          nhan_vien: this.nhan_vien,
        };
        const response_duyet = await axios.patch(
          API.get_lich_hen + "/" + id,
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
        await this.fetchLichHen();
      } catch (error) {
        console.log("loi : ", error);
      }
    },
    async fetchNhanVien() {
      try {
        const token = await this.$store.getters.getToken;
        const response_nhan_vien = await axios.get(API.get_nhan_vien, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("nhan vien: ", response_nhan_vien.data);
        this.list_nhan_vien = response_nhan_vien.data;
      } catch (error) {
        console.log("loi: ", error);
      }
    },
    async fetchLichHen() {
      try {
        const token = await this.$store.getters.getToken;
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(API.get_lich_hen, {
          headers,
        });
        console.log("lich hen: ", response.data.results);
        this.appointments = response.data.results;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
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
    //gọi api xoá lịch hẹn
    async deleteAppointment(id) {
      const isConfirmed = await Swal.fire({
        title: "Bạn có chắc chắn không?",
        text: "Một khi đã xoá, bạn sẽ không thể khôi phục lại lịch hẹn này!",
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
        } catch (error) {
          console.error("Lỗi khi xoá lịch hẹn:", error);
        }
      }
    },
    // gọi api tìm kiếm lịch hẹn
    async searchAppointments() {
      try {
        const token = await this.$store.getters.getToken;
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${API.get_lich_hen}?search=${this.searchQuery}`,
          {
            headers,
          }
        );

        this.appointments = response.data.results;
      } catch (error) {
        console.error("Lỗi khi tìm kiếm lịch hẹn:", error);
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
