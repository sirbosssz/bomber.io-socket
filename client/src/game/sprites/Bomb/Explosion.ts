export default class Explosion extends Phaser.Physics.Arcade.Sprite {
  private radius: number = 3
  private maxdamage: number = 3
  private area: Phaser.GameObjects.Arc

  private frameRate: number = 10

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'explosion1')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setDisplaySize(this.radius * 64, this.radius * 64).setDepth(11)

    this.area = scene.add.circle(x, y, (this.radius-1) * 64, 0xff0000, 0.5).setDepth(60)

    scene.anims.create({
      key: 'start_explosion',
      frames: [
        { key: 'explosion1' },
        { key: 'explosion2' },
        { key: 'explosion3' },
        { key: 'explosion4' },
      ],
      frameRate: this.frameRate,
      repeat: 1,
    })
  }

  public explode(): void {
    this.anims.play('start_explosion')
    setTimeout(() => {
      this.area.destroy()
      this.destroy()
    }, (1000 / this.frameRate) * 4)
  }
}
