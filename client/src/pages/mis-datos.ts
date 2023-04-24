import { Router } from "@vaadin/router";
import { state } from "../state";

class MisDatosPage extends HTMLElement {
  constructor() {
    super();
    const cs = state.getState()

    if (!cs.userIsLoggedIn) {
      Router.go("/login")
    }
  }

  connectedCallback() {
    this.render();
  }
  listeners() {
    const container = this.querySelector(".container")
    container?.addEventListener("change-data", () => {
      console.log("change data")
      Router.go("/mis-datos-personales")

    })
    container?.addEventListener("change-password", () => {
      console.log("change pass")
      Router.go("/cambiar-password")
    })
  }
  render() {
    const cs = state.getState()
    this.innerHTML = `
    <nav-bar activeMenu="mis-datos"></nav-bar>
    <div class="container mx-auto px-12 h-screen flex flex-col justify-center gap-y-4 py-16 sm:max-w-lg">

      <p class="text-4xl text-center font-bold subpixel-antialiased self-center mb-auto mt-24">
        Mis Datos
      </p>

      <x-btn name="change-data" text="Modificar datos personales" color="indigo"></x-btn>

      <x-btn name="change-password" text="Modificar contraseña" color="indigo"></x-btn>

      <div class="mt-auto w-full text-center" >
        <p class="font-bold text-xl ">${cs.email}</p>
        <p class="font-bold text-xl cursor-pointer text-indigo-700 hover:text-indigo-800">Cerrar sesión</p>
      </div>

    </div>
    `;
    this.listeners()
  }
}

export { MisDatosPage }