"use client";
import React, { useState, useRef, useEffect } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Loader from "@/components/ui/Loader";
import nationsData from '../../data/nations.json';
import signLanguagesData from '../../data/signLanguages.json';
import { handleSignOut } from "@/controllers/authQuickActions.controller";

const ProfileSettings = ({ onClose, onCreateOrg }) => {
  const [formData, setFormData] = useState({
    username: "",
    nationality: "",
    preference: "sign",
    preferredSignLanguage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isOpenNationality, setIsOpenNationality] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  
  const nationalityRef = useRef(null);
  const languageRef = useRef(null);

  const NATIONS = [...nationsData].sort();
  const SIGN_LANGUAGES = [...signLanguagesData].sort((a, b) => a.label.localeCompare(b.label));

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            username: data.username || "",
            nationality: data.nationality || "",
            preference: data.preference?.toLowerCase() || "sign",
            preferredSignLanguage: data.preferredSignLanguage || "",
          });
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nationalityRef.current && !nationalityRef.current.contains(event.target)) setIsOpenNationality(false);
      if (languageRef.current && !languageRef.current.contains(event.target)) setIsOpenLanguage(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) onClose();
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsOpenNationality(false);
    setIsOpenLanguage(false);
  };

  if (loading) return (
    <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/20 backdrop-blur-sm md:absolute md:inset-auto md:top-full md:right-0 md:mt-4 md:w-80 md:h-96">
      <div className="bg-light-primary p-8 rounded-xl shadow-2xl"><Loader /></div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop - Only visible on small screens to prevent interaction with the background */}
      <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm md:hidden" onClick={onClose} />

      <div className={`
        /* Mobile: Centered Modal */
        fixed inset-x-4 top-[10%] bottom-auto z-101 max-h-[80vh] overflow-y-auto
        /* Desktop: Floating Dropdown */
        md:absolute md:inset-auto md:top-full md:right-0 md:mt-4 md:w-112.5 md:max-h-none
        
        bg-light-primary rounded-2xl shadow-2xl border border-light-secondary/20 animate-in fade-in zoom-in-95 duration-200
      `}>
        <div className="p-6 md:p-8">
          <div className="mb-6 flex justify-between items-center sticky top-0 bg-light-primary z-10 pb-2 border-b border-gray-100 md:border-none md:pb-0">
            <h2 className="text-dark-primary text-xl md:text-2xl font-bold tracking-tight">Profile Settings</h2>
            <button onClick={onClose} className="p-2 -mr-2 text-light-secondary/40 hover:text-light-secondary transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSave}>
            <div className="flex flex-col gap-2">
              <label className="text-dark-primary text-sm font-semibold">Username</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">account_circle</span>
                <input
                  name="username"
                  className="flex w-full rounded-lg text-dark-primary border border-light-secondary/30 bg-light-primary h-12 pl-11 pr-4 text-base focus:ring-2 focus:ring-light-secondary/20 focus:outline-0 transition-all"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2" ref={nationalityRef}>
                <label className="text-dark-primary text-sm font-semibold">Nationality</label>
                <div className="relative">
                  <div onClick={() => setIsOpenNationality(!isOpenNationality)} className="flex items-center w-full rounded-lg text-dark-primary border border-light-secondary/30 h-12 pl-11 pr-10 text-base cursor-pointer hover:border-light-secondary/60">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">flag</span>
                    <span className="truncate">{formData.nationality || "Select"}</span>
                    <span className={`material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50 transition-transform ${isOpenNationality ? 'rotate-180' : ''}`}>expand_more</span>
                  </div>
                  {isOpenNationality && (
                    <div className="absolute z-120 top-full left-0 w-full mt-1 max-h-48 overflow-y-auto bg-light-primary border border-gray-100 rounded-lg shadow-xl">
                      {NATIONS.map((country) => (
                        <div key={country} onClick={() => handleSelect("nationality", country)} className="px-11 py-3 text-sm hover:bg-gray-50 cursor-pointer">{country}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-dark-primary text-sm font-semibold">Preference</label>
                <div className="bg-light-secondary/5 p-1 rounded-lg border border-light-secondary/20 flex h-12">
                  {['sign', 'speech'].map(pref => (
                    <label key={pref} className="flex-1 cursor-pointer">
                      <input className="sr-only peer" name="preference" type="radio" value={pref} checked={formData.preference === pref} onChange={handleChange} />
                      <div className="w-full h-full flex items-center justify-center gap-2 rounded text-sm font-bold peer-checked:bg-light-primary peer-checked:shadow-sm transition-all capitalize">
                        <span className="material-symbols-outlined text-[18px] hidden md:inline">{pref === 'sign' ? 'sign_language' : 'record_voice_over'}</span> {pref}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {formData.preference === 'sign' && (
              <div className="flex flex-col gap-2" ref={languageRef}>
                <label className="text-dark-primary text-sm font-semibold">Sign Language</label>
                <div className="relative">
                  <div onClick={() => setIsOpenLanguage(!isOpenLanguage)} className="flex items-center w-full rounded-lg border border-light-secondary/30 h-12 pl-11 pr-10 text-base cursor-pointer">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary/50 text-[20px]">translate</span>
                    <span className="truncate">{SIGN_LANGUAGES.find(l => l.id === formData.preferredSignLanguage)?.label || "Select Language"}</span>
                    <span className={`material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary/50 transition-transform ${isOpenLanguage ? 'rotate-180' : ''}`}>expand_more</span>
                  </div>
                  {isOpenLanguage && (
                    <div className="absolute z-120 top-full left-0 w-full mt-1 max-h-48 overflow-y-auto bg-light-primary border border-gray-100 rounded-lg shadow-xl">
                      {SIGN_LANGUAGES.map((lang) => (
                        <div key={lang.id} onClick={() => handleSelect("preferredSignLanguage", lang.id)} className="px-11 py-3 text-sm hover:bg-gray-50 cursor-pointer flex justify-between">
                          <span>{lang.label}</span>
                          <span className="text-[10px] opacity-40 font-bold">{lang.id}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4 space-y-4">
              <PrimaryButton type="submit" label={saving ? "Saving..." : "Save Changes"} className="w-full h-14 md:h-12" disabled={saving} />
              
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-light-secondary/10"></span></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-light-secondary/40"><span className="bg-light-primary px-2">Organization</span></div>
              </div>

              <SecondaryButton label="Create Organization" onClick={onCreateOrg} className="w-full h-14 md:h-12 border-dashed border-2" />
              
              <button type="button" onClick={() => handleSignOut()} className="w-full flex items-center justify-center gap-2 text-red-500 font-bold text-sm py-4 border-t border-gray-100 transition-colors active:bg-red-50">
                <span className="material-symbols-outlined">logout</span> Sign Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;