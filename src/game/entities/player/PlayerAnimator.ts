import type { MovementIntent } from "../../systems/InputController";
import { Direction, Player } from "./Player";

export class PlayerAnimator {
  private player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  update(moveIntent: MovementIntent) {
    if (moveIntent.x !== 0) {
      this.player.setFlipX(moveIntent.x < 0);
      this.player.anims.play("player-walking-right", true);

      const facing = moveIntent.x < 0 ? Direction.Left : Direction.Right;
      this.player.setFacing(facing);
    } else if (moveIntent.y !== 0) {
      this.player.anims.play(
        moveIntent.y < 0 ? "player-walking-up" : "player-walking-down",
        true,
      );
      const facing = moveIntent.y < 0 ? Direction.Up : Direction.Down;
      this.player.setFacing(facing);
    } else {
      const playerFacing = this.player.getFacing();
      const playerIsFacingSides =
        playerFacing === Direction.Left || playerFacing === Direction.Right;

      if (playerIsFacingSides) {
        this.player.play("player-idle-right", true);
      } else if (playerFacing === Direction.Up) {
        this.player.play("player-idle-up", true);
      } else {
        this.player.play("player-idle-down", true);
      }
    }
  }
}
