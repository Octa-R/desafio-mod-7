import "./components"
import './pages';
import "./router";
import "./index.css"
import { state } from "./state";
import { Router } from "@vaadin/router"

async function main() {
  state.init()
  Router.go(location.pathname)
}

main()
