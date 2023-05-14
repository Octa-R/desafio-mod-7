interface StateData {
	jwtToken?: string;
	errorMessage?: string;
	currentPosition?: { lat?: string; lng?: string; acc?: string };
	userIsLoggedIn?: boolean;
	email?: string;
	password?: string;
	lostPetsList?: [];
	fullname?: string;
	localidad?: string;
	petIdSelected?: string;
}
export type { StateData };
