import * as Phaser from "phaser";

import type { MovementIntent } from "../../systems/InputController";
import { PlayerAnimator } from "./PlayerAnimator";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private readonly speed = 150;

  private animator: PlayerAnimator;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(15, 15);
    this.body.setOffset(8, 10);
    this.setDepth(10);

    this.animator = new PlayerAnimator(this);
  }

  update(moveIntent: MovementIntent) {
    this.setVelocity(moveIntent.x * this.speed, moveIntent.y * this.speed);
    this.animator.update(moveIntent);
  }
}
