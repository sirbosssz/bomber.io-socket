export const randInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

export const randArr = (max: number) => {
  let list = [...Array(max).keys()].map((x) => x)
  let values = []
  for (let i = 0; i < max; i++) {
    const randNum = randInt(list.length)
    values.push(list[randNum])
    list.splice(randNum, 1)
  }
  return values
}
