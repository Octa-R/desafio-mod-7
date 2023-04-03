import { Router } from "@vaadin/router";
import { state } from "../state";

class MisMascotasReportadasPage extends HTMLElement {
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

  render() {
    const cs = state.getState()
    this.innerHTML = `
    <nav-bar activeMenu="mis-mascotas-reportadas"></nav-bar>
    <div class="container mx-auto px-12 h-screen flex flex-col justify-center gap-y-4 py-16 items-center">
    
      <p class="text-4xl text-center font-bold subpixel-antialiased self-center mb-auto mt-24">
        Mis mascotas reportadas
      </p>

      <x-btn name="change-data" text="Modificar datos personales" color="indigo"></x-btn>

      <x-btn name="change-password" text="Modificar contraseña" color="indigo"></x-btn>

      <div class="mt-auto w-full text-center" >
        <p class="font-bold text-xl ">${cs.email}</p>
        <p class="font-bold text-xl cursor-pointer text-indigo-700 hover:text-indigo-800">Cerrar sesión</p>
      </div>

    </div>
    `;
  }
}

export { MisMascotasReportadasPage }