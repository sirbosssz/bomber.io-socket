export default class Bomb extends Phaser.Physics.Arcade.Sprite {
  private radious: number = 3
  private timer: number = 3000
  private moveSpeed: number = 5000
  private destroyed: boolean = false

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bomb')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setDisplaySize(16, 28).setCollideWorldBounds(true)

    setTimeout(() => {
      this.destroyed = true
      this.destroy()
    }, this.timer)
  }

  public isDestroyed(): boolean {
    return this.destroyed
  }

  public moveto(destination: Phaser.Math.Vector2, delta: number): void {
    if (this) this.scene.physics.moveToObject(this, destination, this.moveSpeed / delta, 100)

    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      destination.x,
      destination.y
    )

    if (distance < 4) {
      this.body.reset(destination.x, destination.y)
    }
  }
}
