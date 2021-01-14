import 'phaser'

const [DEFAULT_WIDTH, DEFAULT_HEIGHT, MAX_WIDTH, MAX_HEIGHT] = [
  1024,
  576,
  1536,
  864,
]

const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#ffffff',
  scale: {
    parent: 'app',
    mode: Phaser.Scale.RESIZE,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
}

window.addEventListener('load', () => {
  const game: Phaser.Game = new Phaser.Game(config)
})
