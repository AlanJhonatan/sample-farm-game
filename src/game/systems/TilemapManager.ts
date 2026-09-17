import * as Phaser from "phaser";
import type { Player } from "../entities/player/Player";

export class TilemapManager {
  private scene: Phaser.Scene;
  private tilemap: Phaser.Tilemaps.Tilemap;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.tilemapTiledJSON(
      "base-map",
      "assets/tilemaps/base-map-0.1.4.json",
    );

    this.scene.load.image(
      "tilemap-farm",
      "assets/tilemaps/tilemap-tiny-farm_old.png",
    );

    this.scene.load.image(
      "tilemap-town",
      "assets/tilemaps/tilemap-tiny-town_old.png",
    );
  }

  create(player: Player) {
    this.tilemap = this.scene.make.tilemap({ key: "base-map" });
    const tilemapFarm = this.tilemap.addTilesetImage("tilemap", "tilemap-farm");
    const tilemapTown = this.tilemap.addTilesetImage(
      "tilemap-town",
      "tilemap-town",
    );

    this.tilemap.createLayer("ground", [tilemapFarm, tilemapTown], 0, 0);

    const wallLayer = this.tilemap.createLayer(
      "walls/trees",
      [tilemapFarm, tilemapTown],
      0,
      0,
    );

    this.tilemap.createLayer(
      "decoration/items",
      [tilemapFarm, tilemapTown],
      0,
      0,
    );

    wallLayer.setCollisionByProperty({ collides: true });

    this.scene.physics.add.collider(player, wallLayer);
    this.scene.physics.add.collider(player, wallLayer);
  }

  getTilemap(): Phaser.Tilemaps.Tilemap {
    return this.tilemap;
  }
}
