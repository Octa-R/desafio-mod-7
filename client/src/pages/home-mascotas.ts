import { state } from "../state";
class HomeMascotas extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  addListeners() {
    this.querySelector("#geoloc-btn")?.addEventListener("click", () => {
      state.setCurrentPosition()
    })
  }

  render() {
    this.innerHTML = `
    <nav-bar></nav-bar>
    <div class="container mx-auto px-12 h-screen pt-16 ">

      <p class="text-2xl text-center font-bold m-8">
      Mascotas perdidas cerca
      </p>
      <lost-pet-list></lost-pet-list>     

    </div>
    `;
    // <lost-pet-list></lost-pet-list>
    this.addListeners()
  }
}

export { HomeMascotas }