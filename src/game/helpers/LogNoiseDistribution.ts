import type { Noisemap } from "../_terrain/generators/TerrainNoisemapGenerator";

export function logNoiseDistribution(noiseMap: Noisemap, noiseName?: string) {
  console.log("[Histogram] from", noiseName);

  const buckets = new Array(10).fill(0); // 10 faixas de 0.1 em 0.1

  const noises = Array.from(noiseMap.values());

  noises.forEach((noise) => {
    const bucketIndex = Math.min(Math.floor(noise.getNoiseValue() * 10), 9);
    buckets[bucketIndex]++;
  });

  buckets.forEach((count, i) => {
    const percentage = ((count / noises.length) * 100).toFixed(1);
    console.log(
      `${(i / 10).toFixed(1)}-${((i + 1) / 10).toFixed(1)}: ${"█".repeat(Math.floor(count / 20))} ${percentage}%`,
    );
  });
}
