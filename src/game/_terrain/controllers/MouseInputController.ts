import * as Phaser from "phaser";
import { MouseEventEmitter } from "../events/MouseInputEvents";
import { TILEMAP } from "../manifests/Tilemap";

interface MouseInputControllerProps {
  scene: Phaser.Scene;
}

export class MouseInputController {
  private scene: Phaser.Scene;
  private input: Phaser.Input.InputPlugin;
  private mouseEvent: MouseEventEmitter;

  constructor(props: MouseInputControllerProps) {
    this.scene = props.scene;
  }

  register(mouseEvent: MouseEventEmitter) {
    this.mouseEvent = mouseEvent;
  }

  create() {
    this.input = this.scene.input;

    this.input.on("pointerdown", this.handlePointerDown);
    this.input.on("pointermove", this.handlePointerMove);
  }

  getTilePositionFromViewport(x: number, y: number) {
    const worldPoint = this.scene.cameras.main.getWorldPoint(x, y);

    const tileSize = TILEMAP.config.width;

    const tileX = Math.floor(worldPoint.x / tileSize);
    const tileY = Math.floor(worldPoint.y / tileSize);

    return { x: tileX, y: tileY };
  }

  handlePointerDown = (pointer: Phaser.Input.Pointer) => {
    const tilePosition = this.getTilePositionFromViewport(pointer.x, pointer.y);
    this.mouseEvent.emit("tile-clicked", tilePosition);
  };

  handlePointerMove = (pointer: Phaser.Input.Pointer) => {
    const tilePosition = this.getTilePositionFromViewport(pointer.x, pointer.y);
    this.mouseEvent.emit("tile-hovered", tilePosition);
  };
}
