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
  }

  public create(): void {
    this.player = new Player(this, 32, 32, 64, 64).setCollideWorldBounds(true)

    const startPoint = this.add.graphics()
    startPoint.lineStyle(1, 0x00ff00)
    startPoint.strokeRect(0, 0, 64, 64)

    this.playerCursor = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })

    console.log(this.player.getBounds())
  }

  public update(time: number, delta: number): void {
    this.player.moveControl(this.playerCursor)
  }
}
