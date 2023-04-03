class Button extends HTMLElement {
  text: string
  name: string
  color: string
  constructor() {
    super();
    this.text = this.getAttribute("text") || "";
    //name es el evento que emite
    this.name = this.getAttribute("name") || "";
    this.color = this.getAttribute("color") || "indigo";
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
    if (this.color === "green") {
      this.innerHTML = `
      <button 
        id="custom-btn"
        type="submit"
        class="
          text-sm
          inline-flex 
          sm:w-72
          w-full
          justify-center 
          rounded-md 
          shadow-md
          bg-green-700 
          hover:bg-green-600
          text-white
          px-4
          py-2
          font-medium 
          rounder-md
          focus:outline-nonde
          focus:ring-2
          focus:ring-offset-2
          focus:ring-green-200
          sm:text-base
        "
      >
          ${this.text}
      </button>
    `
    }

    if (this.color === "indigo") {
      this.innerHTML = `
      <button 
        id="custom-btn"
        type="submit"
        class="
          text-sm
          inline-flex 
          sm:w-72
          w-full
          justify-center 
          rounded-md 
          shadow-md
          bg-indigo-700 
          hover:bg-indigo-600
          text-white
          px-4
          py-2
          font-medium
          rounder-md
          focus:outline-nonde
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-200
          sm:text-base
        "
      >
          ${this.text}
      </button>
      `
    }
    if (this.color === "red") {
      this.innerHTML = `
      <button 
        id="custom-btn"
        type="submit"
        class="
        text-base
          inline-flex 
          w-full
          justify-center 
          rounded-md 
          shadow-md
          bg-red-700 
          hover:bg-red-600
          text-white
          px-4
          py-2
          font-medium 
          rounder-md
          focus:outline-nonde
          focus:ring-2
          focus:ring-offset-2
          focus:ring-red-200
          sm:mt-0 sm:text-sm
        "
      >
          ${this.text}
      </button>
      `
    }
    this.name && this.listeners()
  }
}

export { Button }
