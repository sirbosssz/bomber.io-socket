// import texture from '../assets/character/*.png'

import IPlayerCursor from '../types/IPlayerCursor'
import IPlayerSkill from '../types/IPlayerSkill'

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

    // this.setDisplaySize((128 / 90) * width, (128 / 100) * height)
    //   .setSize(90, 100)

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

  private speed: number = 500
  private status: string = 'idle'
  private bomb: IPlayerSkill = {
    count: 1,
    cooldown: 1000,
    ready: true,
  }

  skillControl(
    key: Phaser.Input.Keyboard.Key,
    skill: IPlayerSkill,
    action: Function
  ): void {
    if (key.isDown && skill.ready && (skill.count > 0 || skill.count === -1)) {
      skill.ready = false
      action()
      setTimeout(() => (skill.ready = true), skill.cooldown)
    }
  }

  moveControl(keyboard: IPlayerCursor): void {
    this.setVelocity(0)

    // 4 Direction movement
    if (keyboard.left.isDown) {
      // Left
      this.setVelocityX(-this.speed)
      this.anims.play('walkleft', true)
      this.status = 'turnleft'
    } else if (keyboard.right.isDown) {
      // Right
      this.setVelocityX(this.speed)
      this.anims.play('walkright', true)
      this.status = 'turnright'
    } else if (keyboard.down.isDown) {
      // Down
      this.setVelocityY(this.speed)
      this.anims.play('walkdown', true)
      this.status = 'idle'
    } else if (keyboard.up.isDown) {
      // Up
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
    }

    // Skill: Plant a bomb
    this.skillControl(keyboard.space, this.bomb, () => {
      console.log('bomb has been planted')
    })
  }
}
