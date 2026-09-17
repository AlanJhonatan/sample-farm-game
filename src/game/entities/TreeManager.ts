import * as Phaser from "phaser";
import {
  TREE_LOADER,
  TREE_VARIANTS,
  type TreeData,
  type TreeSpriteLoader,
} from "../configs/trees";
import type { Player } from "./player/Player";

export class TreeManager {
  private trees: [];

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
    const pieces = preset.pieces;
    const { x, y } = treeData.position;

    return pieces.map((piece) => {
      const sprite = this.scene.physics.add
        .image(x * 16, y * 16 + piece.offsetY, piece.textureKey)
        .setDepth(piece.depth);

      if (["down", "small"].some((key) => piece.textureKey.includes(key))) {
        sprite.setImmovable();
        this.scene.physics.add.collider(player, sprite);
      }

      sprite.setData("tree.data", treeData.properties);

      return sprite;
    });
  }

  create(treesMap: TreeData[], player: Player) {
    const trees = treesMap.map((tree) => ({
      pieces: this.spawnTree(tree, player),
      ...tree,
    }));

    console.log(trees);

    // const pieces = trees.map((tree) => tree.pieces);
    // console.log(pieces);

    // console.log();
    // console.log(spawnedTrees);

    // spawnedTrees.map((tree) => )
    // spawnedTrees
    //   .filter(
    //     (tree) =>
    //       tree[0].texture.key.includes("down") ||
    //       tree[0].texture.key.includes("small"),
    //   )
    //   .forEach((tree) => this.scene.physics.add.collider(this.player, tree));
  }

  getTrees(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] {
    return this.trees;
  }
}
