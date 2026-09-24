export type TerrainType = "water" | "sand" | "grass" | "stone";
type Treshold = 0.24 | 0.3 | 0.8 | 1.0;

interface TerrainTreshold {
  max: Treshold;
  terrainType: TerrainType;
}

// 0.00 - 0.20 - water
// 0.20 - 0.25 - sand
// 0.25 - 0.80 - grass
// 0.80 - 1.00 - stone

export const TERRAIN_TRESHOLD: TerrainTreshold[] = [
  {
    max: 0.24,
    terrainType: "water",
  },
  {
    max: 0.3,
    terrainType: "sand",
  },
  {
    max: 0.8,
    terrainType: "grass",
  },
  {
    max: 1,
    terrainType: "stone",
  },
];
