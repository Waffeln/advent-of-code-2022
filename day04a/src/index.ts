import { readFile } from 'fs'

readFile('./src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err !== null) {
    console.error(err)
  }
  const cleaningSectionArray: string[] = data.split('\n')
  let completeOverlapCount: number = 0

  cleaningSectionArray.forEach((el: string): void => {
    if (el === '') return undefined

    const sections = el.split(',')

    if ((Number(sections[0].split('-')[0]) <= Number(sections[1].split('-')[0]) &&
      Number(sections[0].split('-')[1]) >= Number(sections[1].split('-')[1])) ||
      (Number(sections[1].split('-')[0]) <= Number(sections[0].split('-')[0]) &&
      Number(sections[1].split('-')[1]) >= Number(sections[0].split('-')[1]))) completeOverlapCount++
  })
  console.log(completeOverlapCount)
})
