import * as Phaser from "phaser";

import { PlayerAnimations } from "../animations";
import { Player } from "../entities/player/Player";
import { InputController } from "../systems/InputController";
import { MainCamera } from "../systems/MainCamera";
import { TilemapManager } from "../systems/TilemapManager";

export class MainScene extends Phaser.Scene {
  private player: Player;
  private playerAnimations: PlayerAnimations;

  private inputController: InputController;

  private tilemapManager: TilemapManager;
  private mainCamera: MainCamera;

  constructor() {
    super("MainScene");

    this.tilemapManager = new TilemapManager(this);
    this.playerAnimations = new PlayerAnimations(this);
    this.inputController = new InputController(this);
    this.mainCamera = new MainCamera(this);
  }

  preload() {
    this.playerAnimations.preload();
    this.tilemapManager.preload();
  }

  create() {
    const tilemap = this.make.tilemap({ key: "base-map" });

    this.playerAnimations.create();
    this.player = new Player(this, 50, 50);

    this.tilemapManager.create(tilemap, this.player);
    this.inputController.create();

    this.physics.world.setBounds(
      0,
      0,
      tilemap.widthInPixels,
      tilemap.heightInPixels,
    );

    this.mainCamera.create(tilemap, this.player);
  }

  update(): void {
    this.player.update(this.inputController.getMovementIntent());
  }
}
