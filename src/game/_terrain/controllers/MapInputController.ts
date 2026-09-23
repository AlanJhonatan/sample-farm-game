import * as Phaser from "phaser";

export enum LayerInputIntention {
  NONE,
  UP,
  DOWN,
}

export class MapInputController {
  private scene: Phaser.Scene;

  private layerUpKey: Phaser.Input.Keyboard.Key;
  private layerDownKey: Phaser.Input.Keyboard.Key;
  private labelToggleKey: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create() {
    this.layerUpKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E,
    );

    this.layerDownKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.Q,
    );

    this.labelToggleKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R,
    );
  }

  handleLayerSwitch(): LayerInputIntention {
    const up = Phaser.Input.Keyboard.JustDown(this.layerUpKey);
    const down = Phaser.Input.Keyboard.JustDown(this.layerDownKey);

    if (up) return LayerInputIntention.UP;
    else if (down) return LayerInputIntention.DOWN;
    else return LayerInputIntention.NONE;
  }

  handleLabelToggle(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.labelToggleKey);
  }
}
