class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <nav-bar></nav-bar>
      `;
  }
}

export { HomePage }