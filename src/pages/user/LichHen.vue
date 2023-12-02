<template>
    <div class ="body">
        <div class="appointment-form">
    <h2>Đặt Lịch Hẹn</h2>
    <form>
      <div class="form-group">
        <label for="name">Họ và Tên:</label>
        <input type="text" id="name" name="name" required>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>

      <div class="form-group">
        <label for="date">Ngày Hẹn:</label>
        <input type="date" id="date" name="date" required>
      </div>

      <div class="form-group">
        <label for="time">Thời Gian Hẹn:</label>
        <input type="time" id="time" name="time" required>
      </div>

      <button type="submit">Đặt Lịch</button>
    </form>
  </div>
    </div>
</template>
<script>
export default {
    name: "LichHen",
    components: {

    },
}
</script>
<style>
    .body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .appointment-form {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }

    button {
      background-color: #3498db;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
</style>