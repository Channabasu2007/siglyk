"use client";
import React, { useState } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import { handleGoogleSignIn, handleEmailSignIn } from '@/controllers/authQuickActions.controller';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';

const SignIn = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        setError("");
        
        try {
            const result = await handleEmailSignIn(
                formData.email,
                formData.password,
                '/translation'
            );

            if (!result.success) {
                setError(result.error || "Sign-In failed. Please try again.");
                return; // ✅ Stop here if error
            }

            // ✅ Only redirect on success
            router.push("/translation");
            
        } catch (error) {
            setError(error.message || "Sign-In failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <Loader />;

    return (
        <main className="flex-1 flex items-center justify-center p-6 bg-light-primary min-h-screen">
            <div className="flex flex-col max-w-120 w-full">
                <div className="bg-light-primary rounded-xl shadow-xl border border-light-secondary/20 p-8 md:p-10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-light-secondary/10 p-3 rounded-full mb-4">
                            <span className="material-symbols-outlined text-light-secondary text-3xl">interpreter_mode</span>
                        </div>
                        <h1 className="text-dark-primary tracking-light text-[28px] font-bold leading-tight text-center">
                            Welcome back
                        </h1>
                        <p className="text-light-secondary/60 text-sm mt-2">Sign in to continue to Siglyk</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-dark-primary text-sm font-medium">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">mail</span>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="flex w-full rounded-lg text-dark-primary focus:outline-0 focus:ring-2 focus:ring-light-secondary/20 border border-light-secondary/30 bg-light-primary h-14 pl-12 pr-4 text-base transition-all disabled:opacity-50"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-dark-primary text-sm font-medium">Password</label>
                                <a className="text-light-secondary text-xs font-semibold hover:underline" href="/forgotPassword">Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">lock</span>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="flex w-full rounded-lg text-dark-primary focus:outline-0 focus:ring-2 focus:ring-light-secondary/20 border border-light-secondary/30 bg-light-primary h-14 pl-12 pr-12 text-base transition-all disabled:opacity-50"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-light-secondary/50 hover:text-light-secondary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[22px]">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>
                        
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        
                        <div className="pt-4">
                            <PrimaryButton
                                type="submit"
                                label={isLoading ? "Signing in..." : "Sign In"}
                                disabled={isLoading}
                                className="w-full h-14 shadow-lg shadow-light-secondary/20"
                            />
                        </div>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-light-secondary/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-light-primary px-2 text-light-secondary/60 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <SecondaryButton
                            onClick={() => handleGoogleSignIn('/translation')}
                            label="Google"
                            disabled={isLoading}
                            className="h-12"
                            icon={
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>
                            }
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-6">
                    <p className="text-light-secondary/60 text-sm">
                        Don't have an account?
                        <a className="text-light-secondary font-bold hover:underline ml-1" href="/signup">Join Siglyk</a>
                    </p>
                    <div className="flex gap-6 text-[10px] text-light-secondary/40 uppercase tracking-widest font-bold">
                        <a className="hover:text-light-secondary transition-colors" href="#">Privacy</a>
                        <a className="hover:text-light-secondary transition-colors" href="#">Terms</a>
                        <a className="hover:text-light-secondary transition-colors" href="#">Accessibility</a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignIn;