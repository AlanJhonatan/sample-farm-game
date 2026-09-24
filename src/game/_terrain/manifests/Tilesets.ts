const TILESET_URL = "assets/tilesets";

export type TilesetKeys =
  | "tiny-town-tilemap"
  | "tiny-farm-tilemap"
  | "water-custom-tilemap"
  | "tiny-dungeon-tilemap"
  | "pico-8-city";

export interface TilesetAsset {
  url: string;
  columns: number;
  rows: number;
  size: number;
}

interface Tile<T> {
  variant: T;
  x: number;
  y: number;
}

export type TilesetConfig = Record<TilesetKeys, TilesetAsset>;
type Tilesets<T> = Partial<Record<TilesetKeys, Tile<T>[]>>;

export const TILESETS_CONFIG: TilesetConfig = {
  "pico-8-city": {
    url: `${TILESET_URL}/pico-8-city.png`,
    columns: 24,
    rows: 15,
    size: 8,
  },
  "tiny-town-tilemap": {
    url: `${TILESET_URL}/tiny-town-tilemap.png`,
    columns: 12,
    rows: 11,
    size: 16,
  },
  "tiny-farm-tilemap": {
    url: `${TILESET_URL}/tiny-farm-tilemap.png`,
    columns: 12,
    rows: 11,
    size: 16,
  },
  "tiny-dungeon-tilemap": {
    url: `${TILESET_URL}/tiny-dungeon-tilemap.png`,
    columns: 12,
    rows: 11,
    size: 16,
  },
  "water-custom-tilemap": {
    url: `${TILESET_URL}/water-custom-tilemap.png`,
    columns: 4,
    rows: 2,
    size: 16,
  },
};

export type GrassTileVariant = "base" | "grass-simple" | "grass-flowers";

export const GRASS_TILES: Tilesets<GrassTileVariant> = {
  "tiny-town-tilemap": [
    {
      variant: "base",
      x: 0,
      y: 0,
    },
  ],
};

export type WaterTileVariant = "base";

export const WATER_TILES: Tilesets<WaterTileVariant> = {
  "pico-8-city": [
    {
      variant: "base",
      x: 1,
      y: 0,
    },
  ],
};

export type SandTileVariant = "base";

export const SAND_TILES: Tilesets<SandTileVariant> = {
  "pico-8-city": [
    {
      variant: "base",
      x: 2,
      y: 0,
    },
  ],
};

export type StoneTileVariant = "base";

export const STONE_TILES: Tilesets<StoneTileVariant> = {
  "pico-8-city": [
    {
      variant: "base",
      x: 3,
      y: 0,
    },
  ],
};
