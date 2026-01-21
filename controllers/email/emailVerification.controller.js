import mailjet from "@/lib/mailjet";
import otpEmailTemplate from "@/utils/emailTemplates/emailVerification.template";


const sendEmailVerification = async (email, otp, name = "User", type = "verify") => {
  try {
    // Dynamic Subject Line based on the flow
    const subject = type === "reset" 
      ? "Reset your Siglyk Account Password" 
      : "Verify your Siglyk Account";

    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM,
            Name: "Siglyk Email Verification Service",
          },
          To: [{ Email: email, Name: name }],
          Subject: subject,
          // We pass the type to the template to change the Heading and Body text
          HTMLPart: otpEmailTemplate(otp, name, type), 
        },
      ],
    });

    
    return { success: true, data: request.body };
  } catch (error) {
    console.error("❌ Mailjet Error:", error.statusCode, error.response?.body || error.message);
    return { success: false, error: error.message };
  }
};

export default sendEmailVerification;