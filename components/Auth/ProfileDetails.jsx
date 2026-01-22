"use client";
import React, { useState, useRef, useEffect } from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';
import Loader from '@/components/ui/Loader';
import nations from '../../data/nations.json';
import signLanguages from '../../data/signLanguages.json';

const ProfileDetails = ({ signupData, onComplete }) => {
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

  const NATIONS = nations.sort();
  const SIGN_LANGUAGES = signLanguages.sort((a, b) => a.label.localeCompare(b.label));

  // Click Outside to Close Logic
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

    setError("");

    console.log("Submitting Profile Data:", formData);
  };

  if (isLoading) return <Loader />;

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
                <input name="username" required className="flex w-full rounded-lg text-dark-primary border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-4 text-sm focus:ring-2 focus:ring-light-secondary/20 focus:outline-0 transition-all" placeholder="Choose a username" value={formData.username} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Custom Nationality Select */}
              <div className="flex flex-col gap-2" ref={nationalityRef}>
                <label className="text-dark-primary text-sm font-semibold">Nationality</label>
                <div className="relative">
                  <div 
                    onClick={() => setIsOpenNationality(!isOpenNationality)}
                    className="flex items-center w-full rounded-lg text-dark-primary border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-10 text-sm cursor-pointer hover:border-light-secondary/60 transition-all"
                  >
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">flag</span>
                    <span className={formData.nationality ? "text-dark-primary" : "text-light-secondary/50"}>
                        {formData.nationality || "Select Country"}
                    </span>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50 transition-transform duration-300" style={{ transform: isOpenNationality ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                  </div>
                  
                  {isOpenNationality && (
                    <div className="absolute z-50 top-full left-0 w-full mt-1 max-h-60 overflow-y-auto bg-light-primary border border-light-secondary/20 rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">
                      {NATIONS.map((country) => (
                        <div key={country} onClick={() => handleSelect("nationality", country)} className="px-11 py-3 text-sm text-dark-primary hover:bg-light-secondary/5 cursor-pointer transition-colors">
                          {country}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Preference Toggle */}
              <div className="flex flex-col gap-2">
                <label className="text-dark-primary text-sm font-semibold">Preference</label>
                <div className="bg-light-secondary/5 p-1 rounded-lg border border-light-secondary/20 flex h-12 relative">
                  {['sign', 'speech'].map(pref => (
                    <label key={pref} className="flex-1 relative cursor-pointer z-10">
                      <input className="peer sr-only" name="preference" type="radio" value={pref} checked={formData.preference === pref} onChange={handleChange} />
                      <div className="w-full h-full flex items-center justify-center gap-2 rounded text-sm font-medium text-light-secondary peer-checked:bg-light-primary peer-checked:shadow-sm transition-all capitalize">
                        <span className="material-symbols-outlined text-[18px]">{pref === 'sign' ? 'sign_language' : 'record_voice_over'}</span> {pref}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Language Select (Conditional) */}
            {formData.preference === 'sign' && (
              <div className="flex flex-col gap-2 animate-in fade-in duration-300" ref={languageRef}>
                <label className="text-dark-primary text-sm font-semibold">Preferred Sign Language</label>
                <div className="relative">
                  <div 
                    onClick={() => setIsOpenLanguage(!isOpenLanguage)}
                    className="flex items-center w-full rounded-lg text-dark-primary border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-10 text-sm cursor-pointer hover:border-light-secondary/60 transition-all"
                  >
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">translate</span>
                    <span className={formData.preferredSignLanguage ? "text-dark-primary" : "text-light-secondary/50"}>
                        {SIGN_LANGUAGES.find(l => l.id === formData.preferredSignLanguage)?.label || "Select Language"}
                    </span>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50 transition-transform duration-300" style={{ transform: isOpenLanguage ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                  </div>

                  {isOpenLanguage && (
                    <div className="absolute z-50 top-full left-0 w-full mt-1 max-h-60 overflow-y-auto bg-light-primary border border-light-secondary/20 rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">
                      {SIGN_LANGUAGES.map((lang) => (
                        <div key={lang.id} onClick={() => handleSelect("preferredSignLanguage", lang.id)} className="px-11 py-3 text-sm text-dark-primary hover:bg-light-secondary/5 cursor-pointer transition-colors">
                          {lang.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Role Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-dark-primary text-sm font-semibold">Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                {['individual', 'admin'].map((role) => (
                  <label key={role} className="cursor-pointer relative">
                    <input className="peer sr-only" name="role" type="radio" value={role} checked={formData.role === role} onChange={handleChange} />
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

            {/* Password Fields with Toggle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 relative">
                <label className="text-dark-primary text-sm font-semibold">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">lock</span>
                  <input name="password" type={showPassword ? "text" : "password"} required className="w-full rounded-lg border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-11 text-sm focus:ring-2" placeholder="********" value={formData.password} onChange={handleChange} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-dark-primary text-sm font-semibold">Confirm</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">lock_reset</span>
                  <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required className="w-full rounded-lg border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-11 text-sm focus:ring-2" placeholder="********" value={formData.confirmPassword} onChange={handleChange} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <PrimaryButton type="submit" className="w-full h-14" label="Complete Registration" icon={<span className="material-symbols-outlined">arrow_forward</span>} />
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfileDetails;