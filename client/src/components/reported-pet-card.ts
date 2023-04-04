class ReportedPetCard extends HTMLElement {
  petId: string
  name: string
  lat: string
  lng: string
  pictureUrl: string
  locacion: string
  constructor() {
    super();
    this.petId = this.getAttribute("pet-id") || "";
    this.name = this.getAttribute("name") || "";
    this.lat = this.getAttribute("lat") || "";
    this.lng = this.getAttribute("lng") || "";
    this.pictureUrl = this.getAttribute("picture-url") || "";
    this.locacion = this.getAttribute("locacion") || "una ciudad random";
  }
  connectedCallback() {
    this.render();
  }
  listeners() {
    this.querySelector(".title")?.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("report", {
          detail: {
            petId: this.petId
          },
          bubbles: true
          // esto hace que el evento pueda
          // ser escuchado desde un elemento
          // que está más "arriba" en el arbol
        })
      );
    });

    const close = this.querySelector("#close-modal")
    const open = this.querySelector("#reportar-btn")
    const modalContainer = this.querySelector("#modal-component-container")
    const modal = this.querySelector("#modal-container")

    open?.addEventListener("click", () => {
      openModal()
    })
    close?.addEventListener("click", () => {
      closeModal()
    })

    function openModal() {
      showAndHide(modalContainer!,
        ["bg-fadeIn", "block"],
        ['bg-fadeOut', "hidden"]
      )
      showAndHide(modal!, ["modal-scaleIn"], ["modal-scaleOut"])
    }
    function closeModal() {
      showAndHide(modalContainer!, ["bg-fadeOut"], ['bg-fadeIn'])
      showAndHide(modal!, ["modal-scaleOut"], ["modal-scaleIn"])

      setTimeout(() => {
        showAndHide(modalContainer!, ["hidden"], ['block'])
      })
    }

    function showAndHide(el: Element, classesToAdd: string[], classesToRemove: string[]) {
      el.classList.remove(...classesToRemove)
      el.classList.add(...classesToAdd)
    }

  }
  render() {
    this.innerHTML = `
      <div class="bg-fadeout bg-fadeIn modal-scaleOut modal-scaleIn hidden"></div>
      <div 
        class="shadow-lg overflow-hidden bg-gray-700 p-4 rounded-md sm:mt-0 sm:text-sm max-w-max">
        <div 
          class="flex flex-col">
          <img src="https://picsum.photos/id/237/300/130" 
            alt="Foto de mascota perdida" 
            class="col-span-2 w-full h-full object-cover rounded">
          <div class="flex flex-row mt-4">
            <div class="basis-1/2">
              <h2 
                class="font-bold title text-xl text-gray-100">
               ${this.name}
              </h2>
              <p 
                class="text-gray-100">
                ${this.locacion}
              </p>
            </div>
            <div class="basis-1/2 flex items-center justify-center">
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
              bg-blue-700 
              hover:bg-blue-600
              text-white
              px-4
              py-2
              font-medium 
              rounder-md
              focus:outline-nonde
              focus:ring-2
              focus:ring-offset-2
              focus:ring-blue-200
              sm:mt-0 sm:text-sm
            "
          >
             
          </button>
            </div>          
          </div>
        </div>
      </div>
    `;
    this.listeners();
  }
}

export { ReportedPetCard }