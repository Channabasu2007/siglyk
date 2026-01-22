"use client";
import React, { useState, useRef, useEffect } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton";

const ResetOTP = ({ email, onBack, onVerifySuccess }) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [activeInput, setActiveInput] = useState(0);
    const inputRefs = useRef([]);

    useEffect(() => { inputRefs.current[activeInput]?.focus(); }, [activeInput]);

    const handleOnChange = ({ target }, index) => {
        const value = target.value.substring(target.value.length - 1);
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (!value) { if (index > 0) setActiveInput(index - 1); }
        else { if (index < 5) setActiveInput(index + 1); }
    };

    return (
        <main className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-120 bg-light-primary rounded-xl shadow-sm border border-light-secondary/20 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-dark-primary text-[28px] font-bold">Verify Identity</h1>
                    <p className="text-light-secondary/60 text-sm mt-2">Enter the code sent to {email}</p>
                </div>
                <div className="flex gap-2 justify-center mb-8">
                    {otp.map((_, i) => (
                        <input key={i} ref={el => inputRefs.current[i] = el}
                            className="w-12 h-14 text-center text-2xl font-bold rounded-lg border border-light-secondary/30 bg-light-primary focus:ring-2"
                            value={otp[i]} onChange={(e) => handleOnChange(e, i)}
                        />
                    ))}
                </div>
                <PrimaryButton className="w-full h-14" label="Verify Code" onClick={() => onVerifySuccess(otp.join(""))} />
                <button onClick={onBack} className="w-full mt-4 text-sm text-light-secondary font-bold hover:underline">Change Email</button>
            </div>
        </main>
    );
};

export default ResetOTP;