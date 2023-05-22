import { Router } from "@vaadin/router";
import { state } from "../state";
class MisMascotasReportadasPage extends HTMLElement {
	constructor() {
		super();

		const cs = state.getState();
		if (!cs.userIsLoggedIn) {
			Router.go("/login");
		}
	}

	connectedCallback() {
		this.render();
	}

	addListeners() {}

	render() {
		this.innerHTML = `
			<nav-bar activeMenu="mis-mascotas-reportadas"></nav-bar>
			<div class="container mx-auto px-5 h-full pt-16 pb-4">

				<p 
					class="text-2xl text-center font-bold m-8"
				>
					Mascotas reportadas
				</p>
				<reported-pet-list></reported-pet-list>     
			</div>
    	`;
		this.addListeners();
	}
}

export { MisMascotasReportadasPage };
