import { useEffect, useRef } from "react";
import { phaserConfig } from "./game/config";

export function PhaserGame() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const game = phaserConfig.setup();

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} />;
}
