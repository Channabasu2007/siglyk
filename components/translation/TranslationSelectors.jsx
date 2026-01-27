"use client";
import React, { useState, useRef, useEffect } from 'react';
import signLanguages from '@/data/signLanguages.json';
import spokenLanguages from '@/data/languages.json';

const TranslationSelectors = ({ source, setSource, target, setTarget }) => {
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);
  
  const sourceRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sourceRef.current && !sourceRef.current.contains(e.target)) setIsSourceOpen(false);
      if (targetRef.current && !targetRef.current.contains(e.target)) setIsTargetOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwap = () => {
    const temp = source;
    setSource(target);
    setTarget(temp);
  };

  return (
    <section className="px-2 md:px-4 py-2 bg-light-primary border-b border-light-secondary/10 sticky top-15 z-40">
      <div className="flex flex-row items-center justify-between gap-1.5 max-w-4xl mx-auto">
        
        {/* Source Selector */}
        <div className="relative flex-1 min-w-0" ref={sourceRef}>
          <label className="text-[9px] md:text-[10px] uppercase font-black text-light-secondary/50 ml-1 mb-0.5 block truncate">
            Source
          </label>
          <button 
            onClick={() => setIsSourceOpen(!isSourceOpen)}
            className="w-full flex items-center justify-between gap-1 px-2 md:px-3 py-2 bg-light-secondary/5 border border-light-secondary/10 rounded-xl hover:border-light-secondary/40 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-1.5 overflow-hidden min-w-0">
              <span className="material-symbols-outlined text-light-secondary text-[18px] md:text-lg shrink-0">hand_gesture</span>
              <span className="text-xs md:text-sm font-bold text-dark-primary truncate">
                {signLanguages.find(l => l.id === source)?.label || source}
              </span>
            </div>
            <span className={`material-symbols-outlined text-gray-400 text-[18px] transition-transform shrink-0 ${isSourceOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </button>

          {isSourceOpen && (
            <div className="absolute top-full left-0 w-[160%] md:w-full mt-2 bg-light-primary border border-light-secondary/20 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto animate-in fade-in zoom-in duration-200">
              {signLanguages.map((lang) => (
                <div 
                  key={lang.id}
                  onClick={() => { setSource(lang.id); setIsSourceOpen(false); }}
                  className="px-4 py-3 text-sm font-medium text-dark-primary hover:bg-light-secondary/5 cursor-pointer flex justify-between items-center"
                >
                  <span className="truncate mr-2">{lang.label}</span>
                  <span className="text-[10px] font-bold text-light-secondary bg-light-secondary/10 px-1.5 py-0.5 rounded uppercase">{lang.id}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Compact Swap Button */}
        <div className="pt-4 shrink-0">
          <button 
            onClick={handleSwap}
            className="size-8 md:size-10 flex items-center justify-center bg-light-secondary text-light-primary rounded-full shadow-md active:rotate-180 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-lg md:text-xl">swap_horiz</span>
          </button>
        </div>

        {/* Target Selector */}
        <div className="relative flex-1 min-w-0" ref={targetRef}>
          <label className="text-[9px] md:text-[10px] uppercase font-black text-light-secondary/50 ml-1 mb-0.5 block truncate">
            Output
          </label>
          <button 
            onClick={() => setIsTargetOpen(!isTargetOpen)}
            className="w-full flex items-center justify-between gap-1 px-2 md:px-3 py-2 bg-light-secondary/5 border border-light-secondary/10 rounded-xl hover:border-light-secondary/40 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-1.5 overflow-hidden min-w-0">
              <span className="material-symbols-outlined text-light-secondary text-[18px] md:text-lg shrink-0">translate</span>
              <span className="text-xs md:text-sm font-bold text-dark-primary truncate">
                {spokenLanguages.find(l => l.id === target)?.label || target}
              </span>
            </div>
            <span className={`material-symbols-outlined text-gray-400 text-[18px] transition-transform shrink-0 ${isTargetOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </button>

          {isTargetOpen && (
            <div className="absolute top-full right-0 w-[160%] md:w-full mt-2 bg-light-primary border border-light-secondary/20 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto animate-in fade-in zoom-in duration-200">
              {spokenLanguages.map((lang) => (
                <div 
                  key={lang.id}
                  onClick={() => { setTarget(lang.id); setIsTargetOpen(false); }}
                  className="px-4 py-3 text-sm font-medium text-dark-primary hover:bg-light-secondary/5 cursor-pointer flex justify-between items-center"
                >
                  <span className="truncate mr-2">{lang.label}</span>
                  <span className="text-[10px] font-bold text-light-secondary bg-light-secondary/10 px-1.5 py-0.5 rounded uppercase">{lang.id}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TranslationSelectors;