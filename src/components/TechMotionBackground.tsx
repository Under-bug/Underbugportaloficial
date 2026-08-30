import React, { useMemo } from 'react';
import { motion } from 'motion/react';

export default function TechMotionBackground() {
  // Generate random data points (nodes) for the tech constellation
  const nodes = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x-axis
      y: Math.random() * 100, // percentage y-axis
      size: Math.random() * 2.5 + 1.5, // size in px
      duration: Math.random() * 15 + 15, // animation speed in seconds
      delay: Math.random() * -20, // negative delay so they start at different phases
      directionX: Math.random() > 0.5 ? 1 : -1,
      directionY: Math.random() > 0.5 ? 1 : -1,
      amplitudeX: Math.random() * 50 + 20, // displacement amplitude
      amplitudeY: Math.random() * 50 + 20,
    }));
  }, []);

  // Tech lines connecting nodes or acting as logical circuits
  const circuitTracks = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => {
      const startX = 15 + i * 20 + Math.random() * 10;
      const startY = 10 + Math.random() * 30;
      const length = 120 + Math.random() * 150;
      return {
        id: i,
        startX,
        startY,
        length,
        duration: 10 + i * 4,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* 1. Global Subtle Tech Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0fd996 1px, transparent 1px),
            linear-gradient(to bottom, #0fd996 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial Gradient overlay to fade the edges and focus on the center */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,var(--color-brand-bg)_90%]" />

      {/* 2. Soft Ambient Glowing Backdrops (Slowly Pulsing) */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-brand-green/5 filter blur-[100px] rounded-full pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[380px] h-[380px] bg-brand-green/3 filter blur-[120px] rounded-full pointer-events-none"
      />

      {/* 2b. Slow Rotating Tech Radar Ring in the background (Right corner) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        className="absolute top-[18%] right-[12%] w-[280px] h-[280px] border border-dashed border-brand-green/[0.04] rounded-full flex items-center justify-center pointer-events-none"
      >
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="w-[200px] h-[200px] border border-dotted border-brand-green/[0.03] rounded-full flex items-center justify-center"
        >
          <div className="relative w-[124px] h-[124px] border border-brand-green/[0.015] rounded-full flex items-center justify-center">
            {/* Symmetrical Crosshair lines */}
            <div className="absolute w-[140px] h-[1px] bg-brand-green/[0.035]" />
            <div className="absolute h-[140px] w-[1px] bg-brand-green/[0.035]" />
          </div>
        </motion.div>
      </motion.div>

      {/* 2c. Slow Rotating Tech Radar Ring in the background (Left bottom corner) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] left-[8%] w-[220px] h-[220px] border border-dashed border-brand-green/[0.03] rounded-full flex items-center justify-center pointer-events-none"
      >
        <div className="w-[150px] h-[150px] border border-dotted border-brand-green/[0.025] rounded-full flex items-center justify-center">
          <div className="w-[80px] h-[80px] border border-brand-green/[0.015] rounded-full flex items-center justify-center" />
        </div>
      </motion.div>

      {/* 3. Sweeping Scanner Laser Beam (Subtle scan line from top to bottom) */}
      <motion.div
        animate={{
          y: ['-10%', '110%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-green/20 to-transparent pointer-events-none filter blur-[0.5px]"
      />

      {/* 4. Cyber Constellation/Grid Nodes with drifting motion */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          initial={{ x: `${node.x}%`, y: `${node.y}%` }}
          animate={{
            x: [
              `${node.x}%`,
              `${node.x + (node.directionX * node.amplitudeX) / 10}%`,
              `${node.x - (node.directionX * node.amplitudeX) / 20}%`,
              `${node.x}%`
            ],
            y: [
              `${node.y}%`,
              `${node.y + (node.directionY * node.amplitudeY) / 10}%`,
              `${node.y - (node.directionY * node.amplitudeY) / 20}%`,
              `${node.y}%`
            ],
            opacity: [0.08, 0.28, 0.15, 0.08],
          }}
          transition={{
            duration: node.duration,
            delay: node.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full bg-brand-green pointer-events-none"
          style={{
            width: node.size,
            height: node.size,
            boxShadow: '0 0 6px rgba(15, 217, 150, 0.4)',
          }}
        />
      ))}

      {/* 5. Logic Circuitry Track Segments (Horizontal/Vertical pulses) */}
      {circuitTracks.map((track) => (
        <div
          key={track.id}
          className="absolute"
          style={{
            left: `${track.startX}%`,
            top: `${track.startY}%`,
            width: `${track.length}px`,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(15,217,150,0) 0%, rgba(15,217,150,0.15) 50%, rgba(15,217,150,0) 100%)',
          }}
        >
          {/* Pulsing signal bullet running down the circuit coordinate */}
          <motion.div
            animate={{
              left: ['0%', '100%'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: track.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-green/80 filter drop-shadow-[0_0_2px_rgba(15,217,150,0.8)]"
          />
        </div>
      ))}

      {/* 7. Blinking tactical target rect scopes */}
      <motion.div
        animate={{ opacity: [0.02, 0.15, 0.02] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[25%] font-mono text-[9px] text-brand-green flex items-center space-x-1.5"
      >
        <span className="border-t border-l border-brand-green/25 w-2 h-2 block animate-pulse" />
        <span className="tracking-wide">LAT_S: 47.922</span>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.12, 0.02, 0.12] }}
        transition={{ duration: 6, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[30%] right-[30%] font-mono text-[9px] text-brand-green flex items-center space-x-1.5"
      >
        <span className="tracking-wide">SCAN: ACTIVE</span>
        <span className="border-b border-r border-brand-green/25 w-2 h-2 block animate-pulse" />
      </motion.div>
    </div>
  );
}
