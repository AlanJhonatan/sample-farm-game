import * as Phaser from "phaser";

import type { MovementIntent } from "../../systems/InputController";
import { PlayerAnimator } from "./PlayerAnimator";

export enum Direction {
  Right,
  Left,
  Up,
  Down,
}

interface FacingTile {
  x: number;
  y: number;
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  private readonly speed = 150;
  private animator: PlayerAnimator;

  private facing: Direction = Direction.Down;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(15, 15);
    this.body.setOffset(8, 10);
    this.setDepth(10);

    this.animator = new PlayerAnimator(this);
  }

  getFacingTile(tilemap: Phaser.Tilemaps.Tilemap): FacingTile {
    const [playerX, playerY] = [
      tilemap.worldToTileX(this.x),
      tilemap.worldToTileY(this.y),
    ];

    const offsets: Record<Direction, [number, number]> = {
      [Direction.Right]: [1, 0],
      [Direction.Left]: [-1, 0],
      [Direction.Up]: [0, -1],
      [Direction.Down]: [0, 1],
    };

    const [offsetX, offsetY] = offsets[this.facing];
    const [facingX, facingY] = [playerX + offsetX, playerY + offsetY];

    return {
      x: facingX,
      y: facingY,
    };
  }

  setFacing(direction: Direction) {
    this.facing = direction;
  }

  getFacing() {
    return this.facing;
  }

  update(moveIntent: MovementIntent, time: number) {
    this.setVelocity(moveIntent.x * this.speed, moveIntent.y * this.speed);
    this.animator.update(moveIntent);
  }
}
