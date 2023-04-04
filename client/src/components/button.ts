class Button extends HTMLElement {
  text: string
  name: string
  color: string
  colorClasses: Map<string, string>
  constructor() {
    super();
    this.colorClasses = new Map<string, string>([
      ["red", "bg-red-700 hover:bg-red-600 focus:ring-red-200"],
      ["green", "bg-green-700 hover:bg-green-600 focus:ring-green-200"],
      ["blue", "bg-blue-700 hover:bg-blue-600 focus:ring-blue-200"],
      ["indigo", "bg-indigo-700 hover:bg-indigo-600 focus:ring-indigo-200"]
    ])
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
      console.log("se despacho el evt", this.name)
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
      <button 
        id="custom-btn"
        type="submit"
        class="
          ${this.colorClasses.get(this.color)}
          text-sm
          inline-flex 
          sm:w-96
          w-72
          justify-center 
          rounded-md 
          shadow-md
          text-white
          px-6
          py-3
          font-medium 
          rounder-md
          focus:outline-nonde
          focus:ring-2
          focus:ring-offset-2
          sm:text-base
        "
      >
          ${this.text}
      </button>
    `
    this.name && this.listeners()
  }
}

export { Button }
