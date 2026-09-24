import type { TerrainType } from "../manifests/TerrainTreshold";

export interface TileProps {
  key: string;
  variant: string;
  x: number;
  y: number;
  tilesetName: TerrainType;
}

export class Tile {
  public key: string;
  public variant: string;
  public x: number;
  public y: number;

  private tilesetName: TerrainType;

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

  getTileset(): TerrainType {
    return this.tilesetName;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}

export class GrassTile extends Tile {
  constructor(props: TileProps) {
    super(props);
  }
}

export class TreeTile extends Tile {
  constructor(props: TileProps) {
    super(props);
  }
}

export class WaterTile extends Tile {
  constructor(props: TileProps) {
    super(props);
  }
}

export class SandTile extends Tile {
  constructor(props: TileProps) {
    super(props);
  }
}

export class StoneTile extends Tile {
  constructor(props: TileProps) {
    super(props);
  }
}
