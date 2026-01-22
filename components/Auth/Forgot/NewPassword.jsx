"use client";
import React, { useState } from 'react';
import PrimaryButton from '../../Buttons/PrimaryButton';

const NewPassword = ({ email, otp, onComplete }) => {
    const [formData, setFormData] = useState({ password: "", confirm: "" });
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm) return setError("Passwords mismatch");
        console.log("Updating password for:", email, otp, formData.password);
        onComplete();
    };

    return (
        <main className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-120 bg-light-primary rounded-xl shadow-sm border border-light-secondary/20 p-8">
                <h1 className="text-dark-primary text-2xl font-bold text-center mb-8">Create New Password</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50">lock</span>
                        <input 
                            type={showPass ? "text" : "password"} required
                            className="w-full h-12 rounded-lg border border-light-secondary/30 pl-11 pr-11 text-sm"
                            placeholder="New Password"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50" onClick={() => setShowPass(!showPass)}>
                            <span className="material-symbols-outlined">{showPass ? 'visibility_off' : 'visibility'}</span>
                        </button>
                    </div>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50">lock_reset</span>
                        <input 
                            type={showConfirmPass ? "text" : "password"} required
                            className="w-full h-12 rounded-lg border border-light-secondary/30 pl-11 pr-4 text-sm"
                            placeholder="Confirm New Password"
                            onChange={(e) => setFormData({...formData, confirm: e.target.value})}
                        />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                            <span className="material-symbols-outlined">{showConfirmPass ? 'visibility_off' : 'visibility'}</span>
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                    <PrimaryButton type="submit" className="w-full h-14" label="Update Password" />
                </form>
            </div>
        </main>
    );
};

export default NewPassword;