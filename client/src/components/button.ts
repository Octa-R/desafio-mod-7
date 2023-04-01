class Button extends HTMLElement {
  text: string
  name: string
  color: string
  constructor() {
    super();
    this.text = this.getAttribute("text") || "";
    //name es el evento que emite
    this.name = this.getAttribute("name") || "";
    this.color = this.getAttribute("color") || "blue";
  }
  connectedCallback() {
    this.render();
  }
  listeners() {
    this.querySelector("#custom-btn")?.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent(this.name, {
          detail: {
            type: this.name
          },
          bubbles: true
        })
      );
    });
  }
  render() {
    this.innerHTML = `
      <button id="custom-btn" type="submit" class="bg-${this.color}-600 hover:bg-${this.color}-800 text-white font-bold py-3 px-8 rounded w-72 md:w-96">
        ${this.text}
      </button>
    `
    this.listeners();
  }
}

export { Button }
