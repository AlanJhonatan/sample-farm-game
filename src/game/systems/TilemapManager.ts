import * as Phaser from "phaser";
import type { Player } from "../entities/player/Player";

export class TilemapManager {
  private scene: Phaser.Scene;

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
      "assets/tilemaps/tilemap-tiny-farm.png",
    );

    this.scene.load.image(
      "tilemap-town",
      "assets/tilemaps/tilemap-tiny-town.png",
    );
  }

  create(tilemap: Phaser.Tilemaps.Tilemap, player: Player) {
    const tilemapFarm = tilemap.addTilesetImage("tilemap", "tilemap-farm");
    const tilemapTown = tilemap.addTilesetImage("tilemap-town", "tilemap-town");

    tilemap.createLayer("ground", [tilemapFarm, tilemapTown], 0, 0);

    const wallLayer = tilemap.createLayer(
      "walls/trees",
      [tilemapFarm, tilemapTown],
      0,
      0,
    );

    tilemap.createLayer("decoration/items", [tilemapFarm, tilemapTown], 0, 0);

    wallLayer.setCollisionByProperty({ collides: true });

    this.scene.physics.add.collider(player, wallLayer);
    this.scene.physics.add.collider(player, wallLayer);

    const objectsLayer = tilemap.getObjectLayer("items");
    console.log("objectsLayer", objectsLayer);

    const debugCollision = this.scene.add.graphics().setAlpha(0.5);

    wallLayer.renderDebug(debugCollision, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(255, 0, 0, 150),
      faceColor: new Phaser.Display.Color(0, 255, 0, 200),
    });

    console.log("tree", tilemap.getLayer("walls/trees"));
  }
}
