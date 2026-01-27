"use client";
import React, { useRef, useEffect, useState } from 'react';
import PrimaryButton from '@/components/buttons/PrimaryButton';

const CameraFeed = ({ isLive, onToggle }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [permissionError, setPermissionError] = useState(null);
  
  const [facingMode, setFacingMode] = useState("user");
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [capabilities, setCapabilities] = useState(null);

  useEffect(() => {
    const checkCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setHasMultipleCameras(videoDevices.length > 1);
      } catch (e) { console.error(e); }
    };
    checkCameras();
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        setPermissionError(null);
        const constraints = {
          video: { 
            aspectRatio: 16 / 9, 
            facingMode: facingMode,
          },
          audio: false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;

          const track = stream.getVideoTracks()[0];
          // Delay capability check to ensure track is fully initialized
          setTimeout(() => {
            const caps = track.getCapabilities?.();
            if (caps && caps.zoom) setCapabilities(caps);
          }, 500);
        }
      } catch (err) {
        setPermissionError("Camera access denied or unavailable.");
        if (isLive) onToggle();
      }
    };

    const stopCamera = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) videoRef.current.srcObject = null;
    };

    if (isLive) startCamera();
    else stopCamera();

    return () => stopCamera();
  }, [isLive, facingMode, onToggle]);

  const handleZoom = async (e) => {
    const value = parseFloat(e.target.value);
    setZoomLevel(value);
    const track = streamRef.current?.getVideoTracks()[0];
    if (track && capabilities?.zoom) {
      try {
        await track.applyConstraints({ advanced: [{ zoom: value }] });
      } catch (err) { console.error(err); }
    }
  };

  return (
    <section className="px-2 md:px-4 py-4">
      <div className="relative aspect-video w-full bg-black rounded-3xl border-2 border-light-secondary/20 overflow-hidden shadow-2xl group">
        
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-opacity duration-700 ${isLive ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* --- UI OVERLAYS --- */}
        {isLive && (
          <>
            {/* AI Tracking Corners */}
            <div className="absolute inset-6 border border-light-primary/10 rounded-2xl pointer-events-none">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-light-secondary rounded-tl-lg"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-light-secondary rounded-br-lg"></div>
            </div>

            {/* Top Bar Indicators */}
            <div className="absolute top-4 inset-x-4 flex justify-between items-start">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-light-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] text-light-primary font-black uppercase tracking-widest">Live Analysis</span>
              </div>

              {hasMultipleCameras && (
                <button 
                  onClick={() => setFacingMode(f => f === "user" ? "environment" : "user")}
                  className="size-10 bg-black/40 backdrop-blur-md text-light-primary rounded-full flex items-center justify-center border border-light-primary/10 active:scale-90 transition-all"
                >
                  <span className="material-symbols-outlined text-xl">flip_camera_ios</span>
                </button>
              )}
            </div>

            {/* --- IMPROVED ZOOM ALIGNMENT --- */}
            {capabilities?.zoom && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 bg-black/30 backdrop-blur-lg p-3 rounded-full border border-light-primary/10 shadow-2xl">
                <span className="material-symbols-outlined text-light-primary text-sm opacity-60">zoom_in</span>
                <input 
                  type="range"
                  orient="vertical" /* Non-standard but helpful for some browsers */
                  min={capabilities.zoom.min}
                  max={capabilities.zoom.max}
                  step={0.1}
                  value={zoomLevel}
                  onChange={handleZoom}
                  style={{ writingMode: 'bt-lr', appearance: 'slider-vertical', width: '4px', height: '100px' }}
                  className="accent-light-secondary cursor-pointer"
                />
                <span className="material-symbols-outlined text-light-primary text-sm opacity-60">zoom_out</span>
              </div>
            )}
          </>
        )}

        {/* Standby State */}
        {!isLive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-primary/95 text-light-primary/30 gap-4">
            <div className="size-20 bg-light-primary/5 rounded-full flex items-center justify-center border border-light-primary/5">
                <span className="material-symbols-outlined text-4xl">
                {permissionError ? 'error' : 'videocam_off'}
                </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center max-w-50 leading-relaxed">
              {permissionError || "System Standby • Ready to Translate"}
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-center">
        <PrimaryButton 
          onClick={onToggle}
          label={isLive ? "End Session" : "Start Live Stream"}
          className={isLive ? "bg-red-500! shadow-red-500/20" : "shadow-light-secondary/20"}
          icon={<span className="material-symbols-outlined">{isLive ? 'power_settings_new' : 'sensors'}</span>}
        />
      </div>
    </section>
  );
};

export default CameraFeed;