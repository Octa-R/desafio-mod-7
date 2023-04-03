class Card extends HTMLElement {
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
              <x-btn 
                id="reportar-btn"
                text="Reportar"
                color="red"
              ></x-btn>
            </div>          
          </div>
        </div>
      </div>



      <!-- Modal -->
      <div id="modal-component-container" class="hidden fixed inset-0">

        <div class="
          modal-flex-container 
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        ">

          <div class="modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75"></div>

          <div 
            class="
              modal-space-container
              hidden
              sm:inline-block
              sm:align-middle
              sm:h-screen
          ">
            &nbsp
          </div>

          <div id="modal-container" 
            class="modal-container
            inline-block 
            align-bottom
            bg-white rounded-lg 
            text-left
            overflow-hidden 
            shadow-xl
            transform 
            transition-all
            sm:my-8
            sm:align-middle
            sm:max-w-lg
            w-full"
          >
            <div class="modal-wrapper bg-gray-700 px-4 pt-4 pb-4 sm:p-6">
              <div class="modal-wrapper-flex sm:felx sm:items-start">
                
                <form 
                  class="modal-content text-center mt-3 ml-0 mb-4 
                  sm:mt-0 sm:ml-4 sm:text-left"
                >

                  <h3 class="text-4xl font-medium text-white text-center mb-4">Reportar info de Bobby</h3>

                  <div class="mb-4">
                    <label for="name" class="block text-white font-semibold mb-2 text-left">Nombre</label>
                    <input type="name" id="name" name="name" class=" text-left w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 shadow-md" required>
                  </div>

                  <div class="mb-4">
                    <label for="phone" class="block text-white font-semibold mb-2 text-left">Teléfono</label>
                    <input type="phone" id="phone" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 shadow-md" required>
                  </div>

                  <div class="mb-4">
                    <label for="description" class="block text-white font-semibold mb-2 text-left">Dónde lo viste?</label>
                    <textarea type="description" id="description" name="description" class="resize-none w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 shadow-md" required></textarea>
                  </div>

                  <x-btn id="close-modal" text="Enviar información" color="green"></x-btn>
                  <x-btn id="close-modal" text="Cancelar" color="red"></x-btn>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    `;
    this.listeners();
  }
}

export { Card }
