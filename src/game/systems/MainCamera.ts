import * as Phaser from "phaser";
import type { Player } from "../entities/player/Player";

export class MainCamera {
  constructor(private scene: Phaser.Scene) {}

  create(tilemap: Phaser.Tilemaps.Tilemap, player: Player) {
    this.scene.cameras.main.setZoom(2.25);
    this.scene.cameras.main.setBounds(
      0,
      0,
      tilemap.widthInPixels,
      tilemap.heightInPixels,
    );

    this.scene.cameras.main.startFollow(player, true);
  }
}
