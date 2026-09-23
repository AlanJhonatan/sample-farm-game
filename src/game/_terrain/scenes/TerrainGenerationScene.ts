import * as Phaser from "phaser";
import { InputController } from "../../systems/InputController";
import { MapInputController } from "../controllers/MapInputController";
import { TerrainGenerator } from "../generators/TerrainGenerator";
import { TerrainTilesetLoader } from "../loaders/TerrainTilesetLoader";
import { TerrainTilemapManager } from "../managers/TerrainTilemapManager";
import { TerrainTilesetManager } from "../managers/TerrainTilesetManager";

const MAP_TILES_SIZE = {
  x: 50,
  y: 50,
};

export const NOISE_SCALE: number = 20;

export const TILE_SIZE = 64;

export const GRAY_SCALE: Record<number, number> = {
  0.1: 0x000000,
  0.2: 0x1c1c1c,
  0.3: 0x545454,
  0.4: 0x717171,
  0.5: 0x8d8d8d,
  0.6: 0xaaaaaa,
  0.7: 0xc6c6c6,
  0.9: 0xe2e2e2,
  1: 0xffffff,
};

export const MAP_COLOR = {
  water: 0x4e95cc,
  sand: 0xa19258,
  grass: 0x5db360,
  grass_dark: 0x326333,
  tree: 0x524001,
  rock: 0x454545,
};

const CAM_MUTIPLIER = 2;
const CAM_SPEED = 50;

export class TerrainGenerationScene extends Phaser.Scene {
  private terrainGenerator: TerrainGenerator;

  //CONTROLLERS
  private inputController: InputController;
  private mapInputController: MapInputController;

  // LOADERS
  private tilesetLoader: TerrainTilesetLoader;

  // MANAGERS
  private tilemapManager: TerrainTilemapManager;
  private tilesetManager: TerrainTilesetManager;

  constructor() {
    super("TerrainGeneration");

    this.mapInputController = new MapInputController(this);
    this.inputController = new InputController(this);
    this.terrainGenerator = new TerrainGenerator(this);

    this.tilemapManager = new TerrainTilemapManager({
      scene: this,
    });

    this.tilesetLoader = new TerrainTilesetLoader({
      scene: this,
    });

    this.tilesetManager = new TerrainTilesetManager();

    this.tilemapManager.register(this.tilesetManager, this.tilesetLoader);
  }

  preload() {
    this.tilesetLoader.preload();
  }

  create() {
    this.inputController.create();
    this.mapInputController.create();

    this.cameras.main.setOrigin(0, 0);
    this.cameras.main.setPosition(0, 0);

    this.cameras.main.setBounds(
      0,
      0,
      MAP_TILES_SIZE.x * TILE_SIZE,
      MAP_TILES_SIZE.y * TILE_SIZE,
    );

    // this.terrainGenerator.generateNoiseMap(MAP_TILES_SIZE.x, MAP_TILES_SIZE.y);

    this.tilemapManager.create();
  }

  update() {
    const move = this.inputController.getMovementIntent();
    const run = this.inputController.getRunIntent();

    const mutiplier = run ? CAM_MUTIPLIER : 1;

    this.cameras.main.scrollX += move.x * CAM_SPEED * mutiplier;
    this.cameras.main.scrollY += move.y * CAM_SPEED * mutiplier;

    // this.terrainGenerator.onSwitchLayer(this.mapInputController);
    // this.terrainGenerator.onToggleLabel(this.mapInputController);
  }
}
