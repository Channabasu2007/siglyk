"use client";
import React, { useState } from 'react';
import RequestReset from '@/components/auth/Forgot/RequestReset';
import ResetOTP from '@/components/auth/Forgot/verifyOtp';
import NewPassword from '@/components/auth/Forgot/NewPassword';

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1);
    const [resetData, setResetData] = useState({ email: "", otp: "" });

    const handleEmailSubmitted = (email) => {
        setResetData(prev => ({ ...prev, email }));
        setStep(2);
    };

    const handleOTPVerified = (otp) => {
        setResetData(prev => ({ ...prev, otp }));
        
        setStep(3);
    };

    return (
        <div className="min-h-screen bg-light-primary flex flex-col">
            {step === 1 && <RequestReset onEmailSent={handleEmailSubmitted} />}
            {step === 2 && (
                <ResetOTP
                    email={resetData.email}
                    onBack={() => setStep(1)}
                    onVerifySuccess={handleOTPVerified}
                />
            )}
            {step === 3 && (
                <NewPassword
                    email={resetData.email}
                    otp={resetData.otp}
                    onComplete={() => window.location.href = '/signin'}
                />
            )}
        </div>
    );
};

export default ForgotPasswordPage;