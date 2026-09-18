import * as Phaser from "phaser";

export class MapTileDebug {
  constructor() {}

  drawTiles(
    graphics: Phaser.GameObjects.Graphics,
    rows: number,
    columns: number,
  ) {
    graphics.lineStyle(1, 0xff0000);
    graphics.setDepth(999999);
    graphics.setAlpha(0.01);

    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= columns; j++) {
        graphics.lineBetween(0, i * 16, columns * 16, i * 16);
        graphics.lineBetween(j * 16, 0, j * 16, rows * 16);
      }
    }
  }
}
