import ICoordinate from "../game/types/ICoordinate"

// get UI SafeArea
export default function getSafeArea(): ICoordinate {
  const safeArea = document.querySelector('#safe-area')
  const area = safeArea.getBoundingClientRect()

  return {
    width: area.width,
    height: area.height,
    x: area.x,
    y: area.y
  }
}
