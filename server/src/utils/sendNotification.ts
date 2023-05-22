import { sgMail } from "../lib/sendgrid";

async function sendNotification({
	petName,
	contactPhone,
	description,
	personName,
	destinationMail,
}) {
	const msg = {
		to: destinationMail,
		from: "ruarteoctavio8@gmail.com",
		subject: `se reporto tu mascota ${petName} como vista!`,
		text: `nombre:${personName} teléfono:${contactPhone} donde la vio:${description}`,
	};
	const ok = await sgMail.send(msg);
	if (!ok) {
		console.error("error de envio de mail", ok);
	} else {
		console.log("mail enviado con exito", ok);
	}
}

export { sendNotification };
