import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin.js";
import user from "./user.js";
import le_tan from "./le_tan.js";
import nhan_vien from "./nhan_vien.js";

const routes = [...admin, ...user, ...le_tan, ...nhan_vien];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
