import {
  GrassTile,
  SandTile,
  StoneTile,
  WaterTile,
  type Tile,
} from "../entities/Tile";
import type { TerrainType } from "../manifests/TerrainTreshold";
import {
  GRASS_TILES,
  SAND_TILES,
  STONE_TILES,
  TILESETS_CONFIG,
  WATER_TILES,
  type GrassTileVariant,
  type SandTileVariant,
  type StoneTileVariant,
  type TilesetAsset,
  type WaterTileVariant,
} from "../manifests/Tilesets";

interface TilesetVariantMap {
  grass: GrassTileVariant;
  water: WaterTileVariant;
  stone: StoneTileVariant;
  sand: SandTileVariant;
}

export class TerrainTilesetManager {
  private grassTiles: Map<GrassTileVariant, GrassTile> = new Map();
  private waterTiles: Map<WaterTileVariant, WaterTile> = new Map();
  private stoneTiles: Map<StoneTileVariant, StoneTile> = new Map();
  private sandTiles: Map<SandTileVariant, SandTile> = new Map();

  private tileset: Map<TerrainType, Map<string, Tile>> = new Map();

  constructor() {
    this.registerGrassTiles();
    this.registerWaterTiles();
    this.registerStoneTiles();
    this.registerSandTiles();

    this.tileset.set("grass", this.grassTiles);
    this.tileset.set("water", this.waterTiles);
    this.tileset.set("stone", this.stoneTiles);
    this.tileset.set("sand", this.sandTiles);
  }

  private registerGrassTiles() {
    const entries = Object.entries(GRASS_TILES);

    entries.forEach(([key, tiles]) => {
      tiles.forEach((tile) => {
        const grass = new GrassTile({
          key,
          variant: tile.variant,
          x: tile.x,
          y: tile.y,
          tilesetName: "grass",
        });

        this.grassTiles.set(tile.variant, grass);
      });
    });
  }

  registerWaterTiles() {
    const entries = Object.entries(WATER_TILES);

    entries.forEach(([key, tiles]) => {
      tiles.forEach((tile) => {
        const water = new WaterTile({
          key,
          variant: tile.variant,
          x: tile.x,
          y: tile.y,
          tilesetName: "water",
        });

        this.waterTiles.set(tile.variant, water);
      });
    });
  }

  registerStoneTiles() {
    const entries = Object.entries(STONE_TILES);

    entries.forEach(([key, tiles]) => {
      tiles.forEach((tile) => {
        const stone = new StoneTile({
          key,
          variant: tile.variant,
          x: tile.x,
          y: tile.y,
          tilesetName: "stone",
        });

        this.stoneTiles.set(tile.variant, stone);
      });
    });
  }

  registerSandTiles() {
    const entries = Object.entries(SAND_TILES);

    entries.forEach(([key, tiles]) => {
      tiles.forEach((tile) => {
        const sand = new SandTile({
          key,
          variant: tile.variant,
          x: tile.x,
          y: tile.y,
          tilesetName: "sand",
        });

        this.sandTiles.set(tile.variant, sand);
      });
    });
  }

  getTileFromTileset<T extends TerrainType>(
    tilesetName: T,
    variant: TilesetVariantMap[T],
  ) {
    const tileset = this.tileset.get(tilesetName);
    return tileset.get(variant);
  }

  tileToLocalGID(tile: Tile) {
    const tileset = TILESETS_CONFIG[tile.key] as TilesetAsset;
    return tile.y * tileset.columns + tile.x;
  }
}
