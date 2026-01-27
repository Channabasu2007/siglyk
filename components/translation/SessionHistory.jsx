"use client";
import React, { useState } from 'react';
import SecondaryButton from '@/components/buttons/SecondaryButton';

const SessionHistory = () => {
  // Temporary local state for history items
  const [history, setHistory] = useState([
    { id: 1, time: "10:42 AM", text: "My name is John", type: "video" },
    { id: 2, time: "10:41 AM", text: "Nice to meet you", type: "video" },
    { id: 3, time: "10:38 AM", text: "Where is the exit?", type: "voice" }
  ]);

  const clearHistory = () => {
    if (confirm("Clear all recent phrases?")) {
      setHistory([]);
    }
  };

  return (
    <section className="px-4 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-light-primary rounded-2xl border border-light-secondary/10 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-light-secondary/5 flex items-center justify-between bg-light-secondary/2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-light-secondary text-lg">history</span>
            <h3 className="font-bold text-dark-primary text-sm tracking-tight">Recent Phrases</h3>
          </div>
          <button 
            onClick={clearHistory}
            className="text-[10px] font-black uppercase tracking-widest text-light-secondary hover:underline cursor-pointer"
          >
            Clear All
          </button>
        </div>

        {/* List of History Items */}
        <div className="divide-y divide-light-secondary/5">
          {history.length > 0 ? (
            history.map((item) => (
              <div 
                key={item.id} 
                className="px-5 py-4 flex items-center justify-between hover:bg-light-secondary/2 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  {/* Icon Indicator */}
                  <div className="size-10 rounded-xl bg-light-secondary/10 flex items-center justify-center text-light-secondary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">
                      {item.type === 'video' ? 'videocam' : 'mic'}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <p className="text-sm font-semibold text-dark-primary line-clamp-1">
                      "{item.text}"
                    </p>
                    <p className="text-[10px] font-medium text-light-secondary/50 uppercase tracking-tighter mt-0.5">
                      Captured at {item.time}
                    </p>
                  </div>
                </div>

                {/* Replay Action */}
                <button className="p-2 rounded-full text-light-secondary/40 hover:text-light-secondary hover:bg-light-secondary/10 transition-all">
                  <span className="material-symbols-outlined">play_circle</span>
                </button>
              </div>
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-light-secondary/30 gap-2">
              <span className="material-symbols-outlined text-4xl">inventory_2</span>
              <p className="text-xs font-bold uppercase tracking-widest">No recent activity</p>
            </div>
          )}
        </div>

        {/* Footer Link */}
        {history.length > 0 && (
          <div className="p-3 bg-light-secondary/2 border-t border-light-secondary/5">
             <SecondaryButton 
                label="View Full History" 
                className="w-full border-none shadow-none bg-transparent"
                icon={<span className="material-symbols-outlined text-sm">open_in_new</span>}
             />
          </div>
        )}
      </div>
    </section>
  );
};

export default SessionHistory;