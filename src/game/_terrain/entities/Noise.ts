interface NoisePosition {
  x: number;
  y: number;
}

export class Noise {
  private position: NoisePosition;
  private noise: number;

  constructor(position: NoisePosition, noise: number) {
    this.position = position;
    this.noise = noise;
  }

  toMapId() {
    return `[${this.position.x},${this.position.y}]`;
  }

  getPosition(): NoisePosition {
    return this.position;
  }

  getNoiseValue(): number {
    return this.noise;
  }
}
