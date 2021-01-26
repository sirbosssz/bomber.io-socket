// image assets
// player
import player_turndown from '../assets/character/player/idle.png'
import player_turnup from '../assets/character/player/turn_back.png'
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
import bomb_area from '../assets/character/skill/bomb_area.png'
import bomb from '../assets/character/skill/bomb.png'

// map
import ground1 from '../assets/ground/ground1.png'
import ground2 from '../assets/ground/ground2.png'
import ground3 from '../assets/ground/ground3.png'

// ui
import button_test from '../assets/UI/button/test.png'

// classes
import Player from '../sprites/Player'

// scripts
import getSafeArea from '../../data/safeArea'
import getClientArea from '../../data/clientArea'
import ICoordinate from '../types/ICoordinate'

export default class HomeScene extends Phaser.Scene {
  private player: Player
  private playerCursor
  private world: ICoordinate

  constructor() {
    super({ key: 'HomeScene' })
  }

  public init(): void {}

  public preload(): void {
    // player assets
    this.load.image('player_turndown', player_turndown)
    this.load.image('player_turnup', player_turnup)
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

    this.load.image('bomb_area', bomb_area)
    this.load.image('bomb', bomb)

    // map
    this.load.image('ground1', ground1)
    this.load.image('ground2', ground2)
    this.load.image('ground3', ground3)

    this.load.image('button_test', button_test)
  }

  public create(): void {
    // Set World Map
    const map = [
      [2, 2, 3, 3, 3, 3, 3, 3, 3, 3],
      [1, 2, 1, 1, 1, 1, 1, 1, 3, 3],
      [3, 2, 3, 1, 1, 1, 1, 3, 3, 3],
      [3, 2, 1, 1, 1, 1, 3, 2, 2, 2],
      [1, 2, 2, 1, 1, 3, 3, 2, 1, 1],
      [1, 1, 2, 2, 1, 3, 3, 2, 1, 1],
      [1, 1, 3, 2, 2, 3, 2, 1, 1, 1],
      [1, 1, 3, 1, 2, 2, 1, 1, 1, 1],
      [1, 1, 3, 1, 1, 2, 2, 3, 3, 3],
      [1, 1, 1, 1, 1, 3, 2, 2, 3, 3],
    ]
    const tiled = {
      x: 0,
      y: 0,
      width: map[0].length,
      height: map.length,
    }
    this.world = {
      x: 64 * tiled.x,
      y: 64 * tiled.y,
      width: 64 * tiled.width,
      height: 64 * tiled.height,
    }

    map.forEach((mapRow, row) => {
      mapRow.forEach((mapCol, col) => {
        this.add
          .image((tiled.x + col) * 64, (tiled.y + row) * 64, `ground${mapCol}`)
          .setOrigin(0)
          .setDisplaySize(64, 64)
      })
    })

    // const worldmap = this.add.tileSprite(
    //   world.x,
    //   world.y,
    //   world.width,
    //   world.height,
    //   'ground1'
    // )
    // worldmap.setOrigin(0)

    // Array.apply(null, Array(tiled.width)).map(Number.call, Number).forEach((widthIndex: number) => {
    //   if (widthIndex % 2 == 0) {
    //     this.add.image((tiled.x + widthIndex) * 64 , tiled.y * 64, 'ground2').setOrigin(0).setDisplaySize(64, 64)
    //   } else {
    //     this.add.image((tiled.x + widthIndex) * 64 , tiled.y * 64, 'ground3').setOrigin(0).setDisplaySize(64, 64)
    //   }
    // })

    this.physics.world.setBounds(
      this.world.x,
      this.world.y,
      this.world.width,
      this.world.height
    )

    // Camera
    // this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
    const cameraArea = this.updateCameraArea()
    this.cameras.main.setBounds(
      cameraArea.x,
      cameraArea.y,
      this.world.width + 64,
      this.world.height + 64
    )
    window.addEventListener('resize', () => {
      const cameraArea = this.updateCameraArea()

      this.cameras.main.setBounds(
        cameraArea.x,
        cameraArea.y,
        this.world.width + 64,
        this.world.height + 64
      )
    })

    // Player
    const playerBlockPos = {
      x: 0,
      y: 0,
    }
    this.player = new Player(
      this,
      this.world.x + 32 + 64 * playerBlockPos.x,
      this.world.y + 32 + 64 * playerBlockPos.y,
      64,
      64,
      'Bob'
    ).setCollideWorldBounds(true)

    this.cameras.main.startFollow(this.player)

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
      // direction control
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,

      alt_up: Phaser.Input.Keyboard.KeyCodes.UP,
      alt_down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      alt_left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      alt_right: Phaser.Input.Keyboard.KeyCodes.RIGHT,

      // action control
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    })
  }

  public update(time: number, delta: number): void {
    this.player.playerController(this.playerCursor, delta)
  }

  private updateCameraArea(): Phaser.Math.Vector2 {
    const safeArea = getSafeArea()
    const clientArea = getClientArea()

    return new Phaser.Math.Vector2(
      (this.world.width - clientArea.width) / 2 < safeArea.x
        ? (this.world.width - clientArea.width) / 2
        : safeArea.x - 32,
      (this.world.height - clientArea.height) / 2 < safeArea.y
        ? (this.world.height - clientArea.height) / 2
        : safeArea.y - 32
    )
  }
}
