import { readFile } from 'fs'

interface commandObject {
  direction: string
  amount: number
}

const prepareCommandArray = (data: string): commandObject[] => {
  const splitData: string[] = data.split('\n')
  const result: commandObject[] = []
  splitData.forEach((el) => {
    if (el === '') return
    const tempData = el.split(' ')
    result.push({ direction: tempData[0], amount: Number(tempData[1]) })
  })
  return result
}

const tailPositioningSequence = (commandArray: commandObject[]): number => {
  const headPosition = {
    x: 0,
    y: 0
  }
  const tailPosition = {
    x: 0,
    y: 0
  }
  const previousHeadPosition = {
    x: 0,
    y: 0
  }

  const markedPositionArray = [{ ...tailPosition }]
  commandArray.forEach((el) => {
    for (let idx = 0; idx < el.amount; idx++) {
      previousHeadPosition.x = headPosition.x
      previousHeadPosition.y = headPosition.y
      switch (el.direction) {
        case 'U':
          headPosition.x++
          break

        case 'D':
          headPosition.x--
          break

        case 'R':
          headPosition.y++
          break

        case 'L':
          headPosition.y--
          break
      }
      if (Math.abs(headPosition.x - tailPosition.x) >= 2 ||
        Math.abs(headPosition.y - tailPosition.y) >= 2) {
        tailPosition.x = previousHeadPosition.x
        tailPosition.y = previousHeadPosition.y
      }

      if (markedPositionArray.find(el2 => el2.x === tailPosition.x &&
        el2.y === tailPosition.y) === undefined) markedPositionArray.push({ ...tailPosition })
    }
  })
  return markedPositionArray.length
}

readFile('./day09a/src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err !== null) {
    console.error(err)
  }
  const commandArray = prepareCommandArray(data)
  console.log(tailPositioningSequence(commandArray))
})
