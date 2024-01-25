<template lang="">
     <h2 style="margin-bottom: 30px">BẢNG LƯƠNG NHÂN VIÊN</h2>
  <div><h3>Lương của nhân viên: {{ formatNumber(luong) }}</h3></div>
</template>
<script>
import axios from 'axios';
import { chuyenDoiSoThanhChuoi } from "../../core/chuyenDoiSoThanhChuoi";
export default {
  data() {
    return {
      users: [],
      luong: null
    };
  },
  async mounted() {
    // Thực hiện gọi API khi component được mount
    await this.fetchUserData();
  },
  methods: {
    formatNumber(number) {
    if (number !== null) {
      return chuyenDoiSoThanhChuoi(number);
    } else {
      // Handle the case where luong is null
      return ""; // Or any default value or message
    }
  },
    async fetchUserData() {
      try {
        console.log("asasas")
        const apiUrl = "http://localhost:8000/api/user";
        const token = await this.$store.getters.getToken;
        // Replace the token with your actual Authorization token

        const response = await axios.get(apiUrl, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle the response data as needed
        console.log("User data:", response.data[0].luong);
        this.luong = response.data[0].luong
      } catch (error) {
        // Handle errors
        console.error("Error fetching user data:", error);
      }
    },
  },
};
</script>
<style lang=""></style>
