import * as Phaser from "phaser";

export interface IInteractable {
  sprite: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  tilePosition: {
    x: number;
    y: number;
  };
  onInteract(): void;
  isInteractable(): boolean;
}

// export interface InteractableTree {}
