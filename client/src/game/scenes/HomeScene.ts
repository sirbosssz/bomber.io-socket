import player_idle from '../assets/character/player/idle.png'
import player_turnback from '../assets/character/player/turn_back.png'
import player_turnleft from '../assets/character/player/turn_left.png'
import player_turnright from '../assets/character/player/turn_right.png'
import player_walkdown1 from '../assets/character/player/down1.png'
import player_walkdown2 from '../assets/character/player/down2.png'
import player_walkup1 from '../assets/character/player/up1.png'
import player_walkup2 from '../assets/character/player/up2.png'
import player_walkleft1 from '../assets/character/player/left1.png'
import player_walkleft2 from '../assets/character/player/left2.png'
import player_walkright1 from '../assets/character/player/right1.png'
import player_walkright2 from '../assets/character/player/right2.png'

import button_test from '../assets/UI/button/test.png'

import Player from '../sprites/Player'
import IPlayerCursor from '../types/IPlayerCursor'

export default class HomeScene extends Phaser.Scene {
  private player: Player
  private playerCursor: IPlayerCursor

  constructor() {
    super({ key: 'HomeScene' })
  }

  public init(): void {}

  public preload(): void {
    // player assets
    this.load.image('player_idle', player_idle)
    this.load.image('player_turnback', player_turnback)
    this.load.image('player_turnleft', player_turnleft)
    this.load.image('player_turnright', player_turnright)
    this.load.image('player_walkdown1', player_walkdown1)
    this.load.image('player_walkdown2', player_walkdown2)
    this.load.image('player_walkup1', player_walkup1)
    this.load.image('player_walkup2', player_walkup2)
    this.load.image('player_walkleft1', player_walkleft1)
    this.load.image('player_walkleft2', player_walkleft2)
    this.load.image('player_walkright1', player_walkright1)
    this.load.image('player_walkright2', player_walkright2)

    this.load.image('button_test', button_test)
  }

  public create(): void {
    // Set World Map
    const world = {
      x: 64 * 2,
      y: 64 * 2,
      width: 64 * 10,
      height: 64 * 10,
    }
    const worldMap = this.add.graphics()
    worldMap
      .fillStyle(0x65cbcf, 0.5)
      .fillRect(world.x, world.y, world.width, world.height)

    this.physics.world.setBounds(world.x, world.y, world.width, world.height)

    // Player
    this.player = new Player(
      this,
      world.x + 32,
      world.y + 32,
      64,
      64
    ).setCollideWorldBounds(true)

    // FullScreen
    // const fullscreenBtn = this.add
    //   .image(0, 0, 'button_test')
    //   .setInteractive()
    //   .setOrigin(0, 0)
    //   .setDisplaySize(64, 64)

    // fullscreenBtn.on('pointerup', () => {
    //   if (this.scale.isFullscreen) {
    //     this.scale.stopFullscreen()
    //   } else {
    //     this.scale.startFullscreen()
    //   }
    // })

    this.playerCursor = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    })
  }

  public update(time: number, delta: number): void {
    this.player.moveControl(this.playerCursor)
  }
}
