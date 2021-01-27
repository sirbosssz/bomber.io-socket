export default class Explosion extends Phaser.GameObjects.Sprite {
  private radius: number = 3
  private maxdamage: number = 3
  private area

  private frameRate: number = 8

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'explosion1')

    scene.add.existing(this)
    // scene.physics.add.existing(this)

    this.setDisplaySize(
      (this.radius + 1) * 64,
      (this.radius + 1) * 64
    ).setDepth(11)

    // explode area
    this.area = scene.physics.add
      .image(x, y, 'bomb_area')
      .setDisplaySize((this.radius + 1) * 64, (this.radius + 1) * 64)
      .setCircle(64)
      .setAlpha(0)

    const players: Phaser.GameObjects.GameObject[] = scene.data.get('players')
    let canTouch: boolean[] = new Array(players.length).fill(true)

    scene.physics.add.overlap(players, this.area, (_player, _explosion) => {
      if (canTouch[players.indexOf(_player)]) {
        const distance = Phaser.Math.Distance.Between(
          _player.body.x + _player.body.width / 2,
          _player.body.y + _player.body.height / 2,
          _explosion.body.x + _explosion.body.width / 2,
          _explosion.body.y + _explosion.body.height / 2
        )
        let damage = this.maxdamage + 1
        for (let i = 0; i < this.radius; i++) {
          if (distance > (((this.radius - 1) * 64) / this.radius) * i) {
            damage -= 1
          } else {
            break
          }
        }

        _player.emit('takedamage', damage)
        canTouch[players.indexOf(_player)] = false
      }
    })

    // animation

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
