import * as Phaser from "phaser";

export interface MovementIntent {
  x: number;
  y: number;
}

interface WasdKeys {
  w: Phaser.Input.Keyboard.Key;
  a: Phaser.Input.Keyboard.Key;
  s: Phaser.Input.Keyboard.Key;
  d: Phaser.Input.Keyboard.Key;
}

export class InputController {
  private scene: Phaser.Scene;
  private wasd: WasdKeys;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create() {
    this.cursors = this.scene.input.keyboard!.createCursorKeys();
    this.wasd = this.scene.input.keyboard.addKeys(
      "w,a,s,d",
    ) as unknown as WasdKeys;
  }

  private isDown(...keys: (Phaser.Input.Keyboard.Key | undefined)[]): boolean {
    return keys.some((key) => key?.isDown);
  }

  getMovementIntent(): MovementIntent {
    const left = this.isDown(this.cursors.left, this.wasd.a);
    const right = this.isDown(this.cursors.right, this.wasd.d);
    const up = this.isDown(this.cursors.up, this.wasd.w);
    const down = this.isDown(this.cursors.down, this.wasd.s);

    return {
      x: left ? -1 : right ? 1 : 0,
      y: up ? -1 : down ? 1 : 0,
    };
  }
}
