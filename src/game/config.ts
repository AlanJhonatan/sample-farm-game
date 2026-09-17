import * as Phaser from "phaser";

import { MainScene } from "./scenes/MainScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,

  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },

  scene: [MainScene],
};

export const phaserConfig = {
  setup: () => new Phaser.Game(config),
};
