import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Palette, 
  Zap, 
  Settings, 
  Eye, 
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface ControlPanelProps {
  controls: {
    color: string;
    intensity: number;
    particleCount: number;
    trailLength: number;
    gravity: number;
    size: number;
    effectMode: string;
    enableTrail: boolean;
    enableGlow: boolean;
    enableRipples: boolean;
  };
  onControlChange: (key: string, value: any) => void;
  onReset: () => void;
}

const colorPresets = [
  { name: 'Electric Blue', value: '#00BFFF' },
  { name: 'Neon Pink', value: '#FF1493' },
  { name: 'Lime Green', value: '#32CD32' },
  { name: 'Orange Fire', value: '#FF4500' },
  { name: 'Purple Magic', value: '#8A2BE2' },
  { name: 'Gold Rush', value: '#FFD700' },
  { name: 'Cyan Wave', value: '#00FFFF' },
  { name: 'Red Passion', value: '#DC143C' }
];

export function ControlPanel({ controls, onControlChange, onReset }: ControlPanelProps) {
  return (
    <div className="fixed top-4 right-4 w-80 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <Card className="bg-black/80 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5" />
            Canvas Controls
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Color Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="text-sm">Color</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {colorPresets.map((preset) => (
                <Button
                  key={preset.value}
                  variant="outline"
                  size="sm"
                  className={`h-8 w-full border-2 ${
                    controls.color === preset.value 
                      ? 'border-white' 
                      : 'border-white/30'
                  }`}
                  style={{ backgroundColor: preset.value }}
                  onClick={() => onControlChange('color', preset.value)}
                  title={preset.name}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={controls.color}
                onChange={(e) => onControlChange('color', e.target.value)}
                className="w-8 h-8 rounded border border-white/30 bg-transparent cursor-pointer"
              />
              <span className="text-xs text-white/70">Custom Color</span>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Effect Mode */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Effect Mode</span>
            </div>
            
            <Select value={controls.effectMode} onValueChange={(value) => onControlChange('effectMode', value)}>
              <SelectTrigger className="bg-white/10 border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/30">
                <SelectItem value="click">Click to Emit</SelectItem>
                <SelectItem value="continuous">Continuous Flow</SelectItem>
                <SelectItem value="drag">Drag to Paint</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-white/20" />

          {/* Physics Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Physics</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-white/70">Intensity</span>
                  <Badge variant="outline" className="text-xs border-white/30 text-white">
                    {controls.intensity}
                  </Badge>
                </div>
                <Slider
                  value={[controls.intensity]}
                  onValueChange={([value]) => onControlChange('intensity', value)}
                  min={1}
                  max={15}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-white/70">Particle Count</span>
                  <Badge variant="outline" className="text-xs border-white/30 text-white">
                    {controls.particleCount}
                  </Badge>
                </div>
                <Slider
                  value={[controls.particleCount]}
                  onValueChange={([value]) => onControlChange('particleCount', value)}
                  min={1}
                  max={8}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-white/70">Gravity</span>
                  <Badge variant="outline" className="text-xs border-white/30 text-white">
                    {controls.gravity}
                  </Badge>
                </div>
                <Slider
                  value={[controls.gravity]}
                  onValueChange={([value]) => onControlChange('gravity', value)}
                  min={-3}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-white/70">Particle Size</span>
                  <Badge variant="outline" className="text-xs border-white/30 text-white">
                    {controls.size}
                  </Badge>
                </div>
                <Slider
                  value={[controls.size]}
                  onValueChange={([value]) => onControlChange('size', value)}
                  min={2}
                  max={15}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Visual Effects */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Visual Effects</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Glow Effect</span>
                <Switch
                  checked={controls.enableGlow}
                  onCheckedChange={(checked) => onControlChange('enableGlow', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Mouse Trail</span>
                <Switch
                  checked={controls.enableTrail}
                  onCheckedChange={(checked) => onControlChange('enableTrail', checked)}
                />
              </div>
              
              {controls.enableTrail && (
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-white/70">Trail Length</span>
                    <Badge variant="outline" className="text-xs border-white/30 text-white">
                      {controls.trailLength}
                    </Badge>
                  </div>
                  <Slider
                    value={[controls.trailLength]}
                    onValueChange={([value]) => onControlChange('trailLength', value)}
                    min={3}
                    max={25}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Ripple Effects</span>
                <Switch
                  checked={controls.enableRipples}
                  onCheckedChange={(checked) => onControlChange('enableRipples', checked)}
                />
              </div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Reset Button */}
          <Button 
            onClick={onReset}
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}