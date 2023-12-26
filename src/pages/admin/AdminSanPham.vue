<template>
  <div>
    <h2 style="margin-bottom: 30px;">Sản phẩm</h2>
    <button
      type="button"
      class="btn btn-primary mt-2"
      @click="showAddServiceModal = true"
    >
      Thêm sản phẩm
    </button>

    <!-- Hộp hiển thị khi thêm dịch vụ -->
    <div v-if="showAddServiceModal" class="overlay">
      <div class="add-service-modal">
        <div>
          <h2>Thêm sản phẩm</h2>
          <form @submit.prevent="saveProduct">
            <label for="image" class="mt-4">Hình ảnh:</label>
            <input
              type="file"
              id="image"
              @change="handleImageChange"
              accept="image/*"
            />
            <br />
            <label for="serviceName" class="mt-4">Tên sản phẩm:</label>
            <input
              type="text"
              id="serviceName"
              v-model="product.ten_san_pham"
            />
            <br />
            <label for="description" class="mt-5">Mô tả:</label>
            <textarea id="description" v-model="product.mo_ta"></textarea>
            <br />
            <label for="price" class="mt-4">Giá:</label>
            <input type="number" id="price" v-model="product.gia" />
            <br />
            <label for="price" class="mt-4">Số lượng:</label>
            <input type="number" id="price" v-model="product.so_luong" />
            <br />
            <label for="category" class="mt-4">Danh mục:</label>
            <select id="category" v-model="product.danh_muc">
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
              @click="saveSanPham"
            >
              Thêm
            </button>
          </form>
        </div>
      </div>
    </div>

    <table class="table table-bordered mt-4">
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
          <td>
            <button class="btn btn-info btn-sm">Sửa</button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteSanPham(appointment.id)"
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
      product: {
        hinh_anh: null,
        ten_san_pham: "",
        mo_ta: "",
        gia: null,
        so_luong: "",
        danh_muc: null,
      },
      categories: [],
    };
  },
  async created() {
    try {
      await this.fetchSanPham();
      await this.fetchDanhMuc();
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

    async saveSanPham() {
      try {
        const result_san_pham = await axios.post(
          API.get_san_pham,
          {
            hinh_anh: this.product.hinh_anh,
            ten_san_pham: this.product.ten_san_pham,
            mo_ta: this.product.mo_ta,
            gia: this.product.gia,
            so_luong: this.product.so_luong,
            danh_muc: this.product.danh_muc,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        console.log("Kết quả từ san pham:", result_san_pham);
        await this.fetchSanPham();
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
          this.product.hinh_anh = e.target.result;
        };

        // Đọc ảnh và chuyển đổi thành base64
        reader.readAsDataURL(file);
      }
    },

    async deleteSanPham(appointmentId) {
      try {
        const token = await this.$store.getters.getToken;
        const result = await axios.delete(
          `${API.get_san_pham}/${appointmentId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await this.fetchSanPham();
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
