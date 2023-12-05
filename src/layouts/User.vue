<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "TrangChu",
  components: {
    Header,
    Footer,
  },
};
</script>
<style></style>
