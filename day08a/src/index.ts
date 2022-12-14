import { readFile } from 'fs'

interface directionType {
  [direction: string]: boolean[]
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

const countVisibleTreesInGrid = (treeMap: number[][]): number => {
  let visibleTrees: number = 0
  treeMap.forEach((elX, idxX) => {
    elX.forEach((elY, idxY) => {
      if (checkIsVisible(treeMap, idxX, idxY))visibleTrees++
    })
  })
  return visibleTrees
}

const checkIsVisible = (treeMap: number[][], xIndex: number, yIndex: number): boolean => {
  if (xIndex === 0 || yIndex === 0 || xIndex === treeMap.length - 1 || yIndex === treeMap[0].length - 1) return true
  const directions: directionType = {
    left: [],
    right: [],
    up: [],
    down: []
  }

  for (let x = 1; x < treeMap[0].length; x++) {
    Object.keys(directions).forEach((el) => {
      if (directions[el].includes(false)) return
      switch (el) {
        case 'left':
          if (xIndex - x >= 0) {
            directions[el].push(treeMap[xIndex - x][yIndex] < treeMap[xIndex][yIndex])
          }
          break

        case 'right':
          if (xIndex + x < treeMap.length) {
            directions[el].push(treeMap[xIndex + x][yIndex] < treeMap[xIndex][yIndex])
          }
          break

        case 'up':
          if (yIndex - x >= 0) {
            directions[el].push(treeMap[xIndex][yIndex - x] < treeMap[xIndex][yIndex])
          }
          break

        case 'down':
          if (yIndex + x < treeMap[0].length) {
            directions[el].push(treeMap[xIndex][yIndex + x] < treeMap[xIndex][yIndex])
          }
          break
      }
    })
  }
  return (Object.keys(directions).map((el) => !directions[el].includes(false))).includes(true)
}

readFile('./day08a/src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err !== null) {
    console.error(err)
  }
  const treeMap = createTreeMap(data)
  console.log(countVisibleTreesInGrid(treeMap))
})
