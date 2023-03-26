class NavBar extends HTMLElement {
  isMenuOpen: boolean
  constructor() {
    super();
    this.isMenuOpen = false;
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

  }

  render() {
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
            <!--
              Icon when menu is closed.
  
              Menu open: "hidden", Menu closed: "block"
            -->
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
            <!--
              Icon when menu is open.
  
              Menu open: "block", Menu closed: "hidden"
            -->
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
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto lg:hidden"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
            <img
              class="hidden h-8 w-auto lg:block"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">

            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a
                href="/mis-datos"
                class="bg-zinc-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page"
                >Mis datos</a
              >
  
              <a
                href="/mis-mascotas-reportadas"
                class="text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Mis mascotas reportadas</a
              >
  
              <a
                href="/reportar-mascota"
                class="text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Reportar mascotas</a
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          
  
          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <div>
              <button
                type="button"
                class="flex rounded-full bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
  
            <!--
              Dropdown menu, show/hide based on menu state.
  
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <div
              class="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <!-- Active: "bg-gray-100", Not Active: "" -->
              <a
                href="#"
                class="block px-4 py-2 text-sm text-zinc-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
                >Your Profile</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-zinc-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-1"
                >Settings</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-zinc-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-2"
                >Sign out</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <a
          href="/mis-datos"
          class="bg-zinc-900 text-white block rounded-md px-3 py-2 text-base font-medium"
          aria-current="page"
          >Mis datos</a
        >
  
        <a
          href="/mis-mascotas-reportadas"
          class="text-zinc-300 hover:bg-zinc-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Mis mascotas reportadas</a
        >
  
        <a
          href="/reportar-mascota"
          class="text-zinc-300 hover:bg-zinc-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Reportar mascotas</a
        >
  
      </div>
    </div>
    </nav>
    `;
    this.addListeners()
  }
}

export { NavBar }
