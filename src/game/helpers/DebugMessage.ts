export class DebugMessage {
  private time: number;
  private nextLogTime = 0;

  constructor() {}

  timeUpdate(time: number) {
    this.time = time;
  }

  message(...data: any[]) {
    if (this.time > this.nextLogTime) {
      console.log(data);
      this.nextLogTime = this.time + 1000;
    }
  }
}
