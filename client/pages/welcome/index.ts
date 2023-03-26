export function initPageWelcome(params) {
  const div = document.createElement("div");
  div.innerHTML = `
  <custom-header></custom-header>
    <custom-text variant="title">
      Te damos la bienvenida a esta página
    </custom-text>
  `;

  // div.addEventListener("click", () => {
  //   params.goTo("/step-1");
  // });
  return div;
}
