const user = [
  {
    path: "/user",
    component: () => import("@/layouts/User.vue"),
    children: [
      {
        path: "/user/test",
        name: "test",
        component: () => import("@/pages/user/Test.vue"),
      },
      {
        path: "/user/trang-chu",
        name: "trang-chu",
        component: () => import("@/pages/user/ProductList.vue"),
      },
      {
        path: "/user/lich-hen",
        name: "lich-hen",
        component: () => import("@/pages/user/LichHen.vue"),
      },
      {
        path: "/user/login",
        name: "login",
        component: () => import("@/pages/user/Login.vue"),
      },
      {
        path: "/user/register",
        name: "Register",
        component: () => import("@/pages/user/Register.vue"),
      },
      {
        path: "/user/san-pham",
        name: "san-pham",
        component: () => import("@/pages/user/SanPham.vue"),
      },
      {
        path: "/user/dich-vu",
        name: "dich-vu",
        component: () => import("@/pages/user/DichVu.vue"),
      },
      {
        path: "/user/chi_tiet_lich_hen",
        name: "chi-tiet-lich-hen",
        component: () => import("@/pages/user/ChiTietLichHen.vue"),
      },
    ],
  },
];
export default user;
