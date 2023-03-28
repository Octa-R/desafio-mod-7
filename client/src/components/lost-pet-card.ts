class Card extends HTMLElement {
  petId: string
  constructor() {
    super();
    this.petId = this.getAttribute("pet-id") || "";
  }
  connectedCallback() {
    this.render();
  }
  listeners() {
    this.querySelector(".title")?.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("report", {
          detail: {
            petId: this.petId
          },
          bubbles: true
          // esto hace que el evento pueda
          // ser escuchado desde un elemento
          // que está más "arriba" en el arbol
        })
      );
    });
  }
  render() {
    this.innerHTML = `
      <div class="rounded shadow-lg overflow-hidden bg-gray-700 p-4">
        <div class="flex flex-col">
          <img src="https://picsum.photos/id/237/300/130" alt="Foto de mascota perdida" class="col-span-2 w-full h-full object-cover rounded">
          <h2 class="font-bold title text-xl text-gray-100">
            Mascota: ${this.petId} (Click me)
          </h2>
          <p class="text-gray-100">
            Locación
          </p>
          <button class="ml-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Reportar
          </button>
        </div>
      </div>

    `;
    this.listeners();
  }
}

export { Card }
