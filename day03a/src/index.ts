/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { readFile } from 'fs'

readFile('./src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err) {
    console.error(err)
  }
  // charCodeAt - xCharDifference = priority
  const upperCharDifference = Number('A'.charCodeAt(0)) - 27
  const lowerCharDifference = Number('a'.charCodeAt(0)) - 1
  const rucksackArray = data.split('\n')
  let priorityScore: number = 0

  rucksackArray.forEach((el: string): void => {
    if (!el) return undefined
    const alreadyCheckedArray: string[] = []
    const containerArray: string[][] = [el.substring(0, el.length / 2).split(''), el.substring(el.length / 2).split('')]
    containerArray[1].forEach((el2: string) => {
      if (containerArray[0].includes(el2) && !alreadyCheckedArray.includes(el2)) priorityScore += Number(el2.charCodeAt(0)) - (el2[0] === el2[0].toUpperCase() ? upperCharDifference : lowerCharDifference)
      alreadyCheckedArray.push(el2)
    })
  })
  console.log(priorityScore)
})
