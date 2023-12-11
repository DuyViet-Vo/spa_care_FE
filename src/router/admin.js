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
      {
        path: "/admin/dich-vu",
        name: "admin-dich-vu",
        component: () => import("@/pages/admin/AdminDichVu.vue"),
      },
      {
        path: "/admin/san-pham",
        name: "admin-san-pham",
        component: () => import("@/pages/admin/AdminSanPham.vue"),
      },
      {
        path: "/admin/nhan-vien",
        name: "admin-nhan-vien",
        component: () => import("@/pages/admin/AdminNhanVien.vue"),
      },
      {
        path: "/admin/khach-hang",
        name: "admin-khach-hang",
        component: () => import("@/pages/admin/AdminKhachHang.vue"),
      },
    ],
  },
];
export default admin;
