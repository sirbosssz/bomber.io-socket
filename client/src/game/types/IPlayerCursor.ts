import { Types } from 'phaser'

export default interface IPlayerCursor {
  up?: Phaser.Input.Keyboard.Key
  down?: Phaser.Input.Keyboard.Key
  left?: Phaser.Input.Keyboard.Key
  right?: Phaser.Input.Keyboard.Key
}
