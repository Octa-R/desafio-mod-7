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
	getDatosPersonales: () => Promise<any>;
	updateDatosPersonales: (props: {
		fullname: string;
		localidad: string;
	}) => any;
	updatePassword: (pass: string, confirm: string) => any;
	getLostPets: () => Promise<any[]>;
	getUserLostPets: () => Promise<any[]>;
	getReportedPetData: (petId: string) => Promise<any[]>;
	reportPet: (data: any) => Promise<boolean>;
	resetState: () => void;
	updateLostPetReport: (data: any) => Promise<boolean>;
	updateReportAsFinded: (petId: string) => Promise<boolean>;
	sendSeenReport: (seenData: any, petId: any) => Promise<boolean>;
}

export type { State };
