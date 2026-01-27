"use client";
import React, { useState } from 'react';
import SecondaryButton from '@/components/buttons/SecondaryButton';

const WorkspaceControls = () => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section className="px-4 py-6 grid grid-cols-2 gap-3">
      <SecondaryButton 
        onClick={() => setIsMuted(!isMuted)}
        label={isMuted ? "Unmute Voice" : "Mute Output"}
        icon={<span className="material-symbols-outlined">{isMuted ? 'volume_off' : 'volume_up'}</span>}
        className="w-full"
      />
      <SecondaryButton 
        label="Copy Text"
        icon={<span className="material-symbols-outlined">content_copy</span>}
        className="w-full"
      />
      <SecondaryButton 
        label="Speak To Gesture"
        icon={<span className="material-symbols-outlined">front_hand</span>}
        className="w-full col-span-2 border-dashed"
      />
    </section>
  );
};

export default WorkspaceControls;