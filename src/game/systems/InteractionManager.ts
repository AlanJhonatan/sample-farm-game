import * as Phaser from "phaser";
import type { FacingTile } from "../entities/player/Player";
import type { IInteractable } from "../interfaces/Interactables";
import { InteractionPrompt } from "../ui/InteractionPrompt";
import type { InputController } from "./InputController";

export class InteractionManager {
  private interactables: IInteractable[] = [];
  private interactionPrompt: InteractionPrompt;
  private inputController: InputController;

  constructor(private scene: Phaser.Scene) {}

  create(
    interactionPrompt: InteractionPrompt,
    inputController: InputController,
  ) {
    this.interactionPrompt = interactionPrompt;
    this.inputController = inputController;
  }

  register(...interactables: IInteractable[]) {
    this.interactables.push(...interactables);
  }

  checkInteraction(facingTile: FacingTile) {
    const target = this.interactables.find(
      (interactable) =>
        interactable.tilePosition.x === facingTile.x &&
        interactable.tilePosition.y === facingTile.y,
    );

    if (!target) {
      this.interactionPrompt.hide();
      return;
    }

    if (target.isInteractable()) {
      this.interactionPrompt.showAt(target.sprite.x, target.sprite.y);
    }

    if (this.inputController.getInteractionIntent()) {
      target.onInteract();
    }
  }
}
