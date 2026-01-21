const { de } = require("zod/v4/locales");

const otpEmailTemplate = (otpCode, userName = "User", type = "verify") => {
  const accentColor = "#7C3AED"; 
  const lightBg = "#F5F3FF";     
  const textColor = "#1F2937";   

  // Dynamic Content based on the "type" of email
  const content = {
    verify: {
      title: "Verify your email",
      body: "Use the verification code below to complete your sign-up."
    },
    reset: {
      title: "Reset your password",
      body: "We received a request to reset your password. Use the code below to proceed."
    }
  };

  const selected = content[type] || content.verify;

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f9fafb; padding: 40px 10px; min-width: 100%;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <tr>
          <td style="padding: 30px 40px; text-align: center; border-bottom: 1px solid #f3f4f6;">
            <h1 style="color: ${accentColor}; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -1px;">Siglyk</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px;">
            <h2 style="color: ${textColor}; margin: 0 0 20px; font-size: 22px; text-align: center;">${selected.title}</h2>
            <p style="color: #4B5563; font-size: 16px; line-height: 24px; text-align: center; margin: 0 0 30px;">
              Hello <strong>${userName}</strong>,<br>
              ${selected.body}
            </p>
            <div style="text-align: center; background-color: ${lightBg}; padding: 25px; border-radius: 8px; border: 2px solid ${accentColor};">
              <span style="font-size: 36px; font-weight: 800; color: ${accentColor}; letter-spacing: 10px; font-family: 'Courier New', Courier, monospace;">
                ${otpCode}
              </span>
            </div>
            <p style="color: #9CA3AF; font-size: 13px; text-align: center; margin-top: 30px;">
              This code expires in <strong>5 minutes</strong>. If you didn't request this, you can safely ignore this email.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #f3f4f6;">
            <p style="color: #9CA3AF; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Siglyk Inc. | Hubballi, Karnataka</p>
          </td>
        </tr>
      </table>
    </div>
  `;
};

export default otpEmailTemplate;