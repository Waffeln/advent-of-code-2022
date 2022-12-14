import { readFile } from 'fs'

interface viewStateType {
  viewDistance: 0
  isBlocked: boolean
}

interface directionType {
  [direction: string]: viewStateType
}

const createTreeMap = (data: string): number[][] => {
  const splitData: string[] = data.split('\n')
  const treeMap: number[][] = []
  splitData.forEach((el, idx) => {
    if (el === '') return
    treeMap.push(Array(splitData.length - 1))
    const mapColumn = el.split('')
    mapColumn.forEach((el2, idx2) => {
      treeMap[idx][idx2] = Number(el2)
    })
  })
  return treeMap
}

const findHighestScenicScore = (treeMap: number[][]): number => {
  let highestScenicScore: number = 0
  treeMap.forEach((elY, idxY) => {
    elY.forEach((elX, idxX) => {
      const currentSceneScore = checkScene(treeMap, idxX, idxY)
      if (currentSceneScore > highestScenicScore) highestScenicScore = currentSceneScore
    })
  })
  return highestScenicScore
}

const checkScene = (treeMap: number[][], yIndex: number, xIndex: number): number => {
  const directions: directionType = {
    left: {
      viewDistance: 0,
      isBlocked: false
    },
    right: {
      viewDistance: 0,
      isBlocked: false
    },
    up: {
      viewDistance: 0,
      isBlocked: false
    },
    down: {
      viewDistance: 0,
      isBlocked: false
    }
  }

  for (let x = 1; x < treeMap[0].length; x++) {
    Object.keys(directions).forEach((el) => {
      switch (el) {
        case 'left':
          if (xIndex - x >= 0 && !directions[el].isBlocked) {
            if (treeMap[xIndex - x][yIndex] >= treeMap[xIndex][yIndex]) {
              directions[el].isBlocked = true
            }
            directions[el].viewDistance++
          }
          break

        case 'right':
          if (xIndex + x < treeMap.length && !directions[el].isBlocked) {
            if (treeMap[xIndex + x][yIndex] >= treeMap[xIndex][yIndex]) {
              directions[el].isBlocked = true
            }
            directions[el].viewDistance++
          }
          break

        case 'up':
          if (yIndex - x >= 0 && !directions[el].isBlocked) {
            if (treeMap[xIndex][yIndex - x] >= treeMap[xIndex][yIndex]) {
              directions[el].isBlocked = true
            }
            directions[el].viewDistance++
          }
          break

        case 'down':
          if (yIndex + x < treeMap[0].length && !directions[el].isBlocked) {
            if (treeMap[xIndex][yIndex + x] >= treeMap[xIndex][yIndex]) {
              directions[el].isBlocked = true
            }
            directions[el].viewDistance++
          }
          break
      }
    })
  }

  let scenicScore: number = 1
  Object.keys(directions).forEach((el) => {
    if (directions[el].viewDistance !== 0) scenicScore *= directions[el].viewDistance
  })
  return scenicScore
}

readFile('./day08b/src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err !== null) {
    console.error(err)
  }
  const treeMap = createTreeMap(data)
  console.log(findHighestScenicScore(treeMap))
})
