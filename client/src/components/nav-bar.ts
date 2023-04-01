import { Router } from "@vaadin/router"
import { state } from "../state"

class NavBar extends HTMLElement {
  isMenuOpen: boolean
  activeMenu: string
  misDatosClasses: string
  resportarMascotaClasses: string
  misMascotasClasses: string
  constructor() {
    super();
    this.isMenuOpen = false;
    //decide cual menu esta activo
    this.activeMenu = this.getAttribute("activeMenu") || ""
    this.misDatosClasses = this.activeMenu === "mis-datos" ? "bg-zinc-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    this.resportarMascotaClasses = this.activeMenu === "reportar-mascota" ? "bg-zinc-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    this.misMascotasClasses = this.activeMenu === "mis-mascotas-reportadas" ? "bg-zinc-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    //<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
  }

  connectedCallback() {
    this.render();
  }
  // Dropdown menu, show/hide based on menu state.

  // Entering: "transition ease-out duration-100"
  //   From: "transform opacity-0 scale-95"
  //   To: "transform opacity-100 scale-100"
  // Leaving: "transition ease-in duration-75"
  //   From: "transform opacity-100 scale-100"
  //   To: "transform opacity-0 scale-95"
  addListeners() {
    const button = this.querySelector("#mobile-menu-button")
    button?.addEventListener("click", () => {
      //ham
      this.querySelector("#ham-btn")?.classList.toggle("hidden")
      this.querySelector("#ham-btn")?.classList.toggle("block")
      //close
      this.querySelector("#close-btn")?.classList.toggle("hidden")
      this.querySelector("#close-btn")?.classList.toggle("block")
      //mobile menu
      this.querySelector("#mobile-menu")?.classList.toggle("hidden")
      this.querySelector("#mobile-manu")?.classList.toggle("block")

      this.isMenuOpen = !this.isMenuOpen
    })

    this.querySelector("#logout")?.addEventListener("click", async () => {
      await state.logout()
      Router.go("/")
      location.reload()
    })
  }

  render() {
    const cs = state.getState()
    this.innerHTML = `
    <nav class="bg-zinc-800 fixed w-full top-0 z-50">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            id="mobile-menu-button"
            class="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              id="ham-btn"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              class="hidden h-6 w-6"
              id="close-btn"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center ">
            <a href="/">
            <img
              class="block h-8 w-auto lg:hidden"
              src="./logo.svg"
              alt="Pet Finder"
            />
            </a>
            <a href="/">
            <img
              class="hidden h-8 w-auto lg:block"
              src="./logo.svg"
              alt="Pet Finder"
            />
            </a>
          </div>
          <div class="hidden sm:ml-6 sm:block">

            <div class="flex space-x-4">
              <!-- Current: "bg-zinc-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a
                href="/mis-datos"
                class="${this.misDatosClasses} rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page"
                >Mis datos</a
              >
              <a
                href="/mis-mascotas-reportadas"
                class="${this.misMascotasClasses} rounded-md px-3 py-2 text-sm font-medium"
                >Mis mascotas reportadas</a
              >
              <a
                href="/reportar-mascota"
                class="${this.resportarMascotaClasses} rounded-md px-3 py-2 text-sm font-medium"
                >Reportar mascotas</a
              >
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        </div>
      </div>
    </div>
  
    <div class="hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <a
          href="/mis-datos"
          class="${this.misDatosClasses} block rounded-md px-3 py-2 text-base font-medium"
          aria-current="page"
          >Mis datos
        </a>
  
        <a
          href="/mis-mascotas-reportadas"
          class="${this.misMascotasClasses} block rounded-md px-3 py-2 text-base font-medium"
          >Mis mascotas reportadas
        </a>
  
        <a
          href="/reportar-mascota"
          class="${this.resportarMascotaClasses} block rounded-md px-3 py-2 text-base font-medium"
          >Reportar mascotas
        </a>
          ${cs.userIsLoggedIn ? `
            <div class="text-gray-300 text-center px-4 py-2 text-base font-medium">
              ${cs.email}
            </div>
            <div id="logout" class="underline text-bold text-center px-4 py-2 text-base font-medium text-indigo-700 hover:text-indigo-800 cursor-pointer">
              Cerrar sesión
            </div>
          ` :
        ""}
          
      </div>
    </div>
    </nav>
    `;
    this.addListeners()
  }
}

export { NavBar }
