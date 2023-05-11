class ReportedPetCard extends HTMLElement {
	petId: string;
	name: string;
	lat: string;
	lng: string;
	pictureUrl: string;
	locacion: string;
	//ESTA CARD ES PARA LAS MASCOTAS REPORTADAS DEL USUARIO
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
		this.querySelector("#edit-btn")!.addEventListener("click", () => {
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

		const close = this.querySelector("#close-modal");
		const open = this.querySelector("#reportar-btn");
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
        class="shadow-lg overflow-hidden bg-gray-700 p-2 rounded-md sm:mt-0 sm:text-sm max-w-max w-80 h-56">
        <div class="flex flex-col items-center h-full justify-between">

          <img src="${this.pictureUrl}" 
            alt="Foto de mascota perdida" 
            class="col-span-2 w-52 h-32 rounded object-contain shrink">
          
          <div class="flex flex-row">

            <div class="basis-2/3 ">

              <h2 class="font-bold title text-3xl text-gray-100 w-full">
               ${this.name}
              </h2>

              <p class="text-gray-100 text-base">${this.locacion}</p>

            </div>

            <div class="basis-1/3 flex items-center justify-center p-2">
              <x-btn text="Editar" id="edit-btn"></x-btn>
            </div> 

          </div>
        </div>
      </div>
    `;
		this.listeners();
	}
}

export { ReportedPetCard };
