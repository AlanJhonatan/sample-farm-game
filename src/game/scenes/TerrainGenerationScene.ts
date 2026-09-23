import * as Phaser from "phaser";
import { MapInputController } from "../_terrain/controllers/MapInputController";
import { TerrainNoisemapGenerator } from "../_terrain/generators/TerrainNoisemapGenerator";
import { TerrainTilesetLoader } from "../_terrain/loaders/TerrainTilesetLoader";
import { TerrainTilemapManager } from "../_terrain/managers/TerrainTilemapManager";
import { TerrainTilesetManager } from "../_terrain/managers/TerrainTilesetManager";
import { TILEMAP } from "../_terrain/manifests/Tilemap";
import { InputController } from "../systems/InputController";

const CAM_MUTIPLIER = 2;
const CAM_SPEED = 50;

export class TerrainGenerationScene extends Phaser.Scene {
  private tilemap: Phaser.Tilemaps.Tilemap;

  private terrainNoisemap: TerrainNoisemapGenerator;

  //CONTROLLERS
  private inputController: InputController;
  private mapInputController: MapInputController;
  private mouseInputController: MouseInputController;

  // LOADERS
  private tilesetLoader: TerrainTilesetLoader;

  // MANAGERS
  private tilemapManager: TerrainTilemapManager;
  private tilesetManager: TerrainTilesetManager;

  constructor() {
    super("TerrainGeneration");

    this.mapInputController = new MapInputController(this);
    this.inputController = new InputController(this);

    this.terrainNoisemap = new TerrainNoisemapGenerator();

    this.terrainTilemapManager = new TerrainTilemapManager({
      scene: this,
    });

    this.tilesetLoader = new TerrainTilesetLoader({
      scene: this,
    });

    this.tilesetManager = new TerrainTilesetManager();

    this.tilemapManager.register(this.tilesetManager, this.tilesetLoader);
    this.terrainNoisemap.register(this.tilemapManager);
  }

  preload() {
    this.tilesetLoader.preload();
  }

  create() {
    this.tilemap = this.make.tilemap({
      tileWidth: TILEMAP.config.width,
      tileHeight: TILEMAP.config.height,
      width: TILEMAP.config.columns,
      height: TILEMAP.config.rows,
    });

    this.terrainTilemapManager.register(
      this.tilemap,
      this.tilesetManager,
      this.tilesetLoader,
      this.terrainNoisemap,
    );

    this.terrainNoisemap.register(this.terrainTilemapManager);

    this.cameras.main.setBounds(
      0,
      0,
      MAP_TILES_SIZE.x * TILE_SIZE,
      MAP_TILES_SIZE.y * TILE_SIZE,
    );

    this.terrainNoisemap.generateNoiseMap();
    console.log(this.terrainNoisemap.getNoises());
  }

  update() {
    const move = this.inputController.getMovementIntent();
    const run = this.inputController.getRunIntent();

    const mutiplier = run ? CAM_MUTIPLIER : 1;

    this.cameras.main.scrollX += move.x * CAM_SPEED * mutiplier;
    this.cameras.main.scrollY += move.y * CAM_SPEED * mutiplier;

    this.cameras.main.setZoom(1.5);

    // this.terrainGenerator.onSwitchLayer(this.mapInputController);
    // this.terrainGenerator.onToggleLabel(this.mapInputController);
  }
}
