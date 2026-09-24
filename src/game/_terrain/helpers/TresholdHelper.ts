import type { Noise } from "../entities/Noise";
import {
  TERRAIN_TRESHOLD,
  type TerrainType,
} from "../manifests/TerrainTreshold";

function tilesetFromTreshold(noise: Noise): TerrainType {
  const match = TERRAIN_TRESHOLD.find(
    (treshold) => noise.getNoiseValue() <= treshold.max,
  );

  return match?.terrainType || TERRAIN_TRESHOLD.at(-1).terrainType;
}

export const tresholdHelper = {
  tilesetFromTreshold,
};
