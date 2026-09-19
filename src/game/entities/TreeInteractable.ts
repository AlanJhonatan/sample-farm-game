import * as Phaser from "phaser";

import type { IInteractable } from "../interfaces/Interactables";
import type { TreeInstance } from "./TreeManager";

export class TreeInteractable implements IInteractable {
  private treeInstance: TreeInstance;
  private scene: Phaser.Scene;

  tilePosition: { x: number; y: number };
  sprite: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor(scene: Phaser.Scene, treeInstance: TreeInstance) {
    this.scene = scene;
    this.treeInstance = treeInstance;
    this.sprite = treeInstance.anchorPiece;
    this.tilePosition = treeInstance.position;
  }

  onInteract(): void {
    this.treeInstance.pieces.forEach((piece) => piece.destroy());
  }

  isInteractable(): boolean {
    return (
      this.treeInstance.properties.interactable &&
      this.treeInstance.properties.choppable
    );
  }
}
