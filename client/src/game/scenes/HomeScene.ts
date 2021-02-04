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
import explosion1 from '../assets/character/skill/explosion1.png'
import explosion2 from '../assets/character/skill/explosion2.png'
import explosion3 from '../assets/character/skill/explosion3.png'
import explosion4 from '../assets/character/skill/explosion4.png'

// map items
import ground1 from '../assets/ground/ground1.png'
import ground2 from '../assets/ground/ground2.png'
import ground3 from '../assets/ground/ground3.png'
import wall1 from '../assets/walls/wall1.png'
import wall2 from '../assets/walls/wall2.png'
import wall3 from '../assets/walls/wall3.png'
import wall4 from '../assets/walls/wall4.png'
// ui

// saved maps
import savedMap1 from '../maps/01.json'

// classes
import Player from '../sprites/Player'

// scripts
import getSafeArea from '../../data/safeArea'
import getClientArea from '../../data/clientArea'
import ICoordinate from '../types/ICoordinate'

import * as Phaser from 'phaser'

export default class HomeScene extends Phaser.Scene {
  private player: Player
  private otherPlayers: Player[] = []
  private playerCursor

  private world: ICoordinate
  private walls: Phaser.Physics.Arcade.StaticGroup

  private gameOver: boolean = false

  constructor() {
    super({ key: 'HomeScene' })
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

  private getCurrentPlayer(): Player[] {
    let currentPlayer = [this.player]
    currentPlayer = currentPlayer.concat(this.otherPlayers)
    return currentPlayer
  }

  private createMapFloor(): void {
    // Set World Map
    const map = savedMap1.floor
    const tiled = {
      x: 0,
      y: 0,
      width: savedMap1.size[0],
      height: savedMap1.size[1],
    }
    this.world = {
      x: 64 * tiled.x,
      y: 64 * tiled.y,
      width: 64 * tiled.width,
      height: 64 * tiled.height,
    }

    map.forEach((mapRow: number[], row: number) => {
      mapRow.forEach((mapCol: number, col: number) => {
        this.add
          .image((tiled.x + col) * 64, (tiled.y + row) * 64, `ground${mapCol}`)
          .setOrigin(0)
          .setDisplaySize(64, 64)
      })
    })

    this.physics.world.setBounds(
      this.world.x,
      this.world.y,
      this.world.width,
      this.world.height
    )
  }

  private createMapWalls(): void {
    const walls = savedMap1.wall
    this.walls = this.physics.add.staticGroup()
    walls.forEach((wall: number[]) => {
      this.createMapWall(wall)
    })
  }

  private createMapWall(wallObject): void {
    for (let col = 0; col <= wallObject[2] - 1; col++) {
      for (let row = 0; row <= wallObject[3] - 1; row++) {
        this.walls
          .get(
            (wallObject[0] + col) * 64 + 32,
            (wallObject[1] + row) * 40 + 32,
            `wall${wallObject[4]}`
          )
          .setSize(64, 40)
          .setOffset(32)
          .setDisplaySize(64, 64)
      }
    }
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
    this.load.image('explosion1', explosion1)
    this.load.image('explosion2', explosion2)
    this.load.image('explosion3', explosion3)
    this.load.image('explosion4', explosion4)

    // map
    this.load.image('ground1', ground1)
    this.load.image('ground2', ground2)
    this.load.image('ground3', ground3)
    this.load.image('wall1', wall1)
    this.load.image('wall2', wall2)
    this.load.image('wall3', wall3)
    this.load.image('wall4', wall4)
  }

  public create(): void {
    // world map
    this.createMapFloor()
    
    // walls
    this.createMapWalls()

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
    const playerBlockPos = savedMap1.spawn[0]
    this.player = new Player(
      this,
      this.world.x + 32 + 64 * playerBlockPos[0],
      this.world.y + 32 + 64 * playerBlockPos[1],
      64,
      64,
      'Bob',
      true
    )
      .setCollideWorldBounds(true)
      .setDepth(10)

    this.cameras.main.startFollow(this.player)
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

    this.otherPlayers[0] = new Player(
      this,
      this.world.x + 32 + 64 * 5,
      this.world.y + 32 + 64 * 2,
      64,
      64,
      'Alice'
    ).setDepth(1)

    this.data.set('players', this.getCurrentPlayer())
    this.physics.add.collider(this.player, this.walls)
  }

  public update(time: number, delta: number): void {
    this.player.playerUpdate(delta, this.playerCursor)
    this.otherPlayers.forEach((player) => {
      player.playerUpdate(delta)
    })
    let controlPlayerHealth = this.player.getData('health')
    if (controlPlayerHealth <= 0 && !this.gameOver) {
      console.log('you are dead');
      this.gameOver = true
    }
  }
}
