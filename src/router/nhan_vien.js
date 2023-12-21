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
      ],
    },
  ];
  export default nhan_vien;
  