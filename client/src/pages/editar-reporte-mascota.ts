import { Router } from "@vaadin/router";
import { state } from "../state";
import Dropzone from "dropzone";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Map } from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxgl } from "../utils/mapbox";
import { urlToBase64 } from "../utils/urlToBase64";
class EditarReportePage extends HTMLElement {
	dropzone: any;
	file: any;
	map!: Map;
	geocoder!: MapboxGeocoder;
	selectedCoords: { lng: number; lat: number };
	petCoords: { lng: number; lat: number };
	petId: string;
	petName = "";
	newPetName = "";
	pictureUrl = "";
	newPicture = "";
	constructor() {
		super();
		const cs = state.getState();
		this.file = null;
		this.dropzone = null;
		this.petId = cs.petIdSelected || "";
		this.petName = "";
		if (!cs.userIsLoggedIn) {
			Router.go("/login");
		}
		this.selectedCoords = { lng: 0, lat: 0 };
		this.petCoords = { lng: 0, lat: 0 };
		cs.currentPosition || state.setCurrentPosition();
	}

	connectedCallback() {
		this.getDataAndRender();
	}
	async getDataAndRender() {
		const pet: any = await state.getReportedPetData(this.petId);
		this.petName = pet.name;
		this.petCoords = { lng: pet.lng, lat: pet.lat };
		this.pictureUrl = await urlToBase64(pet.pictureUrl);
		this.render();
	}

	configureGeocoder() {
		this.geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
		});
	}

	configureMapBox() {
		//obtengo coordenadas de la mascota perdida
		const { lng, lat } = this.petCoords;
		// centro el mapa en la posicion
		// de la mascota
		this.map = new mapboxgl.Map({
			container: this.querySelector<HTMLElement>("#mapbox-container")!,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [lng, lat], // starting position [lng, lat]
			zoom: 11, // starting zoom
		});

		// seteo el marker en el centro
		const marker = new mapboxgl.Marker({
			draggable: true,
			color: "orange",
		})
			.setLngLat([lng, lat])
			.addTo(this.map);
		// configuro el Geocoder
		this.geocoder.addTo(
			this.querySelector<HTMLElement>("#geocoder-container")!
		);
		//seteo lenguaje
		this.geocoder.setLanguage("es");
		this.geocoder.setCountries("ar");

		this.geocoder.on("result", (e: any) => {
			const [lng, lat] = e.result.center;
			marker.remove();
			this.map.setCenter([lng, lat]);
			marker.setLngLat([lng, lat]).addTo(this.map);
		});
		//cuando se mueve el marker se obtienen las coord
		marker.on("dragend", () => {
			const { lng, lat } = marker.getLngLat();
			this.selectedCoords = { lng, lat };
		});
	}

	configureDropzone() {
		this.dropzone = new Dropzone(
			this.querySelector<HTMLElement>("#report-form")!,
			{
				previewsContainer: <HTMLElement>this.querySelector("#dropzone"),
				url: "/falsa",
				autoProcessQueue: false,
				clickable: <HTMLElement>this.querySelector("#dropzone"),
				maxFiles: 1,
				createImageThumbnails: true,
				thumbnailWidth: 800,
				thumbnailHeight: 600,
				thumbnailMethod: "contain",
				acceptedFiles: ".jpg,.jpeg,.png",
				previewTemplate: this.getPreviewLayout(),
				dictRemoveFile: "Eliminar",
			}
		);
	}

	getPreviewLayout(imgUrl?: string) {
		return `
		<div class="dz-preview dz-image-preview w-full h-full m-0 relative z-0">
			<div class="dz-image">
				<img class="w-full h-full" data-dz-thumbnail ${
					imgUrl ? `src="${imgUrl}"` : ""
				} />
			</div>
			<button type="button" class="dz-remove dz-button h-2 w-2 absolute top-5 right-5 z-10 flex items-center justify-center">
				<a data-dz-remove>
					<svg class="fill-red-600 hover:fill-red-800 stroke-2 h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
				</a>
			</button>
		</div>
    	`;
	}

	listeners() {
		this.dropzone.on("addedfile", (file: any) => {
			this.newPicture = file;
			const dropzone = this.querySelector("#dropzone");
			dropzone!.innerHTML = "";
			dropzone?.append(file.previewElement);
		});

		this.dropzone.on("removedfile", () => {
			const dropzone = this.querySelector("#dropzone");
			dropzone!.innerHTML = `
			<div class="absolute inset-0 bg-white  bg-opacity-50"></div>
      		<div class="flex items-center justify-center text-gray-700 text-5xl font-bold h-full w-full">
        		+
      		</div>`;
		});

		this.querySelector("#report-form")!.addEventListener("submit", (e: any) => {
			e.preventDefault();
			const formData = new FormData(
				this.querySelector<HTMLFormElement>("#report-form")!
			);

			const data: any = {
				petId: this.petId,
			};

			const name = formData.get("name");

			if (name !== this.petName) {
				data.name = name;
			}

			if (this.selectedCoords.lat !== 0) {
				data.lat = this.selectedCoords.lat;
				data.lng = this.selectedCoords.lng;
			}

			if (this.newPicture !== "") {
				data.pictureURI = this.newPicture;
			}
			console.log(data);
			if (
				this.newPicture === "" &&
				name === this.petName &&
				this.selectedCoords.lat === 0
			) {
				console.log("no hay cambios");
				return;
			}
			state.updateLostPetReport(data).then((res) => {
				console.log("se updateo con exito", res);
				Router.go("/mis-mascotas-reportadas");
			});
		});

		this.querySelector("#report-form")!.addEventListener("encontrado", () => {
			state.updateReportAsFinded(this.petId);
		});
		this.querySelector("#cancelar")!.addEventListener("click", () => {
			Router.go("/mis-mascotas-reportadas");
		});
	}

	render() {
		this.innerHTML = `
      <nav-bar activeMenu="reportar-mascota"></nav-bar>

      <div 
        class="
          container 
          mx-auto 
          px-6 
          sm:px-12 
          h-full 
          flex 
          flex-col 
          justify-center 
          gap-y-4 
          py-16 
          items-center
        "
      >

        <p class="text-4xl text-center font-bold subpixel-antialiased self-center  mt-8">
          Editar reporte de mascota
        </p>

        <p class="text-xl text-center font-md self-center">
          Ingresá la siguiente información para realizar el reporte de la mascota
        </p>

        <div class="container mx-auto">
          <form id="report-form" class="dropzone max-w-md mx-auto bg-transparent p-8 flex gap-4 flex-col" autocomplete="off">
                  
            <label for="name" class="block text-gray-700 font-semibold">
              Nombre
            </label>

            <input
              value="${this.petName}"
              type="name"
              id="name"
              name="name" 
              class="w-full px-4 py-2 border border-gray-300 rounded 
              focus:outline-none 
            focus:border-indigo-500 
              shadow-md" required
            >

            <div 
				class="hover:bg-gray-400 relative h-32 border border-gray-400 rounded-lg overflow-hidden cursor-pointer"
              	id="dropzone"
            >
              <div class="absolute inset-0 bg-white  bg-opacity-50"></div>
              <div 
                class="flex items-center justify-center text-gray-700 text-5xl font-bold h-full w-full"
              > + </div>
              <div class="dz-message" data-dz-message></div>
            </div>

            <div 
              id="mapbox-container" 
              class="
                container 
                mx-auto 
                p-24 
                rounded
                border-solid
                outline
                outline-0
                outline-red-600
                border-2
                border-green-600"
            ></div>
            <div id="geocoder-container"></div>
            <x-btn text="Guardar" color="blue" type="submit"></x-btn>
			<x-btn text="Reportar como encontrado" color="green" name="encontrado"></x-btn>
            <x-btn text="Cancelar" color="gray" id="cancelar"></x-btn>
          </form>
        </div>
      </div>
    `;

		this.configureGeocoder();
		this.configureMapBox();
		this.configureDropzone();
		this.listeners();

		//reemplazo por la imagen de la mascota
		const dropzone = this.querySelector("#dropzone");
		dropzone!.innerHTML = "";
		dropzone!.innerHTML = this.getPreviewLayout(this.pictureUrl);
	}
}

export { EditarReportePage };
