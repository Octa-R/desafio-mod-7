import { Router } from "@vaadin/router";
import axios from "axios";
import { ImportMeta } from "./types/ImportMeta";
import { State } from "./types/State";
import { CustomStorage } from "./types/CustomStorage";
import { StateData } from "./types/StateData";

const state: State = {
	data: {
		jwtToken: "",
		errorMessage: "",
		currentPosition: {},
		userIsLoggedIn: false,
		email: "",
		password: "",
		lostPetsList: [],
		fullname: "",
		localidad: "",
		petIdSelected: "",
	},
	listeners: [],
	storage: new CustomStorage(),
	x: axios.create({
		timeout: 2500,
		headers: { "Content-Type": "application/json" },
	}),
	init() {
		const cs = state.getState();
		cs.errorMessage = "";
		cs.password = "";
		const url = (import.meta as unknown as ImportMeta).env.VITE_API_URL;
		this.x.defaults.baseURL = url;
		this.x.defaults.headers.common["Authorization"] = "Bearer " + cs.jwtToken;
		this.setState({ ...this.data, ...cs });
	},
	getState() {
		const data: StateData = this.storage.get("app-state");
		return data;
	},
	setState(newState) {
		console.log("soy el state eh cambiado", newState);
		this.data = newState;
		this.storage.save("app-state", this.data);

		for (const cb of this.listeners) {
			cb();
		}
	},
	subscribe(cb: () => any) {
		this.listeners.push(cb);
	},
	async signup(userData) {
		try {
			await this.x.post("/auth/signup", { ...userData });
			return true;
		} catch (error: any) {
			const cs = this.getState();
			cs.errorMessage = error.response.data.message || error.message;
			this.setState(cs);
			return false;
		}
	},
	async signin(userData) {
		const cs = this.getState();
		let response: boolean = false;
		try {
			const res = await this.x.post("/auth/signin", { ...userData });
			//se setea el token
			this.x.defaults.headers.common["Authorization"] =
				"Bearer " + res.data.token;

			cs.email = res.data.email;
			cs.userIsLoggedIn = true;
			cs.errorMessage = "";
			cs.jwtToken = res.data.token;
			response = true;
		} catch (error: any) {
			cs.errorMessage = error.response.data.message || error.message;
			response = false;
		} finally {
			this.setState(cs);
			return response;
		}
	},
	async getDatosPersonales() {
		const cs = this.getState();
		try {
			const res = await this.x.get(`/users`);
			cs.email = res.data.email;
			cs.fullname = res.data.fullname;
			cs.localidad = res.data.localidad;
			this.setState(cs);
		} catch (error: any) {
			cs.errorMessage = error.response.data.message || error.message;
			this.setState(cs);
		}
	},
	async updateDatosPersonales({ fullname, localidad }) {
		const cs = this.getState();
		try {
			await this.x.put(`/users`, {
				fullname,
				localidad,
			});
		} catch (error: any) {
			console.error(error);
			cs.errorMessage = error.response.data.message || error.message;
			this.setState(cs);
		}
	},
	async setCurrentPosition() {
		const success = (pos: any) => {
			const crd = pos.coords;
			const cs = this.getState();
			cs.currentPosition = {
				lat: crd.latitude,
				lng: crd.longitude,
				acc: crd.accuracy,
			};
			this.setState(cs);
			Router.go("/home-mascotas");
		};

		const error = (err: any) => {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		};

		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	},
	async logout() {
		this.x.defaults.headers.common["Authorization"] = "";
		this.resetState();
		return true;
	},
	async getLostPets() {
		const cs = this.getState();
		try {
			const { data } = await this.x.get("/pets/");
			cs.lostPetsList = data.lostPets;
			this.setState(cs);
			return data.lostPets;
		} catch (error: any) {
			cs.errorMessage = error.response.data.message;
			this.setState(cs);
			return [];
		}
	},
	async sendSeenReport(seenData, petId) {
		try {
			const res = await this.x.post(`/pets/${petId}`, seenData);
			console.log(res);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	},
	async getUserLostPets() {
		const cs = this.getState();
		try {
			const { data } = await this.x.get("/users/pets/");
			return data.lostPets.lostpets;
		} catch (error: any) {
			cs.errorMessage = error.response.data.message;
			return [];
		}
	},
	async reportPet(data) {
		try {
			await this.x.post("/users/pets/", data);
			return true;
		} catch (error: any) {
			const cs = this.getState();
			console.log(error);
			cs.errorMessage = "error en reportpet";
			this.setState(cs);
			return false;
		}
	},
	async getReportedPetData(petId) {
		try {
			const { data } = await this.x.get("/users/pets/" + petId);
			return data;
		} catch (error) {
			const cs = this.getState();
			console.log(error);
			cs.errorMessage = "error en reportpet";
			this.setState(cs);
			return [];
		}
	},
	async updateLostPetReport(data) {
		try {
			await this.x.put("/users/pets/" + data.petId, data);
			return true;
		} catch (error) {
			return false;
		}
	},
	async updateReportAsFinded(petId) {
		try {
			await this.x.patch("/users/pets/" + petId);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	},
	resetState() {
		const cs = this.getState();
		cs.email = "";
		cs.userIsLoggedIn = false;
		cs.errorMessage = "";
		cs.currentPosition = {};
		cs.password = "";
		cs.lostPetsList = [];
		this.setState(cs);
	},
	updatePassword: function (password: string, confirm: string) {
		if (password !== confirm) {
			console.error("no son iguales");
			return;
		}
		this.x.put("/auth/", { password });
	},
};

export { state };
