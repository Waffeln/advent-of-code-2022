import { readFile } from 'fs'

readFile('./src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err !== null) {
    console.error(err)
  }
  const cleaningSectionArray: string[] = data.split('\n')
  const crateStackArray: string[][] = []
  let rearrangedCrateStackUpperCrate: string = ''
  let isStartingStack = true

  cleaningSectionArray.forEach((el: string, idx): void => {
    if (el === '') return undefined

    if (isStartingStack) {
      if (el[1] === '1') {
        isStartingStack = false
        return undefined
      }
      for (let x = 0; (x * 4 + 1) < el.length - 1; x++) {
        // TODO: find less hardcody way, to see if there is a crate in Stack x |[N]     [F] [M]     [D] [V] [R] [N]|
        //                                                                     | 1   2   3   4   5   6   7   8   9 |
        if (idx === 0) crateStackArray.push([])
        if (el[(x * 4) + 1] !== ' ') crateStackArray[x].unshift(el[x * 4 + 1])
      }
    } else {
      let simplifiedString = el.replace('move ', '')
      simplifiedString = simplifiedString.replace(' from ', '-')
      simplifiedString = simplifiedString.replace(' to ', '-')
      const commandRow = simplifiedString.split('-')
      const fromStack = Number(commandRow[1]) - 1
      const toStack = Number(commandRow[2]) - 1
      const fromStackLength = crateStackArray[fromStack].length - 1
      const crateHolderArray = []

      for (let x = fromStackLength; x > (fromStackLength - Number(commandRow[0])); x--) {
        crateHolderArray.unshift(crateStackArray[fromStack][x])
        crateStackArray[fromStack].pop()
      }
      crateStackArray[toStack].push(...crateHolderArray)
    }
  })
  crateStackArray.forEach((el) => {
    rearrangedCrateStackUpperCrate += el[el.length - 1]
  })
  console.log(rearrangedCrateStackUpperCrate)
})
