/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { readFile } from 'fs'

// A/X: Rock, B/Y: Paper, C/Z: Scissors
const matchOptions: any = {
  X: {
    choicePoints: 1,
    A: 3,
    B: 0,
    C: 6
  },
  Y: {
    choicePoints: 2,
    A: 6,
    B: 3,
    C: 0
  },
  Z: {
    choicePoints: 3,
    A: 0,
    B: 6,
    C: 3
  }
}

readFile('./src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err) {
    console.error(err)
  }
  const matchRoundsArray = data.split('\n')
  let playerScore: number = 0

  // eslint-disable-next-line array-callback-return
  matchRoundsArray.map((el: string): void => {
    const playerChoice: string[] = el.split(' ')
    if (!playerChoice[0]) return undefined
    console.log(playerChoice)
    playerScore += Number(matchOptions[playerChoice[1]].choicePoints) + Number(matchOptions[playerChoice[1]][playerChoice[0]])
  })

  console.log(playerScore)
})
