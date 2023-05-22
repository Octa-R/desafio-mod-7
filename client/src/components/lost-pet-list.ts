import { state } from "../state";

class List extends HTMLElement {
	lostPets: {
		id: string;
		name: string;
		pictureUrl: string;
	}[];
	constructor() {
		super();
		this.lostPets = [];
	}

	connectedCallback() {
		state.getLostPets().then((res) => {
			this.lostPets = res;
			this.render();
		});
	}

	listeners() {
		this.querySelector(".list")?.addEventListener("report", () => {
			//mostrar modal de reportar mascota como vista
		});
	}

	render() {
		this.innerHTML = `
		<div class="list grid place-items-center sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 content-normal place-content-center">
       ${this.lostPets
					.map(
						(pet) => `<lost-pet-card 
                        pet-id="${pet.id}"
                        name="${pet.name}"
                        picture-url="${pet.pictureUrl}"
                      "></lost-pet-card>`
					)
					.join("")}
      </div>
    `;
		this.listeners();
	}
}
export { List };
