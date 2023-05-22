import { state } from "../state";

class Card extends HTMLElement {
	petId: string;
	name: string;
	lat: string;
	lng: string;
	pictureUrl: string;
	locacion: string;
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
						petId: this.petId,
					},
					bubbles: true,
					// esto hace que el evento pueda
					// ser escuchado desde un elemento
					// que está más "arriba" en el arbol
				})
			);
		});
		this.configureModal();
		const form = this.querySelector<HTMLFormElement>("#report-form");
		form!.addEventListener("submit", (e) => {
			e.preventDefault();
			const formData = new FormData(form!);
			const data = {
				name: formData.get("name"),
				description: formData.get("description"),
				contactPhone: formData.get("phone"),
			};
			state.sendSeenReport(data, this.petId).then((res) => {
				console.log("se envio", res);
				location.reload();
			});
		});
	}
	configureModal() {
		const close = this.querySelector("#close-modal");
		const open = this.querySelector("#report-btn");
		const modalContainer = this.querySelector("#modal-component-container");
		const modal = this.querySelector("#modal-container");

		open?.addEventListener("click", () => {
			openModal();
		});
		close?.addEventListener("click", () => {
			closeModal();
		});

		function openModal() {
			showAndHide(
				modalContainer!,
				["bg-fadeIn", "block"],
				["bg-fadeOut", "hidden"]
			);
			showAndHide(modal!, ["modal-scaleIn"], ["modal-scaleOut"]);
		}

		function closeModal() {
			showAndHide(modalContainer!, ["bg-fadeOut"], ["bg-fadeIn"]);
			showAndHide(modal!, ["modal-scaleOut"], ["modal-scaleIn"]);

			setTimeout(() => {
				showAndHide(modalContainer!, ["hidden"], ["block"]);
			});
		}

		function showAndHide(
			el: Element,
			classesToAdd: string[],
			classesToRemove: string[]
		) {
			el.classList.remove(...classesToRemove);
			el.classList.add(...classesToAdd);
		}
	}
	render() {
		this.innerHTML = `
      <div class="bg-fadeout bg-fadeIn modal-scaleOut modal-scaleIn hidden"></div>
      <div 
      class="
        shadow-lg 
        overflow-hidden 
        bg-gray-700 
        p-2 
        rounded-md 
        sm:mt-0 
        sm:text-sm 
        max-w-96 
        w-80
        h-60"
			>
      <div class="flex flex-col items-center h-full justify-between">

        <img 
          src="${this.pictureUrl}" 
          alt="Foto de mascota perdida" 
          class="col-span-2 w-52 h-32 rounded object-cover shrink"
        >

        <div class="flex flex-row">

          <div class="basis-2/3 ">

            <h2 class="font-bold title text-3xl text-gray-100 w-full">
              ${this.name}
            </h2>

            <p class="text-gray-100 text-base">${this.locacion}</p>

          </div>

            <div class="basis-1/3 flex items-center justify-center p-2">
              <x-btn text="Reportar" type="button" color="red" id="report-btn"></x-btn>
            </div> 

          </div>
        </div>
      </div>

      <!-- Modal -->
      <div id="modal-component-container" class="hidden fixed inset-0">

        <div class="
          modal-flex-container 
          flex
          items-center
          justify-center
          min-h-screen
          pt-2
          px-2
          text-center
          sm:block 
          sm:p-0
        ">

        <div class="modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75"></div>

        <div 
          class="
            modal-space-container
            hidden
            sm:inline-block
            sm:align-middle
            sm:h-screen
          ">&nbsp
        </div>

          <div 
            id="modal-container" 
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
              w-full
              max-w-sm
              "
          >
            <div class="modal-wrapper bg-gray-700 p-5">
              <div class="modal-wrapper-flex sm:flex sm:items-start justify-center w-full">
                
                <form 
                  id="report-form"
                  class="modal-content text-center m-0 w-full
                  sm:mt-0 sm:ml-0 sm:text-left"
                  autocomplete="off"
                >

                  <h3 class="text-4xl font-bold text-white text-center mb-4">Reportar info de ${this.name}</h3>

                  <div class="mb-4">
                    <label for="name" class="block text-white font-semibold mb-2 text-left">Nombre</label>
                    <input type="name" id="name" name="name" class="bg-gray-500 text-left w-full px-4 py-2 border-2 border-gray-800 rounded focus:outline-none focus:border-indigo-500 shadow-md" required>
                  </div>

                  <div class="mb-4">
                    <label for="phone" class="block text-white font-semibold mb-2 text-left">Teléfono</label>
                    <input type="phone" id="phone" name="phone" class="bg-gray-500 w-full px-4 py-2 border-2 border-gray-800 rounded focus:outline-none focus:border-indigo-500 shadow-md" required>
                  </div>

                  <div class="mb-4">
                    <label for="description" class="block text-white font-semibold mb-2 text-left">Dónde lo viste?</label>
                    <textarea type="description" id="description" name="description" class="bg-gray-500 resize-none w-full px-4 py-2 border-2 border-gray-800 rounded focus:outline-none focus:border-indigo-500 shadow-md" required></textarea>
                  </div>

                  <div class="flex flex-col gap-4">
                    <x-btn id="send-btn" text="Enviar información" type="submit" color="green"></x-btn>
                    <x-btn id="close-modal" text="Cancelar" color="red"></x-btn>
                  </div>

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

export { Card };
