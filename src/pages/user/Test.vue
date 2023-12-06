<template>
  <div>
    <input type="file" ref="fileInput" @change="handleImageChange" />
    <button @click="uploadImage">Upload Image</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleImageChange() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      if (file) {
        this.convertImageToBase64(file);
      }
    },
    convertImageToBase64(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = e.target.result;
        this.imageBase64 = base64String;
      };

      reader.readAsDataURL(file);
    },
    uploadImage() {
      // Gửi dữ liệu hình ảnh dưới dạng base64 đến API ở đây
      // Sử dụng axios hoặc fetch để thực hiện yêu cầu HTTP
      // Ví dụ sử dụng axios:
      // axios.post('url_api', { image: this.imageBase64 })
      //   .then(response => {
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    },
  },
  data() {
    return {
      imageBase64: null,
    };
  },
};
</script>
<style></style>
