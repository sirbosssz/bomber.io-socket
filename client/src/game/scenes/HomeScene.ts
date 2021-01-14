export default class HomeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HomeScene' })
  }

  public init(): void {}

  public preload(): void {
    this.load.baseURL = 'game/assets/'
  }

  public create(): void {}

  public update(time: number, delta: number): void {}
}
