import * as Phaser from "phaser";
import { MapInputController } from "../_terrain/controllers/MapInputController";
import { MouseInputController } from "../_terrain/controllers/MouseInputController";
import { TileDebugRenderer } from "../_terrain/debug/TileDebugRenderer";
import { MouseEventEmitter } from "../_terrain/events/MouseInputEvents";
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
  private terrainTilemapManager: TerrainTilemapManager;
  private tilesetManager: TerrainTilesetManager;

  // EVENTS
  private mouseEventEmitter: MouseEventEmitter;

  // DEBUG
  private tileDebugRenderer: TileDebugRenderer;

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

    this.mouseInputController = new MouseInputController({
      scene: this,
    });

    this.tileDebugRenderer = new TileDebugRenderer({ scene: this });
    this.mouseEventEmitter = new MouseEventEmitter();
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

    this.tileDebugRenderer.register(
      this.terrainTilemapManager,
      this.mouseEventEmitter,
    );
    this.mouseInputController.register(this.mouseEventEmitter);

    this.inputController.create();
    this.mapInputController.create();
    this.terrainTilemapManager.create();
    this.mouseInputController.create();
    this.tileDebugRenderer.create();

    const boundX = TILEMAP.config.width * TILEMAP.config.columns;
    const boundY = TILEMAP.config.height * TILEMAP.config.rows;
    this.cameras.main.setBounds(0, 0, boundX, boundY);

    this.terrainNoisemap.generateNoiseMap();

    this.terrainTilemapManager.generateTerrainFromNoise();
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
