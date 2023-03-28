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
      <div class="card">
       <h2 class="title">Mascota: ${this.petId} (Click me)</h2>
      </div>
    `;
    this.listeners();
  }
}

export { Card }
