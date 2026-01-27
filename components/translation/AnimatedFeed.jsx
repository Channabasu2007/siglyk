"use client";
import React, { useState } from 'react';
import PrimaryButton from '@/components/buttons/PrimaryButton';

const AnimationFeed = ({ isLive, onToggle }) => {
  return (
    <section className="px-2 md:px-4 py-4">
      <div className="relative aspect-video w-full bg-slate-900 rounded-3xl border-2 border-light-secondary/20 overflow-hidden shadow-2xl">
        
        {/* Animation Container */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${isLive ? 'opacity-100' : 'opacity-20'}`}>
          {/* Replace this with your 3D Avatar Canvas or Animation Video */}
          <div className="relative flex flex-col items-center">
            <span className="material-symbols-outlined text-[120px] text-light-secondary/40 animate-pulse">
              accessibility_new
            </span>
            {isLive && (
               <div className="mt-4 px-4 py-2 bg-light-secondary/10 rounded-full border border-light-secondary/20">
                 <p className="text-[10px] font-black uppercase text-light-secondary tracking-widest">Generating Signs...</p>
               </div>
            )}
          </div>
        </div>

        {/* Overlay HUD */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <span className="material-symbols-outlined text-white text-[16px]">record_voice_over</span>
          <span className="text-[10px] text-white font-black uppercase tracking-widest">Speech Listener</span>
        </div>

        {!isLive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Avatar Ready</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <PrimaryButton 
          onClick={onToggle}
          label={isLive ? "Stop Listening" : "Start Voice Input"}
          className={isLive ? "bg-red-500! shadow-red-500/20" : "shadow-light-secondary/20"}
          icon={<span className="material-symbols-outlined">{isLive ? 'mic_off' : 'mic'}</span>}
        />
      </div>
    </section>
  );
};

export default AnimationFeed;