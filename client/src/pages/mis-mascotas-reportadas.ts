import { state } from "../state";
class MisMascotasReportadasPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    state.getUserLostPets().then(() => {
      this.render();
    })
  }

  addListeners() {

  }


  render() {
    this.innerHTML = `
    <nav-bar></nav-bar>
    <div class="container mx-auto px-12 h-screen pt-16 ">

      <p class="text-2xl text-center font-bold m-8">
      Mascotas reportadas
      </p>
      <reported-pet-list></reported-pet-list>     

    </div>
    `;
    this.addListeners()
  }
}

export { MisMascotasReportadasPage }