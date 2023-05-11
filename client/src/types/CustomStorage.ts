class CustomStorage {
	save(key: string, data: {}) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	get(key: string): {} {
		const data: string = localStorage.getItem(key) || "undefined";
		if (data != "undefined") {
			return JSON.parse(data);
		}
		return {};
	}
}
export { CustomStorage };
