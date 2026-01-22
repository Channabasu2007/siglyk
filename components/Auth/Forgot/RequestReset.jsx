"use client";
import React, { useState } from 'react';
import PrimaryButton from '../../Buttons/PrimaryButton';
import Loader from '@/components/ui/Loader';

const RequestReset = ({ onEmailSent }) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        console.log("Submitting email for password reset:", email);
        onEmailSent(email);
    };

    if (isLoading) return <Loader />;

    return (
        <main className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-120 bg-light-primary rounded-xl shadow-sm border border-light-secondary/20 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-dark-primary text-[28px] font-bold">Forgot Password?</h1>
                    <p className="text-light-secondary/60 text-sm mt-2">Enter your email to receive a reset code.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-dark-primary text-sm font-medium">Email Address</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50">mail</span>
                            <input 
                                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-light-secondary/30 h-14 pl-12 pr-4 text-base focus:ring-2 focus:ring-light-secondary/20"
                                placeholder="name@example.com"
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs">{error}</p>}
                    </div>
                    <PrimaryButton type="submit" className="w-full h-14" label="Send Code" />
                </form>
            </div>
        </main>
    );
};

export default RequestReset;