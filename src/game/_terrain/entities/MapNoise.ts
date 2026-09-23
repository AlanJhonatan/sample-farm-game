interface NoisePosition {
  x: number;
  y: number;
}

export class MapNoise {
  private position: NoisePosition;
  private noise: number;

  constructor(position: NoisePosition, noise: number) {
    this.position = position;

    this.noise = noise;
  }

  getPosition(): NoisePosition {
    return this.position;
  }

  getNoiseValue(): number {
    return this.noise;
  }
}
