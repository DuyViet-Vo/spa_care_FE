const user = [
    {
      path: "/le-tan",
      component: () => import("@/layouts/LeTan.vue"),
      children: [
        {
          path: "/le-tan/khach-hang",
          name: "lt-khach-hang",
          component: () => import("@/pages/le_tan/LeTanKhachHang.vue"),
        },
      ],
    },
  ];
  export default user;
  