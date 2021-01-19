// import texture from '../assets/character/*.png'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player_idle')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    const walkFramerate = 10

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

  private speed = 600
  moveControl(keyboard: Phaser.Types.Input.Keyboard.CursorKeys): void {
    this.setVelocity(0)
    this.anims.stop()

    if (keyboard.left.isDown) {
      this.setVelocityX(-this.speed)
      this.anims.play('walkleft', true)
    } else if (keyboard.right.isDown) {
      this.setVelocityX(this.speed)
      this.anims.play('walkright', true)
    }

    if (keyboard.down.isDown) {
      this.setVelocityY(this.speed)
      this.anims.play('walkdown', true)
    } else if (keyboard.up.isDown) {
      this.setVelocityY(-this.speed)
      this.anims.play('walkup', true)
    }

    // const customKeys = {
    //   up: Phaser.Input.Keyboard.KeyCodes.W,
    //   left: Phaser.Input.Keyboard.KeyCodes.A,
    //   down: Phaser.Input.Keyboard.KeyCodes.S,
    //   right: Phaser.Input.Keyboard.KeyCodes.D,
    // }

    // keyboard.on('keydown', (event) => {
    //   // vertical
    //   if (event.keyCode == customKeys.down) {
    //     this.setVelocityY(this.speed)
    //     this.anims.play('walkdown', true)
    //   } else if (event.keyCode == customKeys.up) {
    //     this.setVelocityY(-this.speed)
    //     this.anims.play('walkup', true)
    //   }

    //   // horizontal
    //   if (event.keyCode == customKeys.right) {
    //     this.setVelocityX(this.speed)
    //     this.anims.play('walkright', true)
    //   } else if (event.keyCode == customKeys.left) {
    //     this.setVelocityX(-this.speed)
    //     this.anims.play('walkleft', true)
    //   }
    // })

    // keyboard.on('keyup', (event) => {
    //   // vertical
    //   if (event.keyCode == customKeys.down) {
    //     this.anims.stop()
    //     this.setTexture('player_idle')
    //   } else if (event.keyCode == customKeys.up) {
    //     this.anims.stop()
    //     this.setTexture('player_turnback')
    //   }

    //   // horizontal
    //   if (event.keyCode == customKeys.right) {
    //     this.anims.stop()
    //     this.setTexture('player_turnright')
    //   } else if (event.keyCode == customKeys.left) {
    //     this.anims.stop()
    //     this.setTexture('player_turnleft')
    //   }
    // })
  }
}
