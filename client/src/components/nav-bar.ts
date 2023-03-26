class NavBar extends HTMLElement {
  constructor() {
    super();



  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav>
        <div class="nav-wrapper grey darken-4">
          <a href="#!" class="brand-logo">Logo</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="medium material-icons">
              menu
            </i>
          </a>
          <ul class="right hide-on-med-and-down">
            <li>
              <a href="sass.html" class="center-align">
                <h3>
                  Mis datos
                </h3>
              </a>
            </li>
            <li>
              <a href="badges.html">
                Mis mascotas reportadas
              </a>
            </li>
            <li>
              <a href="collapsible.html">
                Reportar mascotas
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="row">
        <ul class="sidenav grey lighten-2 col s12" id="mobile-demo">
          <li class="right-align section">
              <i class="medium material-icons" id="close-button">
                close
              </i>
          </li>
          <li class="center-align section">
            <a href="sass.html" >
              <h3>
                Mis datos
              </h3>
            </a>
          </li>
          <li class="center-align section">
            <a href="sass.html" >
              <h3>
                Mis mascotas reportadas
              </h3>
            </a>
          </li>
          <li class="center-align section">
            <a href="sass.html" >
              <h3>
                Reportar mascotas
              </h3>
            </a>
          </li>
        </ul>
      </div>
    `;
    const M = window.M
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems, {});

    const closeButton = document.querySelector("#close-button");
    const sidenav = instances[0];

    closeButton?.addEventListener("click", function () {
      instances[0].close();
    });
  }
}

export { NavBar }
