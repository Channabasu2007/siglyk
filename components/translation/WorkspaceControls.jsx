"use client";
import React, { useState } from 'react';
import SecondaryButton from '@/components/buttons/SecondaryButton';

const WorkspaceControls = ({ mode, onToggle }) => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section className="px-4 py-6 flex flex-col gap-3">
      {/* Action Row */}
      <div className="grid grid-cols-2 gap-3">
        <SecondaryButton 
          onClick={() => setIsMuted(!isMuted)}
          label={isMuted ? "Unmute" : "Mute"}
          icon={<span className="material-symbols-outlined">{isMuted ? 'volume_off' : 'volume_up'}</span>}
          className="w-full"
        />
        <SecondaryButton 
          onClick={() => alert("Copied!")}
          label="Copy Text"
          icon={<span className="material-symbols-outlined">content_copy</span>}
          className="w-full"
        />
      </div>

      {/* Mode Switch Row */}
      <button 
        onClick={onToggle}
        className={`w-full h-14 flex items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all duration-300 
          ${mode === 'S2T' 
            ? 'border-light-secondary/20 bg-light-secondary/5 text-light-secondary' 
            : 'border-light-secondary/50 bg-light-primary text-light-secondary'}`}
      >
        <span className="material-symbols-outlined">
          {mode === 'S2T' ? 'front_hand' : 'videocam'}
        </span>
        <span className="text-sm font-bold">
          {mode === 'S2T' ? "Switch to Speak-to-Gesture" : "Switch to Sign-to-Text"}
        </span>
      </button>
    </section>
  );
};

export default WorkspaceControls;