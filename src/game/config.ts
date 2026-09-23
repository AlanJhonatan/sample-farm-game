import * as Phaser from "phaser";

import { MainScene } from "./scenes/MainScene";
import { TerrainGenerationScene } from "./scenes/TerrainGenerationScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: document.documentElement.clientWidth - 20,
  height: document.documentElement.clientHeight - 20,
  pixelArt: true,

  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },

  scene: [TerrainGenerationScene, MainScene],
};

export const phaserConfig = {
  setup: () => new Phaser.Game(config),
};
