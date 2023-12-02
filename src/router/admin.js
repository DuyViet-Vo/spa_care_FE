const admin = [
    {
        path: "/admin",
        component: () => import("@/layouts/Admin.vue"),
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("@/pages/admin/Products.vue")
            }
        ]
    }
]
export default admin;