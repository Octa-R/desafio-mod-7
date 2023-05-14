import axios from "axios";

async function urlToBase64(url: string): Promise<string> {
	const response = await axios.get(url, {
		responseType: "blob",
	});
	const blob = await response.data;
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const base64 = reader.result!.toString();
			resolve(base64);
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}

export { urlToBase64 };
