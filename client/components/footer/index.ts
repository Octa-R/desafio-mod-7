export function initCustomFooter() {
  class CustomFooter extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.classList.add("footer");
      div.textContent = "Footer";
      const style = document.createElement("style");

      style.textContent = `

        :host {
          display: block;
        }
      
        .footer {
          background-color: #FFA0EA;
          margin:0;
          height: 233px;
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

  customElements.define("custom-footer", CustomFooter);
}
