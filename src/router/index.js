import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerOptions = [
    { path: "/", component: "Home" },
    { path: "/inbound", component: "Inbound" },
    { path: "/production", component: "Production" },
    // { path: "/outbound", component: "Home", meta: { requiresAuth: true } },
    { path: "/outbound", component: "Outbound" },
    { path: "/cockpit", component: "Cockpit" },
    { path: "/notifications", component: "Notifications" },
    { path: "/settings", component: "Settings" },
    { path: "/help", component: "Help" },
    { path: "*", component: "NotFound" }
];
  
const routes = routerOptions.map(route => {
    return {
        ...route,
        component: () => import(`../views/${route.component}.vue`)
    };
});

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;
