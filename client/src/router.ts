import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("app"));
router.setRoutes([
	{ path: "/", component: "home-page" },
	{ path: "/register", component: "register-page" },
	{ path: "/login", component: "login-page" },
	{ path: "/mis-datos", component: "mis-datos" },
	{ path: "/cambiar-password", component: "cambiar-password" },
	{ path: "/mis-datos-personales", component: "mis-datos-personales" },
	{ path: "/mis-mascotas-reportadas", component: "mis-mascotas-reportadas" },
	{ path: "/reportar-mascota", component: "reportar-mascota" },
	{ path: "/editar-reporte-mascota", component: "editar-reporte-mascota" },
	{ path: "/home-mascotas", component: "home-mascotas" },
]);
