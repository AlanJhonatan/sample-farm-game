import { MAP_COLOR, TILE_SIZE } from "../scenes/TerrainGenerationScene";
import type { MapNoise } from "./MapNoise";

interface MapTileProps {
  scene: Phaser.Scene;
  mapNoise: MapNoise;
}

export class MapRect {
  private mapNoise: MapNoise;
  private scene: Phaser.Scene;
  private tile: Phaser.GameObjects.Rectangle;

  constructor(props: MapTileProps) {
    this.mapNoise = props.mapNoise;
    this.scene = props.scene;
  }

  drawCell(): MapRect {
    const noisePosition = this.mapNoise.getPosition();
    const noiseX = noisePosition.x * TILE_SIZE;
    const noiseY = noisePosition.y * TILE_SIZE;

    const noiseValue = this.mapNoise.getNoiseValue();

    const tileColor = this.noiseToGrayScale(noiseValue);

    this.tile = this.scene.add
      .rectangle(noiseX, noiseY, TILE_SIZE, TILE_SIZE, tileColor)
      .setStrokeStyle(1, 0x000000)
      .setOrigin(0, 0)
      .setDepth(9);

    return this;
  }

  switchToColored(): MapRect {
    this.tile.setFillStyle(this.noiseToColor(this.mapNoise.getNoiseValue()));

    return this;
  }

  switchToGrayscale() {
    this.tile.setFillStyle(
      this.noiseToGrayScale(this.mapNoise.getNoiseValue()),
    );

    return this;
  }

  noiseToColor(noiseValue: number): number {
    if (noiseValue < 0.2) return MAP_COLOR.water;
    else if (noiseValue < 0.35) return MAP_COLOR.sand;
    else if (noiseValue < 0.55) return MAP_COLOR.grass;
    else if (noiseValue < 0.7) return MAP_COLOR.grass_dark;
    else if (noiseValue < 0.9) return MAP_COLOR.tree;
    else return MAP_COLOR.rock;
  }

  noiseToGrayScale(noise: number): number {
    // Multiply by 255 to map the 0-1 value to an RGB channel
    const val = Math.floor(noise * -255);

    // Bitshift the value into a hex color: 0xRRGGBB
    return (val << 16) + (val << 8) + val;
  }
}
