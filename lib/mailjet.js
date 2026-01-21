import Mailjet from 'node-mailjet';

const apiKey = process.env.MAILJET_API_KEY;
const apiSecret = process.env.MAILJET_SECRET_KEY;

// Only initialize if keys exist to prevent the "API_KEY is required" crash
const mailjet = (apiKey && apiSecret) 
  ? new Mailjet({ apiKey, apiSecret }) 
  : null;

if (!mailjet) {
  console.warn("⚠️ Mailjet keys are missing. Email service will not work.");
}

export default mailjet;