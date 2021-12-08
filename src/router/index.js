import Vue from "vue";
import Router from "vue-router";

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
    component: () => import(`../components/${route.component}.vue`)
  };
});

Vue.use(Router);

export default new Router({
  mode: "history",
  routes
});
