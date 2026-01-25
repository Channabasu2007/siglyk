import sendEmailVerification from "@/controllers/emailVerification.controller";

export async function POST(request) {
    const { email, otp, name, type } = await request.json();
    const result = await sendEmailVerification(email, otp, name, type);

    if (result.success) {
        return new Response(JSON.stringify({ message: "Email sent successfully", data: result.data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Failed to send email", error: result.error }), { status: 500 });
    }
}