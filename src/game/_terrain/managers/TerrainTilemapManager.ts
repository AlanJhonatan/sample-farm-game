import * as Phaser from "phaser";
import type { TerrainTilesetLoader } from "../loaders/TerrainTilesetLoader";
import type { GrassTileVariant } from "../manifests/Tilesets";
import { TerrainTilesetManager } from "./TerrainTilesetManager";

interface TilemapManagerProps {
  scene: Phaser.Scene;
}

export type TilemapLayers = "ground" | "tree";

export class TerrainTilemapManager {
  private scene: Phaser.Scene;

  private tilemap: Phaser.Tilemaps.Tilemap;
  private tilesetManager: TerrainTilesetManager;
  private tilesetLoader: TerrainTilesetLoader;

  constructor({ scene }: TilemapManagerProps) {
    this.scene = scene;
  }

  preload() {}

  register(
    tilesetManager: TerrainTilesetManager,
    tilesetLoader: TerrainTilesetLoader,
  ) {
    this.tilesetManager = tilesetManager;
    this.tilesetLoader = tilesetLoader;
  }

  create() {
    this.tilemap = this.scene.make.tilemap({
      tileWidth: 16,
      tileHeight: 16,
      width: 16,
      height: 16,
    });

    const tilesetKeys = this.tilesetLoader.getTilesetKeys();

    tilesetKeys.forEach((key) => {
      const { size } = this.tilesetLoader.getTilesetInfo(key);

      return this.tilemap.addTilesetImage(
        key,
        key,
        size,
        size,
        0,
        0,
        this.getTilesetGID(),
      );
    });

    this.tilemap.createBlankLayer("ground", tilesetKeys).putTileAt(0, 0, 0);
    this.putCustomTileAt("grass", 1, 1, "ground");
  }

  update() {}

  putCustomTileAt(
    tileVariant: GrassTileVariant,
    x: number,
    y: number,
    layerName: TilemapLayers,
  ) {
    const tile = this.tilesetManager.getGrassTile("grass", tileVariant);

    const localgid = this.tilesetManager.tileToLocalGID(tile);

    const tilesetIdx = this.tilemap.getTilesetIndex(tile.key);
    const tileset = this.tilemap.tilesets[tilesetIdx];

    const firstgid = tileset.firstgid;
    const gid = firstgid + localgid;

    this.tilemap.putTileAt(gid, x, y, false, layerName);
  }

  getTilemap() {
    return this.tilemap;
  }

  getTilesetGID() {
    if (!this.tilemap.tilesets.length) return 0;

    return this.tilemap.tilesets.at(-1).total;
  }
}
