import "./components"
import './pages';
import "./router";
import "./index.css"
import { Router } from "@vaadin/router"
// import axios from "axios"

async function main() {

  Router.go(location.pathname)

}

main()
