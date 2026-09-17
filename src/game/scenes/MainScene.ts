import * as Phaser from "phaser";

import { PlayerAnimations } from "../animations";
import { INITIAL_TREES } from "../configs/trees";
import { Player } from "../entities/player/Player";
import { TreeManager } from "../entities/TreeManager";
import { InputController } from "../systems/InputController";
import { MainCamera } from "../systems/MainCamera";
import { TilemapManager } from "../systems/TilemapManager";

export class MainScene extends Phaser.Scene {
  private player: Player;
  private playerAnimations: PlayerAnimations;

  private inputController: InputController;

  private tilemapManager: TilemapManager;
  private mainCamera: MainCamera;

  private treeManager: TreeManager;

  constructor() {
    super("MainScene");

    this.tilemapManager = new TilemapManager(this);
    this.playerAnimations = new PlayerAnimations(this);
    this.inputController = new InputController(this);
    this.mainCamera = new MainCamera(this);
    this.treeManager = new TreeManager(this);
  }

  preload() {
    this.playerAnimations.preload();
    this.tilemapManager.preload();
    this.treeManager.preload();
  }

  create() {
    this.playerAnimations.create();
    this.player = new Player(this, 50, 50);

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
  }

  update(time: number): void {
    const tilemap = this.tilemapManager.getTilemap();

    this.player.update(this.inputController.getMovementIntent(), time);
    this.player.getFacingTile(tilemap);
  }
}
