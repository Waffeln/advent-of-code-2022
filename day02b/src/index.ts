/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { readFile } from 'fs'

// A: Rock, B: Paper, C: Scissors
// X lose, Y draw, Z win
const matchOptions: any = {
  X: {
    resultPoints: 0,
    A: 3,
    B: 1,
    C: 2
  },
  Y: {
    resultPoints: 3,
    A: 1,
    B: 2,
    C: 3
  },
  Z: {
    resultPoints: 6,
    A: 2,
    B: 3,
    C: 1
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
    playerScore += Number(matchOptions[playerChoice[1]].resultPoints) + Number(matchOptions[playerChoice[1]][playerChoice[0]])
  })

  console.log(playerScore)
})
