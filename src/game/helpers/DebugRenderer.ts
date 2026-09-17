import * as Phaser from "phaser";

export class DebugRenderer {
  private graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene) {
    this.graphics = scene.add.graphics();
    this.graphics.setDepth(9999);
  }

  drawFacingTile(worldX: number, worldY: number, size: number) {
    this.graphics.clear(); // limpa o frame anterior, senão acumula quadrados
    this.graphics.lineStyle(2, 0xff0000, 1); // borda vermelha, espessura 2
    this.graphics.strokeRect(worldX, worldY, size, size);
  }
}
