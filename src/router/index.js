import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin.js";
import user from "./user.js";
import le_tan from "./le_tan.js";

const routes = [...admin, ...user, ...le_tan];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
