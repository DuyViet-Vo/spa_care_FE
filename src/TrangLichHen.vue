<template>
   <main>
      <Header></Header>
      <LichHen></LichHen>
      <Footer></Footer>
    </main>
</template>
<script>
import Header from "./components/Header.vue";
import LichHen from "./pages/user/LichHen.vue"
import Footer from "./components/Footer.vue";


export default {
    name: 'TrangLichHen',
    components: {
      Header,
      LichHen,
      Footer,
    },
};
</script>
<style lang=""></style>
