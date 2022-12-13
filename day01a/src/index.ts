import { readFile } from 'fs'

readFile('./day01a/src/assets/input.txt', 'utf-8', (err: any, data: any) => {
  if (err !== null) {
    return console.log(err)
  }
  const caloriesPerElfArray = data.split('\n')
  let mostCalories = 0
  let currentElfCalories = 0
  caloriesPerElfArray.forEach((el: string) => {
    if (el === '') {
      currentElfCalories = 0
      return
    }
    currentElfCalories += Number(el)
    if (currentElfCalories > mostCalories) mostCalories = currentElfCalories
  })
  console.log(mostCalories)
})
