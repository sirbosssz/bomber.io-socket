import ICoordinate from "../game/types/ICoordinate";

export default function getClientArea(): ICoordinate {
  return {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  }
  
}