export default class BlastArea extends Phaser.Physics.Arcade.Sprite {
  private radious: number = 3
  private maxdamage: number = 3

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'blast_area')
  }
}
