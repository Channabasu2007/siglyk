"use client";
import React, { useState } from 'react';
import TranslationSelectors from '@/components/translation/TranslationSelectors';
import CameraFeed from '@/components/translation/CameraFeed';
import TranscriptionBox from '@/components/translation/TranscriptionBox';
import WorkspaceControls from '@/components/translation/WorkspaceControls';
import SessionHistory from '@/components/translation/SessionHistory';
import AnimationFeed from '@/components/translation/AnimatedFeed';

const TranslationPage = () => {
  const [isLive, setIsLive] = useState(false);
  const [transcript, setTranscript] = useState([
    { id: 1, text: "Hello, how can I help you today?", isSystem: true },
    { id: 2, text: "I am looking for the nearest bus stand.", isSystem: false }
  ]);
  const [sourceLang, setSourceLang] = useState("ASL");
  const [targetLang, setTargetLang] = useState("English (US)");
  const [mode, setMode] = useState('S2T');

  const toggleMode = () => {
    setMode(prev => (prev === 'S2T' ? 'T2S' : 'S2T'));
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setIsLive(false); // Safety: Stop feeds when switching modes
  };

  return (
    <div className="min-h-screen w-full lg:w-[80vw] mx-auto bg-light-primary font-sans flex flex-col transition-colors duration-300">

      {/* Main Container: Controlled width for desktop, full for mobile */}
      <main className="flex-1 w-full max-w-350 mx-auto p-4 lg:p-8 flex flex-col gap-6">

        {/* Top Section: Selectors (Usually full width) */}
        <section className="w-full">
          <TranslationSelectors
            source={sourceLang}
            setSource={setSourceLang}
            target={targetLang}
            setTarget={setTargetLang}
            mode={mode}       // Add this
            onToggle={toggleMode}
          />
        </section>

        {/* Middle Section: Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start">

          {/* Left Side: Camera (Spans 7 columns on LG) */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {mode === 'S2T' ? (
              <CameraFeed isLive={isLive} onToggle={() => setIsLive(!isLive)} />
            ) : (
              <AnimationFeed isLive={isLive} onToggle={() => setIsLive(!isLive)} />
            )}
            {/* Desktop-only placement for secondary controls could go here, 
                but keeping them modular for now */}
          </div>

          {/* Right Side: Transcription & Controls (Spans 5 columns on LG) */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            <TranscriptionBox messages={transcript} isLive={isLive} />
            <WorkspaceControls
              mode={mode}       // Add this
              onToggle={toggleMode}
            />
          </div>
        </div>

        {/* Bottom Section: History (Full width) */}
        <section className="w-full">
          <SessionHistory />
        </section>
      </main>
    </div>
  );
};

export default TranslationPage;