import { Axios } from "axios";
import { CustomStorage } from "./CustomStorage";
import { StateData } from "./StateData";

interface State {
	listeners: Array<() => void>;
	data: StateData;
	storage: CustomStorage;
	x: Axios;

	init: () => void;
	getState: () => StateData;
	setState: (newState: any) => void;
	subscribe: (cb: () => any) => void;
	signup: (userData: any) => Promise<boolean>;
	signin: (userData: any) => Promise<boolean>;
	logout: () => Promise<boolean>;
	setCurrentPosition: () => Promise<any>;
	getDatosPersonales: () => any;
	updateDatosPersonales: (props: {
		fullname: string;
		localidad: string;
	}) => any;
	updatePassword: (pass: string, confirm: string) => any;
	getLostPets: () => Promise<boolean>;
	getUserLostPets: () => Promise<boolean>;
	reportPet: (data: any) => Promise<boolean>;
	resetState: () => void;
}

export type { State };
