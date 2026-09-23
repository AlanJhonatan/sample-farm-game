import type { Tilesets } from "../managers/TerrainTilesetManager";

export interface TileProps {
  key: string;
  variant: string;
  x: number;
  y: number;
  tilesetName: Tilesets;
}

export class Tile {
  public key: string;
  public variant: string;
  public x: number;
  public y: number;

  private tilesetName: Tilesets;

  constructor(props: TileProps) {
    this.key = props.key;
    this.variant = props.variant;
    this.x = props.x;
    this.y = props.y;
    this.tilesetName = props.tilesetName;
  }

  getKey() {
    return this.key;
  }

  getTileset(): Tilesets {
    return this.tilesetName;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}
