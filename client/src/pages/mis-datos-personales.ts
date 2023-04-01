import { Router } from "@vaadin/router";
import { state } from "../state";
class MisDatosPersonalesPage extends HTMLElement {
  constructor() {
    super();

  }

  connectedCallback() {
    this.render();
  }

  addListeners() {
    const form = this.querySelector("form")
    form?.addEventListener("submit", (evt) => {
      evt.preventDefault()
      console.log("asdasd")
    })
  }

  render() {
    const cs = state.getState()
    this.innerHTML = `
    <nav-bar activeMenu="mis-datos-personales"></nav-bar>
    <div class="container mx-auto px-12 h-screen flex flex-col justify-center gap-y-4 py-16 items-center">

      <p class="text-4xl text-center font-bold subpixel-antialiased self-center mb-auto mt-24">
        Mis datos personales
      </p>

      <form id="datos-form" class="basis-3/4 h-full w-full flex flex-col" >

        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-semibold mb-2">Nombre</label>
          <input type="text" id="name" name="name" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 shadow-md" required>
        </div>

        <div class="mb-4">
          <label for="localidad" class="block text-gray-700 font-semibold mb-2">Localidad</label>
          <input 
            type="text"
            id="localidad"
            name="localidad"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 shadow-md" required>
        </div>

        <x-btn class="mt-auto"  text="guardar" color="indigo"></x-btn>
      </form>
    </div>
    `;
    this.addListeners()
  }
}

export { MisDatosPersonalesPage }
