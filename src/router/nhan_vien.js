const nhan_vien = [
    {
      path: "/nhan-vien",
      component: () => import("@/layouts/NhanVien.vue"),
      children: [
        {
          path: "/nhan-vien/cong-viec",
          name: "nv-cong-viec",
          component: () => import("@/pages/nhan_vien/CongViec.vue"),
        },
        {
          path: "/nhan-vien/cong-viec-da-hoan-thanh",
          name: "nv-cong-viec-da-hoan-thanh",
          component: () => import("@/pages/nhan_vien/CongViecDaLam.vue"),
        },
        {
          path: "/nhan-vien/luong",
          name: "nv-luong",
          component: () => import("@/pages/nhan_vien/Luong.vue"),
        },
      ],
    },
  ];
  export default nhan_vien;
  