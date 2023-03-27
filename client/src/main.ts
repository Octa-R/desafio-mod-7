import "./components"
import './pages';
import "./router";
import "./index.css"
import { state } from "./state";
import { Router } from "@vaadin/router"
// import axios from "axios"

async function main() {
  state.init()
  Router.go(location.pathname)

  // const http = axios.create({
  //   baseURL: 'http://localhost:3000',
  //   timeout: 25000,
  //   headers: { 'Content-Type': 'application/json' }
  // });
  // http.get("/test").then((i: any) => console.log(i))

}

main()
