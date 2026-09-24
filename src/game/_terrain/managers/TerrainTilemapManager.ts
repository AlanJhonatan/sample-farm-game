import * as Phaser from "phaser";
import type { TerrainNoisemapGenerator } from "../generators/TerrainNoisemapGenerator";
import { tresholdHelper } from "../helpers/TresholdHelper";
import type { TerrainTilesetLoader } from "../loaders/TerrainTilesetLoader";
import { type TerrainType } from "../manifests/TerrainTreshold";
import type {
  GrassTileVariant,
  SandTileVariant,
  StoneTileVariant,
  WaterTileVariant,
} from "../manifests/Tilesets";
import { TerrainTilesetManager } from "./TerrainTilesetManager";

interface TilemapManagerProps {
  scene: Phaser.Scene;
}

interface TerrainVariantMap {
  grass: GrassTileVariant;
  water: WaterTileVariant;
  stone: StoneTileVariant;
  sand: SandTileVariant;
}

export class TerrainTilemapManager {
  private scene: Phaser.Scene;

  private tilemap: Phaser.Tilemaps.Tilemap;
  private tilesetManager: TerrainTilesetManager;
  private tilesetLoader: TerrainTilesetLoader;
  private terrainNoisemap: TerrainNoisemapGenerator;

  private terrainmap: Map<string, TerrainType> = new Map();

  constructor({ scene }: TilemapManagerProps) {
    this.scene = scene;
  }

  register(
    tilemap: Phaser.Tilemaps.Tilemap,
    tilesetManager: TerrainTilesetManager,
    tilesetLoader: TerrainTilesetLoader,
    terrainNoisemap: TerrainNoisemapGenerator,
  ) {
    this.tilemap = tilemap;
    this.tilesetManager = tilesetManager;
    this.tilesetLoader = tilesetLoader;
    this.terrainNoisemap = terrainNoisemap;
  }

  getTilemap() {
    return this.tilemap;
  }

  getTilesetGID() {
    if (!this.tilemap.tilesets.length) return 0;

    const lastTileset = this.tilemap.tilesets.at(-1);

    const lastgid = lastTileset.firstgid;
    const lastTotal = lastTileset.total - 1;

    return lastgid + lastTotal;
  }

  create() {
    const tilesetKeys = this.tilesetLoader.getTilesetKeys();

    tilesetKeys.forEach((key) => {
      const { size } = this.tilesetLoader.getTilesetInfo(key);
      const gid = this.getTilesetGID();

      return this.tilemap.addTilesetImage(key, key, size, size, 0, 0, gid);
    });

    this.tilemap.createBlankLayer("ground", tilesetKeys);
  }

  putTerrainTileAt<T extends TerrainType>(
    terrainType: T,
    tileVariant: TerrainVariantMap[T],
    x: number,
    y: number,
  ) {
    const tile = this.tilesetManager.getTileFromTileset(
      terrainType,
      tileVariant,
    );

    const localgid = this.tilesetManager.tileToLocalGID(tile);

    const tilesetIdx = this.tilemap.getTilesetIndex(tile.key);
    const tileset = this.tilemap.tilesets[tilesetIdx];

    const firstgid = tileset.firstgid;
    const gid = firstgid + localgid;

    this.tilemap.putTileAt(gid, x, y, false, "ground");
  }

  generateTerrainFromNoise() {
    const rows = this.tilemap.height;
    const cols = this.tilemap.width;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const noise = this.terrainNoisemap.getNoisemapAt(x, y);

        const type = tresholdHelper.tilesetFromTreshold(noise);

        this.terrainmap.set(`[${x},${y}]`, type);

        this.putTerrainTileAt(type, "base", x, y);
      }
    }
  }

  getTerrainTypeAt(position: { x: number; y: number }): TerrainType {
    const idx = `[${position.x},${position.y}]`;

    return this.terrainmap.get(idx);
  }
}
