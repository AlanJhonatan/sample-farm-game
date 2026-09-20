import * as Phaser from "phaser";
import {
  TREE_LOADER,
  TREE_VARIANTS,
  type TreeData,
  type TreeSpriteLoader,
} from "../configs/trees";
import type { Player } from "./player/Player";
import { TreeInteractable } from "./TreeInteractable";

export type TreeInstance = TreeData & {
  id: string;
  pieces: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[];
  anchorPiece: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
};

export class TreeManager {
  private trees: TreeInstance[] = [];
  private lastId: number = 0;

  constructor(private scene: Phaser.Scene) {}

  preload() {
    for (const variant of Object.keys(TREE_LOADER)) {
      const sprites: TreeSpriteLoader[] = TREE_LOADER[variant];

      sprites.forEach((sprite) =>
        this.scene.load.image(sprite.textureKey, sprite.url),
      );
    }

    this.scene.load.on("loaderror", (file: Phaser.Loader.File) => {
      console.error("Falhou:", file.key, file.src);
    });
  }

  spawnTree(treeData: TreeData, player: Player) {
    const preset = TREE_VARIANTS[treeData.variant];
    const { x, y } = treeData.position;

    let anchorPiece: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

    const pieces = preset.pieces.map((piece) => {
      const sprite = this.scene.physics.add
        .image(x * 16, y * 16 + piece.offsetY, piece.textureKey)
        .setDepth(piece.depth)
        .setOrigin(0, 0);

      sprite.setData("tree.data", treeData.properties);

      if (["down", "small"].some((key) => piece.textureKey.includes(key))) {
        sprite.setImmovable();
        this.scene.physics.add.collider(player, sprite);
        anchorPiece = sprite;
      }

      return sprite;
    });

    return {
      pieces,
      anchorPiece,
    };
  }

  getTrees(): TreeInstance[] {
    return this.trees;
  }

  removeTree(id: string): void {
    const tree = this.trees.find((tree) => tree.id === id);

    tree.pieces.forEach((sprite) => sprite.destroy());

    this.trees = this.trees.filter((tree) => tree.id !== id);
  }

  generateTreeId(): string {
    const prefix = "tree";

    if (this.lastId === 0) {
      this.lastId = 1;
      return `${prefix}-001`;
    }

    const nextId = this.lastId + 1;
    this.lastId = nextId;

    return `${prefix}-${String(nextId).padStart(3, "0")}`;
  }

  getInteractables(): TreeInteractable[] {
    return this.trees.map((tree) => new TreeInteractable(this.scene, tree));
  }

  create(treesMap: TreeData[], player: Player) {
    this.trees = treesMap.map((tree) => ({
      ...tree,
      ...this.spawnTree(tree, player),
      id: this.generateTreeId(),
    }));
  }
}
