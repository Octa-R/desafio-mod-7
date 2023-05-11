import { Router } from "@vaadin/router";
import axios from "axios";
import { ImportMeta } from "./utils/ImportMeta";
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
	},
	listeners: [],
	storage: new CustomStorage(),
	x: axios.create({
		timeout: 2500,
		headers: { "Content-Type": "application/json" },
	}),
	init() {
		const cs = state.getState();
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
			const res = await this.x.post("/auth/signup", { ...userData });
			console.log("signup", res);
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
			console.log("dentro de update");
			const update = await this.x.put(`/users`, {
				fullname,
				localidad,
			});
			console.log("respuesta update", update);
		} catch (error: any) {
			console.log(error);
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
		let res = false;
		try {
			const { data } = await this.x.get("/pets/");
			console.log(data);
			cs.lostPetsList = data.lostPets;
			res = true;
		} catch (error: any) {
			cs.errorMessage = error.response.data.message;
			res = false;
		} finally {
			this.setState(cs);
			return res;
		}
	},
	async getUserLostPets() {
		const cs = this.getState();
		try {
			const { data } = await this.x.get("/users/pets/");
			console.log("getUserLostPets", data);
			return data.userLostPets;
		} catch (error: any) {
			cs.errorMessage = error.response.data.message;
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
	updatePassword: function (pass: string, confirm: string) {
		if (pass !== confirm) {
			console.log("no son iguales");
			return;
		}
		this.x.post("/users/");
	},
};

export { state };
