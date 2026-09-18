import * as Phaser from "phaser";

import { DebugMessage } from "../../helpers/DebugMessage";
import type { MovementIntent } from "../../systems/InputController";
import { PlayerAnimator } from "./PlayerAnimator";

export enum Direction {
  Right,
  Left,
  Up,
  Down,
}

export interface FacingTile {
  x: number;
  y: number;
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  private readonly speed = 100;
  private animator: PlayerAnimator;

  private facing: Direction = Direction.Down;
  private facingTile: { x: number; y: number } = { x: 0, y: 0 };

  private debugMessage: DebugMessage;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const [tileX, tileY] = [x * 16 + 8, y * 16 + 8];
    super(scene, tileX, tileY, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setBodySize(14, 10);
    this.setOffset(9, 18);
    this.setOrigin(0.5, 1);

    this.setDepth(10);

    this.animator = new PlayerAnimator(this);
    this.debugMessage = new DebugMessage();
  }

  getFacingTile(tilemap: Phaser.Tilemaps.Tilemap): FacingTile {
    const [playerX, playerY] = [
      tilemap.worldToTileX(this.x + 4),
      tilemap.worldToTileY(this.y - 8),
    ];

    const offsets: Record<Direction, [number, number]> = {
      [Direction.Right]: [1, 0],
      [Direction.Left]: [-1, 0],
      [Direction.Up]: [0, -1],
      [Direction.Down]: [0, 1],
    };

    const [offsetX, offsetY] = offsets[this.facing];
    const [facingX, facingY] = [playerX + offsetX, playerY + offsetY];

    this.facingTile = {
      x: facingX,
      y: facingY,
    };

    return this.facingTile;
  }

  setFacing(direction: Direction) {
    this.facing = direction;
  }

  getFacing() {
    return this.facing;
  }

  update(moveIntent: MovementIntent, time: number) {
    this.debugMessage.timeUpdate(time);
    this.setVelocity(moveIntent.x * this.speed, moveIntent.y * this.speed);
    this.animator.update(moveIntent);
  }
}
