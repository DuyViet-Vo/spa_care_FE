<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Khách hàng</th>
          <th scope="col">Nhân viên</th>
          <th scope="col">Dịch vụ</th>
          <th scope="col">Thời giạn hẹn</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, index) in appointments" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ appointment.customer }}</td>
          <td>{{ appointment.employee }}</td>
          <td>
            <ul>
              <li
                v-for="(service, serviceIndex) in appointment.services"
                :key="serviceIndex"
              >
                {{ service }}
              </li>
            </ul>
          </td>
          <td>{{ appointment.appointmentTime }}</td>
          <td>{{ appointment.status }}</td>
          <td>
            <button @click="approveAppointment(index)">Duyệt</button>
            <button @click="viewDetails(index)">Xem chi tiết</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointments: [],
    };
  },
  created() {
    // Gọi API để lấy dữ liệu và đổ vào appointments
    this.fetchAppointments();
  },
  methods: {
    fetchAppointments() {
      // Gọi API ở đây và sau đó cập nhật giá trị của appointments
      // Ví dụ giả định:
      // axios.get('url/api/appointments').then(response => {
      //   this.appointments = response.data;
      // });

      // Một ví dụ giả định với dữ liệu cứng
      this.appointments = [
        {
          customer: "Viẹt",
          employee: "",
          services: ["1111", "2222"],
          appointmentTime: "10h20",
          status: "chưa duyệt",
        },
        // Các bản ghi khác nếu có
      ];
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
