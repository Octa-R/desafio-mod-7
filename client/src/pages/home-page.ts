import { Router } from "@vaadin/router";
import { state } from "../state";
class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  addListeners() {
    this.querySelector("#geoloc-btn")?.addEventListener("click", () => {
      state.setCurrentPosition().then(res => {
        console.log(res)
        if (res) {
          Router.go("/home-mascotas")
        }
      })
    })
    this.querySelector("#como-func-btn")?.addEventListener("click", () => {
      console.log("como funciona");

    })
  }

  render() {
    this.innerHTML = `
    <nav-bar></nav-bar>
    <div class="container mx-auto px-12 h-screen flex flex-col justify-center gap-y-4 py-16 items-center">

      <p class="text-8xl text-center font-bold text-orange-600 subpixel-antialiased my-8">
        Pet Finder
      </p>

      <p class="text-2xl text-justify my-8 ">
        Encontrá y reporta mascotas perdidas cerca de tu ubicación
      </p>

      <x-btn text="Dar mi ubicacion actual" color="blue" id="geoloc-btn"></x-btn>

      <x-btn text="Como funciona Pet Finder?" color="green" id="como-func-btn"></x-btn>
    </div>
    `;
    this.addListeners()
  }
}

export { HomePage }
