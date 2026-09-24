import * as Phaser from "phaser";
import type { MouseEventEmitter } from "../events/MouseInputEvents";
import type { TerrainTilemapManager } from "../managers/TerrainTilemapManager";

interface TileDebugRendererProps {
  scene: Phaser.Scene;
}

interface Position {
  x: number;
  y: number;
}

export class TileDebugRenderer {
  private scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Graphics;

  private mouseEvent: MouseEventEmitter;
  private tilemapManager: TerrainTilemapManager;

  constructor(props: TileDebugRendererProps) {
    this.scene = props.scene;
  }

  register(
    tilemapManager: TerrainTilemapManager,
    mouseEvent: MouseEventEmitter,
  ) {
    this.tilemapManager = tilemapManager;
    this.mouseEvent = mouseEvent;
  }

  create() {
    this.graphics = this.scene.add.graphics();
    this.mouseEvent.on("tile-hovered", this.onTileHovered);
    this.mouseEvent.on("tile-clicked", this.onTileClicked);
  }

  drawRect(position: Position) {
    const tileSize = 8;
    const worldX = position.x * tileSize;
    const worldY = position.y * tileSize;
    this.graphics.clear();
    this.graphics
      .strokeRect(worldX, worldY, tileSize, tileSize)
      .lineStyle(1, 0xaa0000);
  }

  onTileHovered = (position: Position) => {
    this.drawRect(position);
  };

  onTileClicked = (position: Position) => {
    const tile = this.tilemapManager.getTerrainTypeAt(position);
    console.log("clicked on", tile);
  };
}
