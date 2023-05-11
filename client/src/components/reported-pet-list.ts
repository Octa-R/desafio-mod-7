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
			console.log(" en list", data);
			this.lostpets = data;
			this.render();
		});
	}

	listeners() {
		this.querySelector(".list")?.addEventListener("report", (e: any) => {
			console.log("click en mascota");
			console.log(e.detail);
			Router.go({
				pathname: "/editar-reporte-mascota/",
				search: e.detail.petId,
			});
		});
	}

	render() {
		this.innerHTML = `
      <div class="list grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 content-normal place-content-center place-items-center">
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
