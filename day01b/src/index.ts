import { readFile } from 'fs'

readFile('./day01b/src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err !== null) {
    return console.log(err)
  }
  const caloriesPerElfArray = data.split('\n')
  const numberOfTopCalories = 3
  const mostCaloriesArray = Array(numberOfTopCalories).fill(0)
  let currentElfCalories = 0

  caloriesPerElfArray.forEach((el: string) => {
    if (el === '') {
      currentElfCalories = 0
      return
    }
    const minTopCalories = Math.min(...mostCaloriesArray)
    currentElfCalories += Number(el)
    if (currentElfCalories > minTopCalories) mostCaloriesArray[mostCaloriesArray.indexOf(minTopCalories)] = currentElfCalories
  })
  let sumTopCalories = 0
  mostCaloriesArray.forEach((el) => {
    sumTopCalories += Number(el)
  })
  console.log(sumTopCalories)
})
