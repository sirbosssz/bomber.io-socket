import { Types } from 'phaser'

export default interface IPlayerCursor {
  // movement keys
  up: Phaser.Input.Keyboard.Key
  down: Phaser.Input.Keyboard.Key
  left: Phaser.Input.Keyboard.Key
  right: Phaser.Input.Keyboard.Key

  alt_up?: Phaser.Input.Keyboard.Key
  alt_down?: Phaser.Input.Keyboard.Key
  alt_left?: Phaser.Input.Keyboard.Key
  alt_right?: Phaser.Input.Keyboard.Key

  // action keys
  space?: Phaser.Input.Keyboard.Key
}
