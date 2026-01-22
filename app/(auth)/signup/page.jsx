"use client";
import React, { useState } from 'react';
import EmailRequest from '@/components/auth/EmailRequest';
import EmailVerification from '@/components/auth/EmailVerification';
import ProfileDetails from '@/components/auth/ProfileDetails';

const SignupPage = () => {
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
    const handleVerifySuccess = (otpValue) => {
        setSignupData((prev) => ({ ...prev, otp: otpValue }));
        setStep(3); 
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

            {/* Step 3: Profile Creation (Placeholder) */}
            {step === 3 && (
                <ProfileDetails 
                    email={signupData.email} 
                    otp={signupData.otp} 
                />
            )}
        </div>
    );
};

export default SignupPage;