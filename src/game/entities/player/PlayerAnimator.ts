import type { MovementIntent } from "../../systems/InputController";

enum Direction {
  Right,
  Left,
  Up,
  Down,
}

export class PlayerAnimator {
  private sprite: Phaser.GameObjects.Sprite;
  private lastDirection: Direction;

  constructor(sprite: Phaser.GameObjects.Sprite) {
    this.sprite = sprite;
  }

  update(moveIntent: MovementIntent) {
    if (moveIntent.x !== 0) {
      this.sprite.setFlipX(moveIntent.x < 0);
      this.sprite.anims.play("player-walking-right", true);
      this.lastDirection = moveIntent.x < 0 ? Direction.Left : Direction.Right;
    } else if (moveIntent.y !== 0) {
      this.sprite.anims.play(
        moveIntent.y < 0 ? "player-walking-up" : "player-walking-down",
        true,
      );
      this.lastDirection = moveIntent.y < 0 ? Direction.Up : Direction.Down;
    } else {
      if (
        this.lastDirection === Direction.Left ||
        this.lastDirection === Direction.Right
      ) {
        this.sprite.play("player-idle-right", true);
      } else if (this.lastDirection === Direction.Up) {
        this.sprite.play("player-idle-up", true);
      } else {
        this.sprite.play("player-idle-down", true);
      }
    }
  }
}
