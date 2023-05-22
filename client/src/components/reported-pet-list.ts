import { Router } from "@vaadin/router";
import { state } from "../state";

class ReportedList extends HTMLElement {
	lostpets: any[];
	constructor() {
		super();
		this.lostpets = [];
	}

	connectedCallback() {
		state.getUserLostPets().then((data) => {
			this.lostpets = data;
			this.render();
		});
	}

	listeners() {
		this.querySelector(".list")?.addEventListener("report", (e: any) => {
			const cs = state.getState();
			cs.petIdSelected = e.detail.petId;
			state.setState(cs);
			Router.go("/editar-reporte-mascota");
		});
	}

	render() {
		this.innerHTML = `
      		<div class="list grid place-items-center sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 content-normal place-content-center">
       		${this.lostpets
						.map(
							(pet) => `<reported-pet-card 
                        pet-id="${pet.id}"
                        name="${pet.name}"
                        lat="${pet.lat}"
                        lng="${pet.lng}"
                        picture-url="${pet.pictureUrl}"
                      ></reported-pet-card>`
						)
						.join("")}
      		</div>
    `;
		this.listeners();
	}
}
export { ReportedList };
