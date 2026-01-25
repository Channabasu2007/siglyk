"use client";
import React, { useState, useRef, useEffect } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import Loader from '@/components/ui/Loader';
import nationsData from '../../data/nations.json';
import signLanguagesData from '../../data/signLanguages.json';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ProfileDetails = ({ onComplete }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isOpenNationality, setIsOpenNationality] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);

  const nationalityRef = useRef(null);
  const languageRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    nationality: "",
    preference: "sign",
    preferredSignLanguage: "",
    role: "individual",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const NATIONS = [...nationsData].sort();
  const SIGN_LANGUAGES = [...signLanguagesData].sort((a, b) => a.label.localeCompare(b.label));

  // Password validation helper
  const getPasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
    return checks;
  };

  const passwordChecks = getPasswordStrength(formData.password);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nationalityRef.current && !nationalityRef.current.contains(event.target)) {
        setIsOpenNationality(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsOpenLanguage(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSelect = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsOpenNationality(false);
    setIsOpenLanguage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!isPasswordValid) {
      return setError("Password must meet all requirements");
    }

    if (!formData.nationality) {
      return setError("Please select your nationality");
    }

    if (formData.preference === 'sign' && !formData.preferredSignLanguage) {
      return setError("Please select your preferred sign language");
    }

    if (!session?.user?.email) {
      return setError("Session expired. Please sign in again.");
    }

    setError("");
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        email: session.user.email,
      };

      const res = await fetch("/api/profileComplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to complete profile");
      }

      router.push("/translation");
    } catch (err) {
      setError(err.message || "Failed to complete profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || status === "loading") return <Loader />;

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-135 bg-light-primary rounded-xl shadow-sm border border-light-secondary/20 overflow-hidden">
        <div className="bg-light-secondary/10 h-1 w-full">
          <div className="bg-light-secondary h-full w-full"></div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-light-secondary">Step 3 of 3</span>
            <span className="text-xs font-medium text-light-secondary/60">Registration Profile</span>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-dark-primary tracking-tight text-2xl md:text-[32px] font-bold leading-tight">Complete Registration</h1>
            <p className="text-light-secondary/60 text-base font-normal leading-normal mt-2">Finalize your profile to start using Siglyk.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-dark-primary text-sm font-semibold">Username</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">account_circle</span>
                <input
                  name="username"
                  required
                  disabled={isLoading}
                  className="flex w-full rounded-lg text-dark-primary border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-4 text-sm focus:ring-2 focus:ring-light-secondary/20 focus:outline-0 transition-all disabled:opacity-50"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2" ref={nationalityRef}>
                <label className="text-dark-primary text-sm font-semibold">Nationality</label>
                <div className="relative">
                  <div
                    onClick={() => !isLoading && setIsOpenNationality(!isOpenNationality)}
                    className="flex items-center w-full rounded-lg text-dark-primary border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-10 text-sm cursor-pointer hover:border-light-secondary/60 transition-all"
                  >
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">flag</span>
                    <span className={formData.nationality ? "text-dark-primary" : "text-light-secondary/50"}>
                      {formData.nationality || "Select Country"}
                    </span>
                    <span
                      className={`material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50 transition-transform duration-300 ${isOpenNationality ? 'rotate-180' : 'rotate-0'}`}
                    >
                      expand_more
                    </span>
                  </div>

                  {isOpenNationality && (
                    <div className="absolute z-50 top-full left-0 w-full mt-1 max-h-60 overflow-y-auto bg-light-primary border border-light-secondary/20 rounded-lg shadow-xl">
                      {NATIONS.map((country) => (
                        <div key={country} onClick={() => handleSelect("nationality", country)} className="px-11 py-3 text-sm text-dark-primary hover:bg-light-secondary/5 cursor-pointer transition-colors">
                          {country}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-dark-primary text-sm font-semibold">Preference</label>
                <div className="bg-light-secondary/5 p-1 rounded-lg border border-light-secondary/20 flex h-12 relative">
                  {['sign', 'speech'].map(pref => (
                    <label key={pref} className="flex-1 relative cursor-pointer z-10">
                      <input
                        className="peer sr-only"
                        name="preference"
                        type="radio"
                        value={pref}
                        checked={formData.preference === pref}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      <div className="w-full h-full flex items-center justify-center gap-2 rounded text-sm font-medium text-light-secondary peer-checked:bg-light-primary peer-checked:shadow-sm transition-all capitalize">
                        <span className="material-symbols-outlined text-[18px]">{pref === 'sign' ? 'sign_language' : 'record_voice_over'}</span> {pref}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {formData.preference === 'sign' && (
              <div className="flex flex-col gap-2" ref={languageRef}>
  <label className="text-dark-primary text-sm font-semibold">Primary Sign Language</label>
  <div className="relative">
    <div
      onClick={() => !isLoading && setIsOpenLanguage(!isOpenLanguage)}
      className="flex items-center w-full rounded-lg text-dark-primary border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-10 text-sm cursor-pointer hover:border-light-secondary/60 transition-all"
    >
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">translate</span>
      <span className={formData.preferredSignLanguage ? "text-dark-primary" : "text-light-secondary/50"}>
        {SIGN_LANGUAGES.find(l => l.id === formData.preferredSignLanguage)?.label || "Select Language"}
      </span>
      <span 
        className={`material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50 transition-transform duration-300 ${isOpenLanguage ? 'rotate-180' : 'rotate-0'}`}
      >
        expand_more
      </span>
    </div>

    {isOpenLanguage && (
      <div className="absolute z-50 top-full left-0 w-full mt-1 max-h-60 overflow-y-auto bg-light-primary border border-light-secondary/20 rounded-lg shadow-xl">
        {SIGN_LANGUAGES.map((lang) => (
          <div key={lang.id} onClick={() => handleSelect("preferredSignLanguage", lang.id)} className="px-11 py-3 text-sm text-dark-primary hover:bg-light-secondary/5 cursor-pointer transition-colors flex justify-between">
            <span>{lang.label}</span>
            <span className="text-[10px] text-light-secondary/40 font-bold uppercase">{lang.id}</span>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-dark-primary text-sm font-semibold">Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                {['individual', 'admin'].map((role) => (
                  <label key={role} className="cursor-pointer relative">
                    <input
                      className="peer sr-only"
                      name="role"
                      type="radio"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-light-secondary/20 bg-light-secondary/5 hover:border-light-secondary/50 transition-all peer-checked:border-light-secondary peer-checked:bg-light-secondary/10 peer-checked:ring-1 peer-checked:ring-light-secondary h-24">
                      <span className="material-symbols-outlined text-light-secondary text-2xl">
                        {role === 'individual' ? 'person' : 'admin_panel_settings'}
                      </span>
                      <span className="text-[10px] md:text-xs font-medium text-center text-dark-primary capitalize">
                        {role === 'admin' ? 'Organization Admin' : 'Individual'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 relative">
                <label className="text-dark-primary text-sm font-semibold">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">lock</span>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    className="w-full rounded-lg border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-11 text-sm focus:ring-2 focus:ring-light-secondary/20 focus:outline-0 transition-all disabled:opacity-50"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50 hover:text-light-secondary transition-colors" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <p className={`text-xs flex items-center gap-1 ${passwordChecks.length ? 'text-green-600' : 'text-light-secondary/60'}`}>
                      <span className="material-symbols-outlined text-[14px]">{passwordChecks.length ? 'check_circle' : 'cancel'}</span>
                      At least 8 characters
                    </p>
                    <p className={`text-xs flex items-center gap-1 ${passwordChecks.lowercase ? 'text-green-600' : 'text-light-secondary/60'}`}>
                      <span className="material-symbols-outlined text-[14px]">{passwordChecks.lowercase ? 'check_circle' : 'cancel'}</span>
                      One lowercase letter
                    </p>
                    <p className={`text-xs flex items-center gap-1 ${passwordChecks.uppercase ? 'text-green-600' : 'text-light-secondary/60'}`}>
                      <span className="material-symbols-outlined text-[14px]">{passwordChecks.uppercase ? 'check_circle' : 'cancel'}</span>
                      One uppercase letter
                    </p>
                    <p className={`text-xs flex items-center gap-1 ${passwordChecks.number ? 'text-green-600' : 'text-light-secondary/60'}`}>
                      <span className="material-symbols-outlined text-[14px]">{passwordChecks.number ? 'check_circle' : 'cancel'}</span>
                      One number
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-dark-primary text-sm font-semibold">Confirm</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">lock_reset</span>
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    className="w-full rounded-lg border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-11 text-sm focus:ring-2 focus:ring-light-secondary/20 focus:outline-0 transition-all disabled:opacity-50"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50 hover:text-light-secondary transition-colors" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

            <PrimaryButton
              type="submit"
              className="w-full h-14"
              label={isLoading ? "Completing..." : "Complete Registration"}
              disabled={isLoading}
              icon={<span className="material-symbols-outlined">arrow_forward</span>}
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfileDetails;