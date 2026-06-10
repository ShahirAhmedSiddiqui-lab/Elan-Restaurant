/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, X, Flame, Volume2, VolumeX, AlertCircle, Sliders } from 'lucide-react';
import { BEHIND_DATA } from '../data';
import experienceHearth from '../assets/images/experience_hearth_ignition.png';
import experienceSteak from '../assets/images/experience_steak_glaze.png';
import experienceOyster from '../assets/images/experience_oyster_plating.png';
import experienceForest from '../assets/images/experience_forest_smoke.png';
import experienceChocolate from '../assets/images/experience_chocolate_sphere.png';
import restaurantAudio from '../assets/audio/retrositive-restaurant-239024.mp3';

export default function BehindCraft() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  
  // Video total frame mock values
  const [progress, setProgress] = useState(0); // overall percentage (0 - 100)
  const [activeGrade, setActiveGrade] = useState<'warm' | 'noir' | 'vivid' | 'raw'>('warm');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 5 cinematic stills generated for this experience sequence.
  const documentaryScenes = [
    {
      id: 0,
      title: "I. The Hearth Ignition",
      subtitle: "SEARING METALS & EMBERS",
      description: "Alderwood and oak charcoal logs burst at 450°C, releasing rich, slow-release aromatic smoke plumes designed to encapsulate raw proteins.",
      durationRange: [0, 20],
      image: experienceHearth,
      fact: "Our kitchen hearth is fired with 100% sustainable local white oak.",
      lens: "Arri Alexa LF • 50m Master Prime f/1.3"
    },
    {
      id: 1,
      title: "II. Temperature Glazing",
      subtitle: "EMULSIONS & SWEET CARAMEL",
      description: "Pouring a rich hand-shimmering reduction of sweet blood oranges, aromatic herbs, and vintage port reduction directly onto perfectly seared Wagyu beef.",
      durationRange: [20, 40],
      image: experienceSteak,
      fact: "Glaze reduces tableside for twenty-four consecutive hours.",
      lens: "Arri Alexa LF • 85m Clinique Macro f/2.0"
    },
    {
      id: 2,
      title: "III. Tweezers Plating Artistry",
      subtitle: "MICROSCOPIC DELICACY",
      description: "Leveraging custom brass plating forceps to gently lay temperature-controlled wild sea urchin butter ribbons and Osetra pearls on frosted oyster shells.",
      durationRange: [40, 60],
      image: experienceOyster,
      fact: "Every single wild oyster is harvested and shucked within ninety seconds.",
      lens: "Arri Alexa LF • 35m Prime f/1.4"
    },
    {
      id: 3,
      title: "IV. Unveiling the Forest floor",
      subtitle: "OAK-LOG SMOKING EMBERS",
      description: "Braised black morels and toasted chestnut purée nested under glass cloches. Unveiling custom aromatic white oakwood smoke plumes for the senses.",
      durationRange: [60, 80],
      image: experienceForest,
      fact: "Morels are sourced from deep woodlands by professional truffle foragers.",
      lens: "Arri Alexa LF • 45m Macro f/1.8"
    },
    {
      id: 4,
      title: "V. Sphere Sensation Melting",
      subtitle: "ARAGUANI CACAO TABLESIDE",
      description: "Hot, silky 72% Venezuelan dark chocolate glaze melting a hyper-glossy sphere tableside to reveal cold blood orange citrus sorbet.",
      durationRange: [80, 100],
      image: experienceChocolate,
      fact: "Features custom Araguani cacao sourced directly from eco-estates.",
      lens: "Arri Alexa LF • 100m Clinique Macro f/2.8"
    }
  ];

  // Helper to retrieve currently playing scene based on timeline slider position
  const getActiveScene = () => {
    const scene = documentaryScenes.find(s => progress >= s.durationRange[0] && progress <= s.durationRange[1]);
    return scene || documentaryScenes[0];
  };

  const currentScene = getActiveScene();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.muted = isAudioMuted;

    if (!isPlayerOpen) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    if (isPlaying && !isAudioMuted) {
      void audio.play().catch((err) => {
        console.warn('Restaurant audio playback was blocked by the browser:', err);
      });
    } else {
      audio.pause();
    }
  }, [isPlayerOpen, isPlaying, isAudioMuted]);

  // Live countdown timeline runner
  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      if (isPlaying && isPlayerOpen) {
        const delta = now - lastTime;
        // Advance timeline 6% every second (approx 16 seconds loop)
        setProgress((prev) => {
          const next = prev + (delta / 1000) * 6;
          return next >= 100 ? 0 : next;
        });
      }
      lastTime = now;
      frameId = requestAnimationFrame(loop);
    };

    if (isPlaying && isPlayerOpen) {
      frameId = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, isPlayerOpen]);

  const playRestaurantAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.muted = false;
    void audio.play().catch((err) => {
      console.warn('Restaurant audio playback was blocked by the browser:', err);
    });
  };

  const closePlayer = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlayerOpen(false);
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlayback = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);

    if (nextPlaying && !isAudioMuted) {
      playRestaurantAudio();
    } else {
      audioRef.current?.pause();
    }
  };

  const toggleAudio = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);

    if (!nextMuted) {
      setIsPlaying(true);
      playRestaurantAudio();
    } else {
      audioRef.current?.pause();
    }
  };

  const handleProgressChange = (val: number) => {
    setProgress(val);
  };

  const getFilterClass = () => {
    switch (activeGrade) {
      case 'noir':
        return 'contrast-[1.2] brightness-[0.7] grayscale sepia-[15%]';
      case 'vivid':
        return 'contrast-[1.1] saturate-[1.3] brightness-[0.9]';
      case 'raw':
        return 'contrast-[0.8] saturate-[0.8] brightness-[1.0]';
      case 'warm':
      default:
        return 'contrast-[1.05] brightness-[0.8] sepia-[10%] hue-rotate-5';
    }
  };

  // Convert progress (0-100) to clean SMPTE Timecode format hh:mm:ss:ff
  const getTimecode = () => {
    const totalFrames = Math.floor(progress * 2.4); // 0 to 240 frames
    const sec = Math.floor(totalFrames / 24) % 60;
    const frames = totalFrames % 24;
    return `01:00:${sec.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  };

  return (
    <section
      id="behind"
      className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-[#070605]"
    >
      <audio ref={audioRef} src={restaurantAudio} preload="auto" loop />

      {/* Background Combustion/Flames image */}
      <div data-parallax-media className="absolute inset-0 z-0">
        <img
          src={BEHIND_DATA.image}
          alt="Chef Sautéing Gourmet Dish with Golden and Orange Flames Rising"
          className="w-full h-full object-cover opacity-45 brightness-[0.35]"
          referrerPolicy="no-referrer"
        />
        {/* Soft Vignette Shadows */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-[#0B0A09]/80 z-10" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#0B0A09]/95 z-10" />
      </div>

      {/* Main Overlay Texts */}
      <div data-section-content className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-8 select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-gold-300 uppercase block">
            {BEHIND_DATA.tag}
          </span>
          <h2
            id="behind-title"
            className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-[0.14em] text-[#F7F1EA] uppercase leading-tight"
          >
            PASSION. PRECISION. <br />
            PRESENCE.
          </h2>
        </motion.div>

        {/* Action Call to Play Cine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            layoutId="cinematic-player"
            data-sound="open"
            id="play-cinematic-btn"
            onClick={() => {
              setIsPlayerOpen(true);
              setIsPlaying(true);
              setIsAudioMuted(false);
              playRestaurantAudio();
            }}
            className="group relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold-300/40 bg-[#0B0A09]/80 hover:bg-gold-500 hover:text-black flex items-center justify-center text-gold-300 transition-all duration-500 shadow-2xl cursor-pointer"
            aria-label="Play Cooking Cinematic Experience"
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 rounded-full border border-gold-400/30 animate-ping group-hover:hidden" />
            <Play className="w-6 h-6 md:w-8 md:h-8 fill-current translate-x-0.5" />
          </motion.button>
          
          <span className="font-serif italic text-sm text-[#F7F1EA]/60 font-light tracking-wide pt-2 block">
            {BEHIND_DATA.subtitle}
          </span>
        </motion.div>
      </div>

      {/* Culinary Immersive Cinema Modal Overlay */}
      <AnimatePresence>
        {isPlayerOpen && (
          <motion.div
            id="immersive-cinema-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-4 md:p-8 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0"
              onClick={closePlayer}
            />
            <motion.div
              layoutId="cinematic-player"
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl aspect-video bg-[#0B0A09] border border-bronze-800/80 flex flex-col md:flex-row shadow-2xl overflow-hidden rounded-sm z-10"
            >
              
              {/* Top Warning/Meta Rail */}
              <div className="absolute top-0 inset-x-0 z-30 h-10 px-6 bg-black/90 backdrop-blur-md border-b border-bronze-900/30 flex items-center justify-between pointer-events-none select-none">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-mono text-[9px] tracking-widest text-[#F7F1EA]/50 uppercase">REC STREAM • PRORES 422 HQ</span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.2em] text-gold-300/60 uppercase">ÉLAN PRODUCTIONS — INTUITIVE GASTRONOMY</span>
              </div>

              {/* Close Button */}
              <button
                data-sound="close"
                id="close-cinema-modal"
                onClick={closePlayer}
                className="absolute top-12 right-6 z-40 p-2.5 rounded-full bg-black/80 hover:bg-[#1A1816] text-bronze-200 hover:text-gold-300 transition-all cursor-pointer border border-bronze-800/60 shadow-xl"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Dynamic Camera Scene feed (Widescreen 16:9 stream) */}
              <div className="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-bronze-900/60 mt-10 md:mt-0">
                
                {/* Active Scene Frame Rendering with continuous zoom (Ken Burns) animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentScene.id}
                      src={currentScene.image}
                      alt={currentScene.title}
                      initial={{ scale: 1.01, opacity: 0 }}
                      animate={{ 
                        scale: isPlaying ? [1.02, 1.12] : 1.04,
                        opacity: 1 
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        scale: { duration: 16, ease: "linear" },
                        opacity: { duration: 0.8 } 
                      }}
                      className={`w-full h-full object-cover transition-all ${getFilterClass()}`}
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                </div>

                {/* Floating ashes/embers overlays to represent cooking heat */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-60">
                  <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {/* CSS Animated embers */}
                  <span className="absolute bottom-4 left-[20%] w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping opacity-75" />
                  <span className="absolute bottom-8 left-[65%] w-1 h-1 bg-amber-400 rounded-full animate-bounce opacity-80" style={{ animationDelay: '0.4s' }} />
                  <span className="absolute bottom-12 left-[45%] w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.8s' }} />
                </div>

                {/* Subtle Cinematic HUD Overlays */}
                <div className="absolute inset-x-6 top-14 pointer-events-none select-none z-10 flex justify-between font-mono text-[9px] text-[#F7F1EA]/50">
                  <div className="space-y-1 bg-black/40 p-2 border border-bronze-950/20 rounded-xs backdrop-blur-xs">
                    <div>LENS: {currentScene.lens}</div>
                    <div>FPS: 24.00 fps</div>
                  </div>
                  <div className="space-y-1 bg-black/40 p-2 border border-bronze-950/20 rounded-xs backdrop-blur-xs text-right">
                    <div className="text-gold-300">ISO: 400</div>
                    <div>SHUT: 1/48s</div>
                  </div>
                </div>

                {/* Subtitle / Narrative card synced directly below */}
                <div className="absolute bottom-14 left-6 right-6 z-20 bg-black/75 border border-bronze-900/40 backdrop-blur-md p-4 max-w-lg">
                  <span className="font-mono text-[9px] tracking-widest text-gold-400 uppercase block mb-1">
                    SUBTITLE FEED
                  </span>
                  <p className="font-sans text-xs text-[#F7F1EA]/85 leading-relaxed tracking-wide italic">
                    "{currentScene.description}"
                  </p>
                </div>

                {/* Left Side Scene Navigator Buttons */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 bg-black/80 p-2 border border-bronze-900/30">
                  <span className="font-mono text-[8px] tracking-widest text-[#F7F1EA]/40 text-center uppercase block border-b border-bronze-900/30 pb-1">SCENES</span>
                  {documentaryScenes.map((sc) => {
                    const sceneIsActive = currentScene.id === sc.id;
                    return (
                      <button
                        data-sound="nav"
                        key={sc.id}
                        onClick={() => setProgress(sc.durationRange[0])}
                        className={`w-6 h-6 rounded-xs flex items-center justify-center font-mono text-[9px] border transition-all cursor-pointer ${
                          sceneIsActive 
                            ? 'bg-gold-500 border-gold-400 text-black font-semibold' 
                            : 'bg-black/40 border-bronze-900/40 text-[#F7F1EA]/50 hover:border-gold-500/50 hover:text-white'
                        }`}
                        title={sc.title}
                      >
                        {sc.id + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Informative Side Chronicle & Audio controls */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-[#0B0A09] mt-0">
                
                {/* Section header */}
                <div className="space-y-3 pt-6 md:pt-10">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                    <span className="font-sans text-[9px] tracking-[0.25em] text-gold-300 uppercase block">HEARTH SIDE CHRONICLES</span>
                  </div>
                  
                  <h3 className="font-serif text-xl md:text-2xl tracking-widest text-gold-100 uppercase leading-snug">
                    {currentScene.title}
                  </h3>
                  <div className="h-[1px] w-12 bg-gold-400/35" />
                </div>

                {/* Animated changing description cards */}
                <div className="space-y-4 flex-grow flex flex-col justify-start py-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-bronze-400 font-sans block mb-1">CURRENT INDEX PHASE</span>
                    <p className="font-serif text-xs md:text-sm text-bronze-100 leading-relaxed italic">
                      "{currentScene.subtitle}"
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-[10.5px] font-sans text-[#F7F1EA]/50 leading-relaxed pt-3 border-t border-bronze-900/40">
                    <AlertCircle className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-bronze-300 uppercase font-light tracking-wide mr-1">Gastronomy Insight:</strong> {currentScene.fact}
                    </span>
                  </div>
                </div>

                {/* Atmospheric Color Grading Option Bar */}
                <div className="space-y-2 border-t border-bronze-900/25 pt-4">
                  <div className="flex items-center gap-1.5 text-[#F7F1EA]/40 text-[9px] uppercase tracking-widest">
                    <Sliders className="w-3 h-3 text-gold-400" />
                    <span>COLOR GRADE / LUT MATRIX</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['warm', 'noir', 'vivid', 'raw'] as const).map((grade) => (
                      <button
                        data-sound="toggle"
                        key={grade}
                        onClick={() => setActiveGrade(grade)}
                        className={`text-[8.5px] font-mono tracking-widest uppercase py-1 border transition-all cursor-pointer rounded-xs ${
                          activeGrade === grade 
                            ? 'border-gold-500 bg-gold-500/10 text-gold-300 font-medium' 
                            : 'border-bronze-900/40 bg-black/40 text-[#F7F1EA]/40 hover:border-bronze-800/60 hover:text-white'
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Dynamic Bottom Scrubber Controller Bar */}
                <div className="space-y-3 pt-4 border-t border-bronze-900/30">
                  
                  {/* Timeline Scrubber slider */}
                  <div className="flex items-center gap-3">
                    <button
                      data-sound="toggle"
                      onClick={togglePlayback}
                      className="w-8 h-8 rounded-full border border-gold-500/30 bg-black/40 flex items-center justify-center text-gold-300 hover:text-black hover:bg-gold-500 transition-all cursor-pointer"
                      aria-label={isPlaying ? "Pause cinematic stream" : "Play cinematic stream"}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />}
                    </button>

                    <div className="flex-grow flex flex-col gap-1">
                      <div className="flex items-center justify-between font-mono text-[9px] text-[#F7F1EA]/40">
                        <span>{getTimecode()}</span>
                        <span>100% SECS</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={Math.round(progress)}
                        onChange={(e) => handleProgressChange(parseFloat(e.target.value))}
                        className="w-full accent-gold-400 bg-bronze-950 h-1 rounded-full cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                        aria-label="Seek documentary timeline"
                      />
                    </div>
                  </div>

                  {/* Relaxing ambient music control */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-1">
                      {documentaryScenes.map((s) => (
                        <div
                          key={s.id}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            currentScene.id === s.id ? 'w-5 bg-gold-400' : 'w-2 bg-bronze-950'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      data-sound="toggle"
                      onClick={toggleAudio}
                      className="flex items-center gap-1.5 text-[8.5px] font-sans tracking-[0.2em] text-bronze-300 hover:text-gold-300 transition-colors cursor-pointer"
                    >
                      {isAudioMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-bronze-400" />
                          UNMUTE AMBIENT SCORE
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-gold-400 animate-bounce" />
                          AMBIENT SCORE ACTIVE
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
