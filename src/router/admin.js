const admin = [
  {
    path: "/admin",
    component: () => import("@/layouts/Admin.vue"),
    children: [
      {
        path: "/admin/home",
        name: "home",
        component: () => import("@/pages/admin/Home.vue"),
      },
      {
        path: "/admin/lich-hen",
        name: "admin-lich-hen",
        component: () => import("@/pages/admin/AdminLichHen.vue"),
      },
    ],
  },
];
export default admin;
