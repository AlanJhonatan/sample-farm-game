const TREE_ASSET_URL = "assets/sprites/trees";

type TreeVariantKey =
  | "tree.forest.oak.large"
  | "tree.forest.oak.small"
  | "tree.forest.neutral.large"
  | "tree.forest.deadbush.large";

interface TreePiecesConfig {
  textureKey: string;
  offsetY: number;
  depth: number;
}

export interface TreeProperties {
  interactable: boolean;
  choppable: boolean;
  collision: boolean;
}

interface TreeVariantConfig {
  biome: string;
  pieces: TreePiecesConfig[];
  defaultProperties: TreeProperties;
}

export interface TreeData {
  position: {
    x: number;
    y: number;
  };
  variant: TreeVariantKey;
  properties: TreeProperties;
}

export interface TreeSpriteLoader {
  textureKey: string;
  url: string;
}

export const TREE_LOADER: Record<TreeVariantKey, TreeSpriteLoader[]> = {
  "tree.forest.oak.large": [
    {
      textureKey: "tree-large-oak-top",
      url: `${TREE_ASSET_URL}/tree-large-oak-top.png`,
    },
    {
      textureKey: "tree-large-oak-down",
      url: `${TREE_ASSET_URL}/tree-large-oak-down.png`,
    },
  ],
  "tree.forest.deadbush.large": [
    {
      textureKey: "tree-large-deadbush-top",
      url: `${TREE_ASSET_URL}/tree-large-deadbush-top.png`,
    },
    {
      textureKey: "tree-large-deadbush-down",
      url: `${TREE_ASSET_URL}/tree-large-deadbush-down.png`,
    },
  ],
  "tree.forest.neutral.large": [
    {
      textureKey: "tree-large-neutral-top",
      url: `${TREE_ASSET_URL}/tree-large-neutral-top.png`,
    },
    {
      textureKey: "tree-large-neutral-down",
      url: `${TREE_ASSET_URL}/tree-large-neutral-down.png`,
    },
  ],
  "tree.forest.oak.small": [
    {
      textureKey: "tree-small-oak",
      url: `${TREE_ASSET_URL}/tree-small-oak.png`,
    },
  ],
};

export const TREE_VARIANTS: Record<TreeVariantKey, TreeVariantConfig> = {
  "tree.forest.oak.large": {
    biome: "default",
    pieces: [
      {
        textureKey: "tree-large-oak-down",
        offsetY: 0,
        depth: 9,
      },
      {
        textureKey: "tree-large-oak-top",
        offsetY: -16,
        depth: 11,
      },
    ],
    defaultProperties: {
      choppable: true,
      collision: true,
      interactable: true,
    },
  },
  "tree.forest.deadbush.large": {
    biome: "default",
    pieces: [
      {
        textureKey: "tree-large-deadbush-down",
        offsetY: 0,
        depth: 9,
      },
      {
        textureKey: "tree-large-deadbush-top",
        offsetY: -16,
        depth: 11,
      },
    ],
    defaultProperties: {
      choppable: true,
      collision: true,
      interactable: true,
    },
  },
  "tree.forest.neutral.large": {
    biome: "default",
    pieces: [
      {
        textureKey: "tree-large-neutral-down",
        offsetY: 0,
        depth: 9,
      },
      {
        textureKey: "tree-large-neutral-top",
        offsetY: -16,
        depth: 11,
      },
    ],
    defaultProperties: {
      choppable: true,
      collision: true,
      interactable: true,
    },
  },
  "tree.forest.oak.small": {
    biome: "default",
    pieces: [
      {
        textureKey: "tree-small-oak",
        offsetY: 0,
        depth: 9,
      },
    ],
    defaultProperties: {
      choppable: false,
      collision: true,
      interactable: true,
    },
  },
};

export const INITIAL_TREES: TreeData[] = [
  {
    position: {
      x: 3,
      y: 4,
    },
    variant: "tree.forest.neutral.large",
    properties: {
      ...TREE_VARIANTS["tree.forest.neutral.large"].defaultProperties,
    },
  },
  {
    position: {
      x: 6,
      y: 4,
    },
    variant: "tree.forest.deadbush.large",
    properties: {
      ...TREE_VARIANTS["tree.forest.deadbush.large"].defaultProperties,
    },
  },
  {
    position: {
      x: 9,
      y: 4,
    },
    variant: "tree.forest.oak.large",
    properties: {
      ...TREE_VARIANTS["tree.forest.oak.large"].defaultProperties,
    },
  },

  {
    position: {
      x: 3,
      y: 6,
    },
    variant: "tree.forest.oak.small",
    properties: {
      ...TREE_VARIANTS["tree.forest.oak.small"].defaultProperties,
    },
  },
];
