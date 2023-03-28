import { state } from "../state";
class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  addListeners() {
    this.querySelector("#geoloc-btn")?.addEventListener("click", (e) => {
      state.setCurrentPosition()
    })
  }

  render() {
    this.innerHTML = `
    <nav-bar></nav-bar>
    <div class="container mx-auto px-12 h-screen flex flex-col justify-center gap-y-4 py-16">

      <p class="text-8xl text-center font-bold text-orange-600 subpixel-antialiased my-8">
        Pet Finder
      </p>

      <p class="text-2xl text-justify">
        Encontrá y reporta mascotas perdidas cerca de tu ubicación
      </p>

      <button class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded" id="geoloc-btn">
        Dar mi ubicacion actual
      </button>
  
      <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-8 rounded" id="como-func-btn">
        Cómo funciona Pet Finder?
      </button>
    </div>
    `;
    this.addListeners()
  }
}

export { HomePage }
