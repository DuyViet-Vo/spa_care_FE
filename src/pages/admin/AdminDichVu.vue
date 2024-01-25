<template>
  <div>
    <h2 style="margin-bottom: 30px">Dịch vụ</h2>
    <button
      type="button"
      class="btn btn-primary mt-2"
      @click="showAddServiceModal = true"
    >
      Thêm dịch vụ
    </button>
    <div style="margin-top: 20px">
      <input type="text" v-model="searchQuery" placeholder="Nhập tên " />
      <button class="btn btn-primary" style="margin-left: 30px">
        Tìm kiếm
      </button>
    </div>

    <!-- Hộp hiển thị khi thêm dịch vụ -->
    <div v-if="showAddServiceModal" class="overlay">
      <div class="add-service-modal">
        <div>
          <h2>Thêm dịch vụ</h2>
          <form @submit.prevent="saveService">
            <label for="image" class="mt-4">Hình ảnh:</label>
            <input
              type="file"
              id="image"
              @change="handleImageChange"
              accept="image/*"
            />
            <br />
            <label for="serviceName" class="mt-4">Tên dịch vụ:</label>
            <input type="text" id="serviceName" v-model="service.name" />
            <br />
            <label for="description" class="mt-5">Mô tả:</label>
            <textarea id="description" v-model="service.description"></textarea>
            <br />
            <label for="price" class="mt-4">Giá:</label>
            <input type="number" id="price" v-model="service.price" />
            <br />
            <label for="price" class="mt-4">Thời gian thực hiện:</label>
            <input type="number" id="price" v-model="service.time" />
            <br />
            <label for="category" class="mt-4">Danh mục:</label>
            <select id="category" v-model="service.category">
              <option
                v-for="(category, index) in categories"
                :key="index"
                :value="category.id"
              >
                {{ category.ten_danh_muc }}
              </option>
            </select>
            <br />
            <button @click="cancelAddService" class="btn btn-secondary mt-3">
              Hủy
            </button>
            <button
              type="submit"
              class="btn btn-primary mt-3"
              style="margin-left: 20px"
              @click="saveDichVu"
            >
              Thêm
            </button>
          </form>
        </div>
      </div>
    </div>

    <table class="table table-bordered table-responsive mt-4">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Hình ảnh</th>
          <th scope="col">Tên dịch vụ</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Giá</th>
          <th scope="col" style="width: 120px">Thời gian thực hiện(giờ)</th>
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
          <td>
            <button class="btn btn-info btn-sm">Sửa</button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteDichVu(appointment.id)"
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

export default {
  data() {
    return {
      appointments: [],
      showAddServiceModal: false,
      service: {
        image: null,
        name: "",
        description: "",
        price: null,
        category: "",
        time: null,
      },
      categories: [],
    };
  },
  async created() {
    try {
      await this.fetchDichVu();
      await this.fetchDanhMuc();
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
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    async fetchDanhMuc() {
      try {
        const token = await this.$store.getters.getToken;
        const response_danh_muc = await axios.get(API.get_danh_muc, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        this.categories = response_danh_muc.data.results;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    async saveDichVu() {
      try {
        const result_dich_vu = await axios.post(
          API.get_dich_vu,
          {
            hinh_anh: this.service.image,
            ten_dich_vu: this.service.name,
            mo_ta: this.service.description,
            gia: this.service.price,
            thoi_gian_thuc_hien: this.service.time,
            danh_muc: this.service.category,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        // Xử lý kết quả theo cần thiết
        console.log("Kết quả từ saveDichVu:", result_dich_vu);
        this.cancelAddService();
        await this.fetchDichVu();
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    cancelAddService() {
      this.showAddServiceModal = false;
    },
    async handleImageChange(event) {
      const input = event.target;
      const file = input.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          // Lưu chuỗi base64 vào data property
          this.service.image = e.target.result;
        };

        // Đọc ảnh và chuyển đổi thành base64
        reader.readAsDataURL(file);
      }
    },

    async deleteDichVu(appointmentId) {
      try {
        const token = await this.$store.getters.getToken;
        const result = await axios.delete(
          `${API.get_dich_vu}/${appointmentId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await this.fetchDichVu();
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-service-modal {
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 9999;
}
</style>
