// import texture from '../assets/character/*.png'

import IPlayerCursor from '../types/IPlayerCursor'
import IPlayerSkill from '../types/IPlayerSkill'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number = 128,
    height: number = 128,
    playerText: string = 'player'
  ) {
    super(scene, x, y, 'player_turndown')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    // add player text

    this.playerText = scene.add
      .text(x, y - height / 2, playerText, {
        color: 'black',
        fontSize: '16pt',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

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
        { key: 'player_turndown' },
        { key: 'player_walkdown2' },
      ],
      frameRate: walkFramerate,
      repeat: -1,
    })

    scene.anims.create({
      key: 'walkup',
      frames: [
        { key: 'player_walkup1' },
        { key: 'player_turnup' },
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
  private status: string = 'turndown'
  private bomb: IPlayerSkill = {
    cooldown: 1000,
    ready: true,
  }
  private playerText: Phaser.GameObjects.Text

  skillControl(
    key: Phaser.Input.Keyboard.Key,
    skill: IPlayerSkill,
    skillAction: Function,
    cooldownAction?: Function
  ): void {
    if (
      key.isDown &&
      skill.ready &&
      (skill.count == undefined || skill.count > 0)
    ) {
      if (skill.count > 0) skill.count--
      skill.ready = false
      skillAction()
      setTimeout(() => {
        skill.ready = true
        cooldownAction()
      }, skill.cooldown)
    }
  }

  moveControl(
    direction: string,
    key: Phaser.Input.Keyboard.Key,
    alt_key?: Phaser.Input.Keyboard.Key
  ): void {
    if (key.isDown || (alt_key !== undefined && alt_key.isDown)) {
      switch (direction) {
        case 'left':
          this.setVelocityX(-this.speed)
          break
        case 'right':
          this.setVelocityX(this.speed)
          break
        case 'up':
          this.setVelocityY(-this.speed)
          break
        case 'down':
          this.setVelocityY(this.speed)
          break
      }
      this.anims.play(`walk${direction}`, true)
      this.status = `turn${direction}`
    }
  }

  playerController(keyboard: IPlayerCursor): void {
    this.setVelocity(0)

    // set playertext
    this.playerText
      .setPosition(
        this.body.position.x + this.body.width / 2,
        this.body.position.y - this.playerText.height/ 2
      )
      .setOrigin(0.5)

    // 4 Direction movement
    this.moveControl('up', keyboard.up, keyboard.alt_up)
    this.moveControl('down', keyboard.down, keyboard.alt_down)
    this.moveControl('left', keyboard.left, keyboard.alt_left)
    this.moveControl('right', keyboard.right, keyboard.alt_right)

    let moving =
      !keyboard.left.isDown &&
      !keyboard.right.isDown &&
      !keyboard.down.isDown &&
      !keyboard.up.isDown
    const altkeys =
      keyboard.alt_up !== undefined &&
      keyboard.alt_down !== undefined &&
      keyboard.alt_left !== undefined &&
      keyboard.alt_right !== undefined

    if (altkeys) {
      moving =
        moving &&
        !keyboard.alt_left.isDown &&
        !keyboard.alt_right.isDown &&
        !keyboard.alt_down.isDown &&
        !keyboard.alt_up.isDown
    }
    if (moving) {
      this.anims.stop()
      this.setTexture(`player_${this.status}`)
    }

    // Skill: Plant a bomb
    this.skillControl(
      keyboard.space,
      this.bomb,
      () => {
        console.log('bomb has been planted,', 'left:', this.bomb.count)
      },
      () => {
        console.log('can plant again!')
      }
    )
  }
}
