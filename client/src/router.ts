import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("app"));
router.setRoutes([
  { path: "/", component: "home-page" }
]);