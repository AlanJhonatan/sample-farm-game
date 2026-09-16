import * as Phaser from "phaser";

export class PlayerAnimations {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.spritesheet(
      "player-idle-up",
      "assets/sprites/player/player-idle-up.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.scene.load.spritesheet(
      "player-idle-down",
      "assets/sprites/player/player-idle-down.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.scene.load.spritesheet(
      "player-idle-right",
      "assets/sprites/player/player-idle-right.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.scene.load.spritesheet(
      "player-walking-up",
      "assets/sprites/player/player-walking-up.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.scene.load.spritesheet(
      "player-walking-down",
      "assets/sprites/player/player-walking-down.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.scene.load.spritesheet(
      "player-walking-right",
      "assets/sprites/player/player-walking-right.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
  }

  create() {
    this.scene.anims.create({
      key: "player-idle-up",
      frames: this.scene.anims.generateFrameNumbers("player-idle-up", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "player-idle-down",
      frames: this.scene.anims.generateFrameNumbers("player-idle-down", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "player-walking-up",
      frames: this.scene.anims.generateFrameNumbers("player-walking-up", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "player-walking-down",
      frames: this.scene.anims.generateFrameNumbers("player-walking-down", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "player-idle-right",
      frames: this.scene.anims.generateFrameNumbers("player-idle-right", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "player-walking-right",
      frames: this.scene.anims.generateFrameNumbers("player-walking-right", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
