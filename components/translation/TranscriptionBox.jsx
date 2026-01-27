"use client";
import React, { useRef, useEffect } from 'react';

const TranscriptionBox = ({ messages, isLive }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="flex-1 px-4 flex flex-col min-h-45">
      <div className="bg-light-secondary/5 rounded-2xl border border-light-secondary/10 flex-1 p-4 flex flex-col overflow-hidden shadow-inner">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-light-secondary opacity-50">Real-time Transcription</h3>
            <span className="material-symbols-outlined text-sm text-light-secondary opacity-50">history</span>
        </div>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`animate-in fade-in slide-in-from-bottom-2 ${msg.isSystem ? 'text-dark-primary/40 text-sm italic' : 'text-dark-primary text-lg font-bold'}`}>
              {msg.text}
            </div>
          ))}
          {isLive && (
             <div className="flex gap-1 items-center py-2">
                <div className="w-1.5 h-1.5 bg-light-secondary rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-light-secondary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-light-secondary rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TranscriptionBox;