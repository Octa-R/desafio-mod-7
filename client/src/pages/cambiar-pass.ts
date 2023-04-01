import { Router } from "@vaadin/router";
import { state } from "../state";
class CambiarPassword extends HTMLElement {
  constructor() {
    super();

  }

  connectedCallback() {
    this.render();
  }

  addListeners() {

  }

  render() {
    const cs = state.getState()
    this.innerHTML = `
    <nav-bar activeMenu="mis-datos-personales"></nav-bar>
    <div class="container mx-autopx-12 h-screen flex flex-col justify-center content-center py-16">

      <p class="text-4xl text-center font-bold text-orange-600 subpixel-antialiased my-4">
        Mis datos personales
      </p>

      <div class="container mx-auto">
        <div class="max-w-md mx-auto bg-transparent p-8 ">
            <form id="datos-form">
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
                <div>
                </div>
                <div class="mt-8">
                  <button type="submit" class="bg-indigo-600 w-full shadow-md hover:bg-blue-800 text-white font-bold py-2 px-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ">
                    Guardar
                  </button>
                </div>
            </form>
        </div>
    </div>
    `;
    this.addListeners()
  }
}

export { CambiarPassword }
