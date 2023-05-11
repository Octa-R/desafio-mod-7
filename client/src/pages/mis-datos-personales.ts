import { Router } from "@vaadin/router";
import { state } from "../state";

class MisDatosPersonalesPage extends HTMLElement {
  userIsLoggedIn: boolean
  constructor() {
    super();
    this.userIsLoggedIn = state.getState().userIsLoggedIn
    
  }
  
  connectedCallback() {
    // si esta logueado se buscan sus datos y se guardan
    // en el state y luego se renderiza la page
    !!this.userIsLoggedIn
    
    state.getDatosPersonales().then(() => {
      this.render();
    })
  }

  addListeners() {
    const form = this.querySelector("form")
    form?.addEventListener("submit", (evt) => {
      evt.preventDefault()
      const fullname = form.querySelector<HTMLInputElement>("#name")?.value
      const localidad = form.querySelector<HTMLInputElement>("#localidad")?.value
      if (!fullname || !localidad) {
        return
      }
      const cs = state.getState()
      if (!!this.userIsLoggedIn) {
        state.updateDatosPersonales({ fullname, localidad })
      } else if (!this.userIsLoggedIn) {
        state.signup({
          email: cs.email,
          password: cs.password,
          fullname: fullname,
          localidad
        }).then(() => {
          Router.go("/")
        })
      }
    })
  }

  render() {
    const cs = state.getState()
    console.log("cs en mis-datos-personales", cs)
    this.innerHTML = `
    <nav-bar activeMenu="mis-datos-personales"></nav-bar>
    <div class="container mx-auto px-12 h-screen flex flex-col justify-center gap-y-4 py-16 items-center">

      <p class="text-4xl text-center font-bold subpixel-antialiased self-center mb-auto mt-24">
        Mis datos personales
      </p>

      <form id="datos-form" class="w-full flex flex-col justify-center items-center basis-8/12" >

        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-semibold mb-2">Nombre</label>
          <input 
            ${this.userIsLoggedIn && `value="${cs.fullname}"`} 
            type="text"
            id="name"
            name="name"
            class="
              w-72 md:w-96 px-4 py-2 
              border border-gray-300 rounded 
              focus:outline-none focus:border-blue-500 
              shadow-md
              " 
            required>
        </div>

        <div class="mb-4">
          <label for="localidad" class="block text-gray-700 font-semibold mb-2">Localidad</label>
          <input 
            ${this.userIsLoggedIn && `value="${cs.localidad}"`}
            type="text"
            id="localidad"
            name="localidad"
            class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 shadow-md w-72 md:w-96" required>
        </div>

        <x-btn class="mt-auto"  text="Guardar" color="indigo"></x-btn>
      </form>
    </div>
    `;
    this.addListeners()
    // !!this.userIsLoggedIn && this.readUserData()
  }

}

export { MisDatosPersonalesPage }
