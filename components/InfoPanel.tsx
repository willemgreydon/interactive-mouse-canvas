import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Info, 
  Mouse, 
  Keyboard, 
  Palette,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function InfoPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 left-4 w-80">
      <Card className="bg-black/80 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Info className="w-5 h-5" />
              Interactive Canvas
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/10"
              >
                {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-white/80 leading-relaxed">
                Experience a modern interactive particle system showcasing advanced web technologies. 
                Move your mouse to create stunning visual effects!
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mouse className="w-4 h-4" />
                <span className="text-sm">Mouse Controls</span>
              </div>
              
              <div className="space-y-2 ml-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Move</span>
                  <Badge variant="outline" className="text-xs border-white/30 text-white">
                    Create particles
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Click & Drag</span>
                  <Badge variant="outline" className="text-xs border-white/30 text-white">
                    Enhanced effects
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Hold Click</span>
                  <Badge variant="outline" className="text-xs border-white/30 text-white">
                    Ripple waves
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                <span className="text-sm">Features</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 ml-6">
                <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/30">
                  Real-time Physics
                </Badge>
                <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/30">
                  Particle Systems
                </Badge>
                <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/30">
                  Mouse Trails
                </Badge>
                <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/30">
                  Glow Effects
                </Badge>
                <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/30">
                  Ripple Waves
                </Badge>
                <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/30">
                  Color Mixing
                </Badge>
              </div>
            </div>

            <div className="text-xs text-white/60 pt-2 border-t border-white/20">
              Built with React, Canvas API, and modern web technologies
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}