const TILESET_URL = "assets/tilesets";

export type TilesetKeys = "tiny-town-tilemap" | "tiny-farm-tilemap";

export interface TilesetAsset {
  url: string;
  columns: number;
  rows: number;
  size: number;
  firstgid: number;
}

interface Tile {
  variant: GrassTileVariant;
  x: number;
  y: number;
}

export type TilesetConfig = Record<TilesetKeys, TilesetAsset>;
type Tilesets = Partial<Record<TilesetKeys, Tile[]>>;

export const TILESETS_CONFIG: TilesetConfig = {
  "tiny-town-tilemap": {
    url: `${TILESET_URL}/tiny-town-tilemap.png`,
    columns: 12,
    rows: 11,
    size: 16,
    firstgid: 0,
  },
  "tiny-farm-tilemap": {
    url: `${TILESET_URL}/tiny-farm-tilemap.png`,
    columns: 12,
    rows: 11,
    size: 16,
    firstgid: 132,
  },
};

export type GrassTileVariant = "grass" | "grass-simple" | "grass-flowers";

export const GRASS_TILES: Tilesets = {
  "tiny-town-tilemap": [
    {
      variant: "grass",
      x: 0,
      y: 0,
    },
    {
      variant: "grass-simple",
      x: 1,
      y: 0,
    },
    {
      variant: "grass-flowers",
      x: 2,
      y: 0,
    },
  ],
};
