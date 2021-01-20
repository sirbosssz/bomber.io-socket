// import texture from '../assets/character/*.png'

import IPlayerCursor from '../types/IPlayerCursor'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number = 128,
    height: number = 128
  ) {
    super(scene, x, y, 'player_idle')

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setDisplaySize(width, height).setSize(90, 100)

    // animation
    const walkFramerate = 12
    // walk

    scene.anims.create({
      key: 'walkdown',
      frames: [
        { key: 'player_walkdown1' },
        { key: 'player_idle' },
        { key: 'player_walkdown2' },
      ],
      frameRate: walkFramerate,
      repeat: -1,
    })

    scene.anims.create({
      key: 'walkup',
      frames: [
        { key: 'player_walkup1' },
        { key: 'player_turnback' },
        { key: 'player_walkup2' },
      ],
      frameRate: walkFramerate,
      repeat: -1,
    })

    scene.anims.create({
      key: 'walkleft',
      frames: [
        { key: 'player_walkleft1' },
        { key: 'player_turnleft' },
        { key: 'player_walkleft2' },
      ],
      frameRate: walkFramerate,
      repeat: -1,
    })

    scene.anims.create({
      key: 'walkright',
      frames: [
        { key: 'player_walkright1' },
        { key: 'player_turnright' },
        { key: 'player_walkright2' },
      ],
      frameRate: walkFramerate,
      repeat: -1,
    })
  }

  private speed: number = 300
  private status: string = 'idle'
  moveControl(keyboard: IPlayerCursor): void {
    this.setVelocity(0)

    if (keyboard.left.isDown) {
      this.setVelocityX(-this.speed)
      this.anims.play('walkleft', true)
      this.status = 'turnleft'
    } else if (keyboard.right.isDown) {
      this.setVelocityX(this.speed)
      this.anims.play('walkright', true)
      this.status = 'turnright'
    } else if (keyboard.down.isDown) {
      this.setVelocityY(this.speed)
      this.anims.play('walkdown', true)
      this.status = 'idle'
    } else if (keyboard.up.isDown) {
      this.setVelocityY(-this.speed)
      this.anims.play('walkup', true)
      this.status = 'turnback'
    }

    if (
      !keyboard.left.isDown &&
      !keyboard.right.isDown &&
      !keyboard.down.isDown &&
      !keyboard.up.isDown
    ) {
      this.anims.stop()
      this.setTexture(`player_${this.status}`)
      // switch (this.status) {
      //   case 'down':
      //     this.setTexture('player_idle')
      //     break
      //   case 'up':
      //     this.setTexture('player_turnback')
      //     break
      //   case 'left':
      //     this.setTexture('player_turnleft')
      //     break
      //   case 'right':
      //     this.setTexture('player_turnright')
      //   default:
      //     break
      // }
    }
  }
}
