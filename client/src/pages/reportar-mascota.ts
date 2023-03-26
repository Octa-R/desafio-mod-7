class ReportarMascotaPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav-bar></nav-bar>
    <div class="container mx-auto px-12 h-screen flex flex-col space-y-8 py-16">

      <p class="text-8xl text-center font-bold text-orange-600 subpixel-antialiased my-8">
        Reportar Mascota
      </p>

      <p class="text-2xl text-justify">
        Encontrá y reporta mascotas perdidas cerca de tu ubicación
      </p>

      <button class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded">
        Dar mi ubicacion actual
      </button>
  
      <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-8 rounded">
        Cómo funciona Pet Finder?
      </button>
    </div>
    `;
  }
}

export { ReportarMascotaPage }