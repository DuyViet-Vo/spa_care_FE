const user = [
    {
        path: "/user",
        component: () => import("@/layouts/User.vue"),
        children: [
            {
                path: "/user/trang-chu",
                name: "trang-chu",
                component: () => import("@/pages/user/ProductList.vue")
            },
            {
                path: "/user/lich-hen",
                name: "lich-hen",
                component: () => import("@/pages/user/LichHen.vue")
            },
            {
                path: "/user/login",
                name: "login",
                component: () => import("@/pages/user/Login.vue")
            },
            {
                path: "/user/register",
                name: "Register",
                component: () => import("@/pages/user/Register.vue")
            }
        ]
    },
]
export default user;