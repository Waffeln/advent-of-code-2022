import { readFile } from 'fs'

readFile('./day06b/src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err !== null) {
    console.error(err)
  }
  const bufferInputArray: string[] = data.replace('\n', '').split('')
  const characterArray: string[] = []

  for (let x = 0; x < bufferInputArray.length; x++) {
    if (characterArray.length === 14) {
      let isNotStartMarker = false
      characterArray.forEach((el, idx) => {
        const tempCharacterArray = [...characterArray]
        tempCharacterArray.splice(idx, 1)
        if (tempCharacterArray.includes(el)) isNotStartMarker = true
      })
      if (!isNotStartMarker) {
        console.log(x, characterArray)
        break
      } else characterArray.pop()
    }
    characterArray.unshift(bufferInputArray[x])
  }
})
