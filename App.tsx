import React, { useState } from 'react';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { ControlPanel } from './components/ControlPanel';
import { InfoPanel } from './components/InfoPanel';

const defaultControls = {
  color: '#00BFFF',
  intensity: 6,
  particleCount: 3,
  trailLength: 12,
  gravity: 0.3,
  size: 5,
  effectMode: 'continuous',
  enableTrail: true,
  enableGlow: true,
  enableRipples: true
};

export default function App() {
  const [controls, setControls] = useState(defaultControls);

  const handleControlChange = (key: string, value: any) => {
    setControls(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setControls(defaultControls);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <InteractiveCanvas
        color={controls.color}
        intensity={controls.intensity}
        particleCount={controls.particleCount}
        trailLength={controls.trailLength}
        gravity={controls.gravity}
        size={controls.size}
        effectMode={controls.effectMode}
        enableTrail={controls.enableTrail}
        enableGlow={controls.enableGlow}
        enableRipples={controls.enableRipples}
      />
      
      <InfoPanel />
      
      <ControlPanel
        controls={controls}
        onControlChange={handleControlChange}
        onReset={handleReset}
      />
    </div>
  );
}