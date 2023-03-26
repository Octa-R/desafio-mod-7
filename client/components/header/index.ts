export function initCustomHeader() {
  class CustomHeader extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.classList.add("header");
      div.textContent = "Header";
      const style = document.createElement("style");

      style.textContent = `

        :host {
          display: block;
        }
      
        .header {
          background-color: #FF8282;
          margin:0;
          height: 60px;
          display:flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          font-weight: 500;
        }
      `;

      shadow.appendChild(style);
      shadow.appendChild(div);
    }
  }

  customElements.define("custom-header", CustomHeader);
}
