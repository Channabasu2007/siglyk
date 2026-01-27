"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import signLanguages from "@/data/signLanguages.json";
import spokenLanguages from "@/data/languages.json";

const TranslationSelectors = ({
  source,
  setSource,
  target,
  setTarget,
  mode,
  onToggle,
}) => {
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);

  const sourceRef = useRef(null);
  const targetRef = useRef(null);

  /** ---------- DATASETS ---------- */
  const sourceList = useMemo(() => {
    return mode === "S2T" ? spokenLanguages : signLanguages;
  }, [mode]);

  const targetList = useMemo(() => {
    return mode === "S2T" ? signLanguages : spokenLanguages;
  }, [mode]);

  /** ---------- CLOSE DROPDOWNS ON OUTSIDE CLICK ---------- */
  useEffect(() => {
    const close = (e) => {
      if (sourceRef.current && !sourceRef.current.contains(e.target)) {
        setIsSourceOpen(false);
      }
      if (targetRef.current && !targetRef.current.contains(e.target)) {
        setIsTargetOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /** ---------- RESET INVALID SELECTIONS ON MODE CHANGE ---------- */
  useEffect(() => {
    if (!sourceList.some((l) => l.id === source)) {
      setSource(sourceList[0]?.id);
    }

    if (!targetList.some((l) => l.id === target)) {
      setTarget(targetList[0]?.id);
    }

    setIsSourceOpen(false);
    setIsTargetOpen(false);
  }, [mode]); // intentionally only on mode change

  return (
    <section className="px-3 py-3 bg-light-primary border-b border-light-secondary/10 sticky top-15 z-40 rounded-2xl shadow-sm">
      <div className="flex items-end justify-between gap-2 max-w-4xl mx-auto">

        {/* SOURCE */}
        <div className="relative flex-1 min-w-0" ref={sourceRef}>
          <label className="text-[10px] uppercase font-black text-light-secondary/50 ml-1 mb-1 block">
            {mode === "S2T" ? "Input Speech" : "Source Sign"}
          </label>

          <button
            onClick={() => setIsSourceOpen((v) => !v)}
            className="w-full h-12 flex items-center justify-between px-3 bg-light-secondary/5 border border-light-secondary/10 rounded-xl"
            aria-expanded={isSourceOpen}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="material-symbols-outlined text-light-secondary">
                {mode === "S2T" ? "mic" : "hand_gesture"}
              </span>
              <span className="text-sm font-bold truncate">
                {sourceList.find((l) => l.id === source)?.label}
              </span>
            </div>
            <span className="material-symbols-outlined text-light-secondary/50">
              expand_more
            </span>
          </button>

          {isSourceOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-light-primary border border-light-secondary/20 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
              {sourceList.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setSource(lang.id);
                    setIsSourceOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-light-secondary/5 flex justify-between"
                >
                  <span>{lang.label}</span>
                  <span className="text-[10px] font-bold text-light-secondary">
                    {lang.id}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MODE SWITCH */}
        <div className="shrink-0 pb-1">
          <button
            onClick={onToggle}
            title="Switch Translation Mode"
            className="size-12 flex items-center justify-center rounded-full bg-light-secondary text-light-primary shadow-md active:scale-95 transition-all"
          >
            <span
              className={`material-symbols-outlined transition-transform duration-500 ${
                mode === "T2S" ? "rotate-180" : ""
              }`}
            >
              sync_alt
            </span>
          </button>
        </div>

        {/* TARGET */}
        <div className="relative flex-1 min-w-0" ref={targetRef}>
          <label className="text-[10px] uppercase font-black text-light-secondary/50 ml-1 mb-1 block">
            {mode === "S2T" ? "Target Sign" : "Output Speech"}
          </label>

          <button
            onClick={() => setIsTargetOpen((v) => !v)}
            className="w-full h-12 flex items-center justify-between px-3 bg-light-secondary/5 border border-light-secondary/10 rounded-xl"
            aria-expanded={isTargetOpen}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="material-symbols-outlined text-light-secondary">
                {mode === "S2T" ? "hand_gesture" : "translate"}
              </span>
              <span className="text-sm font-bold truncate">
                {targetList.find((l) => l.id === target)?.label}
              </span>
            </div>
            <span className="material-symbols-outlined text-light-secondary/50">
              expand_more
            </span>
          </button>

          {isTargetOpen && (
            <div className="absolute top-full right-0 mt-2 w-full bg-light-primary border border-light-secondary/20 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
              {targetList.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setTarget(lang.id);
                    setIsTargetOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-light-secondary/5 flex justify-between"
                >
                  <span>{lang.label}</span>
                  <span className="text-[10px] font-bold text-light-secondary">
                    {lang.id}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TranslationSelectors;
