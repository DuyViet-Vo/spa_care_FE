const user = [
    {
        path: "/user",
        component: () => import("@/layouts/User.vue"),
        children: [
            {
                path: "/trang-chu",
                name: "trang-chu",
                component: () => import("@/pages/user/ProductList.vue")
            },
            {
                path: "/lich-hen",
                name: "lich-hen",
                component: () => import("@/pages/user/LichHen.vue")
            }
        ]
    }
]
export default user;