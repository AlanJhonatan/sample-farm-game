import { GrassTile } from "../entities/GrassTile";
import type { Tile } from "../entities/Tile";
import {
  GRASS_TILES,
  TILESETS_CONFIG,
  type GrassTileVariant,
  type TilesetAsset,
} from "../manifests/Tilesets";

export type Tilesets = "grass";

export class TerrainTilesetManager {
  private grassTiles: Map<GrassTileVariant, GrassTile> = new Map();

  private tileset: Map<Tilesets, Map<string, Tile>> = new Map();

  constructor() {
    this.registerGrassTiles();

    this.tileset.set("grass", this.grassTiles);
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

  getGrassTile(tilesetName: Tilesets, variant: GrassTileVariant) {
    const tileset = this.tileset.get(tilesetName);
    return tileset.get(variant);
  }

  tileToLocalGID(tile: Tile) {
    const tileset = TILESETS_CONFIG[tile.key] as TilesetAsset;
    return tile.y * tileset.columns + tile.x;
  }
}
