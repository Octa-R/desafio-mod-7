import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("app"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/register", component: "register-page" },
  { path: "/login", component: "login-page" },
  { path: "/mis-datos", component: "mis-datos" },
  { path: "/mis-mascotas-reportadas", component: "mis-mascotas-reportadas" },
  { path: "/reportar-mascota", component: "reportar-mascota" },
]);
