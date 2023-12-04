<template>
  <Sidebar></Sidebar>
  <router-view></router-view>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Admin",
  components: {
    Sidebar,
  },
};
</script>
<style></style>
