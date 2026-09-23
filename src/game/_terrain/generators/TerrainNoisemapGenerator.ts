import { createNoise2D, type NoiseFunction2D } from "simplex-noise";
import { NOISE_SCALE } from "../../scenes/TerrainGenerationScene";
import { Noise } from "../entities/Noise";
import type { TerrainTilemapManager } from "../managers/TerrainTilemapManager";

export class TerrainNoisemapGenerator {
  private tilemapManager: TerrainTilemapManager;
  private generator: NoiseFunction2D;

  private noises: Map<string, Noise> = new Map();

  constructor() {
    this.generator = createNoise2D();
  }

  register(tilemapManager: TerrainTilemapManager) {
    this.tilemapManager = tilemapManager;
  }

  generateNoise(x: number, y: number): number {
    const value = this.generator(x / NOISE_SCALE, y / NOISE_SCALE);

    const normalized = (value + 1) / 2;

    return normalized;
  }

  generateNoiseMap() {
    const rows = this.tilemapManager.getTilemap().width;
    const columns = this.tilemapManager.getTilemap().height;

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        const noiseValue = this.generateNoise(x, y);
        const position = { x, y };

        const noise = new Noise(position, noiseValue);

        const positionKey = noise.toMapId();

        this.noises.set(positionKey, noise);
      }
    }

    return this;
  }

  getNoisemapAt(x: number, y: number): Noise {
    return this.noises.get(`[${x},${y}]`);
  }

  getNoises() {
    return this.noises;
  }
}
