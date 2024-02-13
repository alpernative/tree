export default class DelayedFunction {
  delay: number;

  timeoutId: number | undefined;

  fn?: Function; // eslint-disable-line

  constructor(delay: number) {
    this.delay = delay;
  }

  // eslint-disable-next-line
  start(fn: Function) {
    this.stop();
    this.timeoutId = window.setTimeout(fn, this.delay);
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
