import * as Phaser from "phaser";

import { TILE_SIZE } from "../scenes/TerrainGenerationScene";
import type { MapNoise } from "./MapNoise";

interface MapLabelProps {
  scene: Phaser.Scene;
  mapNoise: MapNoise;
}

export class MapLabel {
  private scene: Phaser.Scene;
  private mapNoise: MapNoise;
  private label: Phaser.GameObjects.Text;

  constructor(props: MapLabelProps) {
    this.scene = props.scene;
    this.mapNoise = props.mapNoise;
  }

  renderLabel(): MapLabel {
    const noisePosition = this.mapNoise.getPosition();
    const noiseX = noisePosition.x * TILE_SIZE;
    const noiseY = noisePosition.y * TILE_SIZE;

    const noiseValue = this.mapNoise.getNoiseValue().toFixed(2);

    this.label = this.scene.add
      .text(
        noiseX,
        noiseY + 16,
        [`[${noisePosition.x}, ${noisePosition.y}]`, `${noiseValue}`],
        {
          fontSize: "16px",
          backgroundColor: "#00000040",
          align: "center",
        },
      )
      .setOrigin(0, 0)
      .setDepth(10);

    return this;
  }

  toggleText() {
    this.label.setVisible(!this.label.visible);

    return this;
  }
}
