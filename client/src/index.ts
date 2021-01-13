import 'phaser'

type scaleMode = 'FIT' | 'SMOOTH'
type scaleSize = {
  WIDTH: number
  HEIGHT: number
  MAX_WIDTH: number
  MAX_HEIGHT: number
}

const scaleSize: scaleSize = {
  WIDTH: 1024,
  HEIGHT: 576,
  MAX_WIDTH: 1536,
  MAX_HEIGHT: 864,
}
let SCALE_MODE: scaleMode = 'SMOOTH'

const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#ffffff',
  scale: {
    parent: 'app',
    mode: Phaser.Scale.NONE,
    width: scaleSize.WIDTH,
    height: scaleSize.HEIGHT,
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})