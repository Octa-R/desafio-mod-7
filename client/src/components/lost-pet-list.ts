class List extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  listeners() {
    this.querySelector(".list")?.addEventListener("report", (e: any) => {
      console.log("click en mascota");
      console.log(e.detail);
    });
  }
  render() {
    const ids = [1, 2, 3, 4];
    this.innerHTML = `
      <div class="list">
       ${ids
        .map((id) => `<lost-pet-card pet-id=${id}></lost-pet-card>`)
        .join("")}
      </div>
    `;
    this.listeners();
  }
}
export { List }
