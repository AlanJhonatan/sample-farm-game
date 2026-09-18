import * as Phaser from "phaser";

export class InteractionPrompt {
  private scene: Phaser.Scene;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create() {
    this.text = this.scene.add
      .text(0, 0, "E to interact", {
        fontSize: "20px",
        color: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 4, y: 2 },
      })
      .setOrigin(0.5, 1)
      .setDepth(999999)
      .setVisible(false)
      .setScale(0.5);
  }

  showAt(worldX: number, worldY: number) {
    this.text.setPosition(worldX, worldY - 4);
    this.text.setVisible(true);
  }

  hide() {
    this.text.setVisible(false);
  }
}
