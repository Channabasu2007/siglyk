"use client";
import React, { useState, useRef, useEffect } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Loader from "@/components/ui/Loader";

const EmailVerification = ({ email, onBack, onVerifySuccess }) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [activeInput, setActiveInput] = useState(0);
    const [timer, setTimer] = useState(120);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleOnChange = ({ target }, index) => {
        const { value } = target;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);

        if (!value) {
            if (index > 0) setActiveInput(index - 1);
        } else {
            if (index < 5) setActiveInput(index + 1);
        }

        setOtp(newOtp);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            setActiveInput(index - 1);
        }
    };

    useEffect(() => {
        inputRefs.current[activeInput]?.focus();
    }, [activeInput]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalOtp = otp.join("");
        if (finalOtp.length < 6) return setError("Please enter all 6 digits");
        setError("");
        console.log("Verifying OTP:", finalOtp);   
        onVerifySuccess(finalOtp);
    };

    if (isLoading) return <Loader />;

    return (
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-120 bg-light-primary rounded-xl shadow-sm border border-light-secondary/20 overflow-hidden">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex gap-2">
                            <div className="h-2 w-8 rounded-full bg-light-secondary"></div>
                            <div className="h-2 w-8 rounded-full bg-light-secondary"></div>
                            <div className="h-2 w-8 rounded-full bg-light-secondary/20"></div>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-light-secondary">Step 2 of 3</span>
                    </div>

                    <div className="mb-6 text-center">
                        <h1 className="text-dark-primary tracking-tight text-[32px] font-bold leading-tight">Email Verification</h1>
                        <p className="text-light-secondary/60 text-base font-normal leading-normal mt-2">
                            Please enter the 6-digit code sent to
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-8 p-2 rounded-lg bg-light-secondary/5 border border-light-secondary/10 w-fit mx-auto px-4">
                        <span className="text-dark-primary font-medium text-sm">{email}</span>
                        <button
                            onClick={onBack}
                            className="text-light-secondary hover:bg-light-secondary/10 p-1 rounded-full transition-colors"
                            title="Edit Email"
                        >
                            <span className="material-symbols-outlined text-lg align-middle">edit</span>
                        </button>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="flex gap-2 sm:gap-3 justify-center">
                            {otp.map((_, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-lg text-dark-primary border border-light-secondary/30 bg-light-primary focus:outline-none focus:border-light-secondary focus:ring-2 focus:ring-light-secondary/20 transition-all"
                                    type="text"
                                    value={otp[index]}
                                    onChange={(e) => handleOnChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <PrimaryButton type="submit" className="w-full h-14" label="Verify Email" />

                        <div className="text-center">
                            <p className="text-light-secondary/60 text-sm">
                                Didn't receive the code?
                                <button
                                    type="button"
                                    disabled={timer > 0}
                                    className={`ml-1 font-bold ${timer > 0 ? 'text-light-secondary/40' : 'text-light-secondary hover:underline cursor-pointer'}`}
                                >
                                    {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default EmailVerification;