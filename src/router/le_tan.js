const le_tan = [
    {
      path: "/le-tan",
      component: () => import("@/layouts/LeTan.vue"),
      children: [
        {
          path: "/le-tan/khach-hang",
          name: "lt-khach-hang",
          component: () => import("@/pages/le_tan/LeTanKhachHang.vue"),
        },
        {
          path: "/le-tan/chi-tiet-lich-hen/:id",
          name: "chi_tiet_lich_hen",
          component: () => import("@/pages/le_tan/ChiTietLichHen.vue"),
        },
      ],
    },
  ];
  export default le_tan;
  