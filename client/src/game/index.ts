import 'phaser'
import HomeScene from './scenes/HomeScene'

const [DEFAULT_WIDTH, DEFAULT_HEIGHT, MAX_WIDTH, MAX_HEIGHT] = [
  1024,
  576,
  1536,
  864,
]

const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#fafafa',
  scale: {
    parent: 'app',
    mode: Phaser.Scale.RESIZE,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
