import * as Phaser from "phaser";
import {
  TILESETS_CONFIG,
  type TilesetAsset,
  type TilesetKeys,
} from "../manifests/Tilesets";

interface TerrainTilesetLoaderProps {
  scene: Phaser.Scene;
}

export class TerrainTilesetLoader {
  private scene: Phaser.Scene;

  constructor({ scene }: TerrainTilesetLoaderProps) {
    this.scene = scene;
  }

  preload() {
    const configs = Object.entries(TILESETS_CONFIG);

    for (const [key, config] of configs) {
      this.scene.load.image(key, config.url);
    }
  }

  getTilesetKeys(): TilesetKeys[] {
    return Object.keys(TILESETS_CONFIG) as TilesetKeys[];
  }

  getTilesets(key: TilesetKeys): TilesetAsset {
    return TILESETS_CONFIG[key];
  }

  getTilesetInfo(key: TilesetKeys) {
    return TILESETS_CONFIG[key];
  }
}
