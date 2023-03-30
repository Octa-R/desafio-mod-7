// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import * as sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENGRID_API_KEY || "")

export { sgMail }
