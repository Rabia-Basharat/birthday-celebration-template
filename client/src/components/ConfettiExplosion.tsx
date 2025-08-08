import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
}

interface ConfettiExplosionProps {
  isActive: boolean;
  onComplete?: () => void;
}

const confettiColors = [
  "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57",
  "#ff9ff3", "#54a0ff", "#5f27cd", "#00d2d3", "#ff9f43"
];

export default function ConfettiExplosion({ isActive, onComplete }: ConfettiExplosionProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      // Generate confetti pieces
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -50,
        rotation: Math.random() * 360,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        size: Math.random() * 10 + 5
      }));
      
      setPieces(newPieces);

      // Clean up after animation
      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: "2px"
          }}
          initial={{
            y: piece.y,
            x: piece.x,
            rotate: piece.rotation,
            scale: 0
          }}
          animate={{
            y: piece.y + window.innerHeight + 100,
            x: piece.x + (Math.random() - 0.5) * 200,
            rotate: piece.rotation + 720,
            scale: [0, 1, 0.8, 0]
          }}
          transition={{
            duration: 3,
            ease: "easeOut",
            times: [0, 0.1, 0.8, 1]
          }}
        />
      ))}
    </div>
  );
}

// Hook for triggering confetti
export function useConfetti() {
  const [isActive, setIsActive] = useState(false);

  const trigger = () => {
    setIsActive(true);
  };

  return { isActive, trigger };
} 