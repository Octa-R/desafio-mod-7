import "./components"
import './pages';
import "./router";
import "materialize-css"
import "materialize-css/dist/css/materialize.min.css"
import { Router } from "@vaadin/router"
import axios from "axios"

async function main() {
  await axios.get("https://fakestoreapi.com/products")

  Router.go(location.pathname)

}

main()
