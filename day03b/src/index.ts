/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { readFile } from 'fs'

readFile('./src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err) {
    console.error(err)
  }
  // charCodeAt - xCharDifference = priority
  const upperCharDifference: number = Number('A'.charCodeAt(0)) - 27
  const lowerCharDifference: number = Number('a'.charCodeAt(0)) - 1
  const rucksackArray: string[] = data.split('\n')
  const badgeArray: string[] = []
  let priorityScore: number = 0

  rucksackArray.forEach((el: string, idx: number): void => {
    if (!el) return undefined
    const alreadyCheckedArray: string[] = []
    el.split('').forEach((el2) => {
      if (alreadyCheckedArray.includes(el2)) return
      alreadyCheckedArray.push(el2)
      badgeArray.push(el2)
    })
    if ((idx + 1) % 3 === 0) {
      let currentBadgeCount: number = 0
      let currentHighestBadge: string = ''
      const badgeCount: any = {}
      badgeArray.forEach((el2: string) => {
        badgeCount[el2] = (Number(badgeCount[el2]) || 0) + 1
      })
      for (const key in badgeCount) {
        if (currentBadgeCount < badgeCount[key]) {
          currentBadgeCount = badgeCount[key]
          currentHighestBadge = key
        }
        badgeArray.splice(0, badgeArray.length)
      }
      priorityScore += Number(currentHighestBadge.charCodeAt(0)) - (currentHighestBadge === currentHighestBadge.toUpperCase() ? upperCharDifference : lowerCharDifference)
    }
  })
  console.log(priorityScore)
})
