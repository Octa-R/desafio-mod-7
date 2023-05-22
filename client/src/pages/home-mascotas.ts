class HomeMascotas extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	addListeners() {}

	render() {
		this.innerHTML = `
		<nav-bar></nav-bar>
		<div class="container mx-auto px-5 h-full pt-16 pb-4">

      <p class="text-2xl text-center font-bold m-8">
        Mascotas perdidas cerca
      </p>
      <lost-pet-list></lost-pet-list>     

		</div>
    `;
		this.addListeners();
	}
}

export { HomeMascotas };
