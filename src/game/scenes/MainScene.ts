import * as Phaser from "phaser";

import { PlayerAnimations } from "../animations";
import { INITIAL_TREES } from "../configs/trees";
import { Player } from "../entities/player/Player";
import { TreeManager } from "../entities/TreeManager";
import { MapTileDebug } from "../helpers/MapTileDebug";
import { InputController } from "../systems/InputController";
import { InteractionManager } from "../systems/InteractionManager";
import { MainCamera } from "../systems/MainCamera";
import { TilemapManager } from "../systems/TilemapManager";
import { InteractionPrompt } from "../ui/InteractionPrompt";

export class MainScene extends Phaser.Scene {
  private player: Player;
  private playerAnimations: PlayerAnimations;

  private inputController: InputController;

  private tilemapManager: TilemapManager;
  private mainCamera: MainCamera;

  private treeManager: TreeManager;
  private interactionManager: InteractionManager;

  private mapTileDebug: MapTileDebug;

  private interactionPrompt: InteractionPrompt;

  constructor() {
    super("MainScene");

    this.tilemapManager = new TilemapManager(this);
    this.playerAnimations = new PlayerAnimations(this);
    this.inputController = new InputController(this);
    this.mainCamera = new MainCamera(this);
    this.treeManager = new TreeManager(this);
    this.interactionManager = new InteractionManager(this);
    this.interactionPrompt = new InteractionPrompt(this);

    this.mapTileDebug = new MapTileDebug();
  }

  preload() {
    this.playerAnimations.preload();
    this.tilemapManager.preload();
    this.treeManager.preload();
  }

  create() {
    this.playerAnimations.create();
    this.player = new Player(this, 1, 5);

    this.tilemapManager.create(this.player);
    const tilemap = this.tilemapManager.getTilemap();

    this.inputController.create();

    this.physics.world.setBounds(
      0,
      0,
      tilemap.widthInPixels,
      tilemap.heightInPixels,
    );

    this.mainCamera.create(tilemap, this.player);
    this.treeManager.create(INITIAL_TREES, this.player);

    const graphics = this.add.graphics();
    this.interactionManager.register(...this.treeManager.getInteractables());

    this.mapTileDebug.drawTiles(graphics, 20, 20);
    this.interactionPrompt.create();

    this.interactionManager.create(
      this.interactionPrompt,
      this.inputController,
    );
  }

  update(time: number): void {
    const tilemap: Phaser.Tilemaps.Tilemap = this.tilemapManager.getTilemap();

    this.player.update(this.inputController.getMovementIntent(), time);
    const facingTile = this.player.getFacingTile(tilemap);

    this.interactionManager.checkInteraction(facingTile);
  }
}
