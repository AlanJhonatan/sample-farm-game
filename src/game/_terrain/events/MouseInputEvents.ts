import * as Phaser from "phaser";

export type MouseInputPayloads = {
  "tile-clicked": (tilePosition: { x: number; y: number }) => void;
  "tile-hovered": (tilePosition: { x: number; y: number }) => void;
};

export type MouseInputEvents = keyof MouseInputPayloads;

export class MouseEventEmitter extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }

  override emit<K extends MouseInputEvents>(
    event: K,
    ...args: Parameters<MouseInputPayloads[K]>
  ): boolean {
    return super.emit(event, ...args);
  }

  override on<K extends MouseInputEvents>(
    event: K,
    fn: MouseInputPayloads[K],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context?: any,
  ): this {
    return super.on(event, fn, context);
  }

  override once<K extends MouseInputEvents>(
    event: K,
    fn: MouseInputPayloads[K],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context?: any,
  ): this {
    return super.once(event, fn, context);
  }

  override off<K extends MouseInputEvents>(
    event: K,
    fn: MouseInputPayloads[K],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useContext?: any,
    once?: boolean,
  ): this {
    return super.off(event, fn, useContext, once);
  }
}
