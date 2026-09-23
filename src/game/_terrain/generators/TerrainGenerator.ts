import * as Phaser from "phaser";
import { createNoise2D, type NoiseFunction2D } from "simplex-noise";
import {
  LayerInputIntention,
  MapInputController,
} from "../controllers/MapInputController";
import { MapLabel } from "../entities/MapLabel";
import { MapNoise } from "../entities/MapNoise";
import { MapRect } from "../entities/MapRect";
import { NOISE_SCALE } from "../scenes/TerrainGenerationScene";

interface Position {
  x: number;
  y: number;
}

enum MapLayer {
  GRAY,
  COLOR,
  TILE,
}

export class TerrainGenerator {
  private scene: Phaser.Scene;
  private generator: NoiseFunction2D;

  private currentLayer: number = 0;

  private noises: Map<Position, MapNoise> = new Map();
  private tiles: Map<Position, MapRect> = new Map();
  private labels: Map<Position, MapLabel> = new Map();

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.generator = createNoise2D();
  }

  generateNoise(x: number, y: number): number {
    const value = this.generator(x / NOISE_SCALE, y / NOISE_SCALE);

    const normalized = (value + 1) / 2;

    return normalized;
  }

  generateNoiseMap(rows: number, columns: number) {
    for (let x = 0; x <= rows; x++) {
      for (let y = 0; y <= columns; y++) {
        const noiseValue = this.generateNoise(x, y);
        const noise = new MapNoise(
          {
            x,
            y,
          },
          noiseValue,
        );

        const tile = new MapRect({
          mapNoise: noise,
          scene: this.scene,
        }).drawCell();

        const label = new MapLabel({
          mapNoise: noise,
          scene: this.scene,
        }).renderLabel();

        const positionKey = noise.getPosition();

        this.noises.set(positionKey, noise);
        this.tiles.set(positionKey, tile);
        this.labels.set(positionKey, label);
      }
    }

    return this;
  }

  toggleLabels() {
    for (const [, label] of this.labels) label.toggleText();
  }

  onColorLayer() {
    for (const [, tile] of this.tiles) tile.switchToColored();
  }

  onGrayLayer() {
    for (const [, tile] of this.tiles) tile.switchToGrayscale();
  }

  changeLayer() {
    switch (this.currentLayer) {
      case MapLayer.GRAY:
        this.onGrayLayer();
        break;
      case MapLayer.COLOR:
        this.onColorLayer();
        break;
      case MapLayer.TILE:
        console.log("change layer to tile");
        break;
    }
  }

  onSwitchLayer(mapInput: MapInputController) {
    const intention = mapInput.handleLayerSwitch();

    if (intention === LayerInputIntention.NONE) return;

    if (intention === LayerInputIntention.UP) {
      const nextLayer = this.currentLayer + 1;
      this.currentLayer = Math.min(nextLayer, 2);
    } else if (intention === LayerInputIntention.DOWN) {
      const nextLayer = this.currentLayer - 1;
      this.currentLayer = Math.max(nextLayer, 0);
    }

    this.changeLayer();
  }

  onToggleLabel(mapInput: MapInputController) {
    const toggle = mapInput.handleLabelToggle();

    if (toggle) {
      this.toggleLabels();
    }
  }
}
