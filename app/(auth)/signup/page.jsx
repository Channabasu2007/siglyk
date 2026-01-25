"use client";
import React, { useState } from 'react';
import EmailRequest from '@/components/auth/EmailRequest';
import EmailVerification from '@/components/auth/EmailVerification';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
    const router = useRouter()
    const [step, setStep] = useState(1);
    const [signupData, setSignupData] = useState({
        email: "",
        otp: ""
    });

    const handleEmailSent = (emailValue) => {
        setSignupData((prev) => ({ ...prev, email: emailValue }));
        setStep(2);
    };
    const handleGoBack = () => {
        setStep(1);
    };

    const handleVerifySuccess = () => {
        router.push("/profileDetails")
    };


    return (
        <div className="min-h-screen bg-light-primary flex flex-col">
            {/* Step 1: Request Email */}
            {step === 1 && (
                <EmailRequest
                    onEmailSent={handleEmailSent}
                    initialEmail={signupData.email}
                />
            )}

            {/* Step 2: Verify OTP */}
            {step === 2 && (
                <EmailVerification
                    email={signupData.email}
                    onBack={handleGoBack}
                    onVerifySuccess={handleVerifySuccess}
                />
            )}

        </div>
    );
};

export default SignupPage;