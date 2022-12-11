import { readFile } from 'fs'

interface directory {
  parentDirectory: string
  childDirectories: string[]
  filesize: number
}

interface directoryObject {
  [name: string]: directory
}

const checkSize = () => {
  // Todo: implement
  return 0
}

readFile('./src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err !== null) {
    console.error(err)
  }
  const commandArray: string[] = data.split('$ ')
  const pathPointerArray: string[] = []
  const directories: directoryObject = {}
  const fileAmount = 0
  let isFull = false

  commandArray.forEach((el) => {
    el.split('\n').forEach((el2) => {
      const commandSpecifics = el2.split(' ')
      switch (commandSpecifics[0]) {
        case 'cd':
          if (commandSpecifics[1] === '..') {
            pathPointerArray.pop()
            let contentSize = 0
            if (!isFull) { contentSize = checkSize() }
            if (contentSize > 100000) isFull = true
          } else {
            pathPointerArray.push(commandSpecifics[1])
            isFull = false
          }
          break

        case 'ls':
          if (pathPointerArray.length - 1 < 0) break
          directories[pathPointerArray[pathPointerArray.length - 1]] = {
            parentDirectory: (pathPointerArray.length - 2) >= 0 ? pathPointerArray[pathPointerArray.length - 2] : '',
            childDirectories: [],
            filesize: 0
          }
          break

        case 'dir':
          directories[pathPointerArray[pathPointerArray.length - 1]].childDirectories.push(commandSpecifics[1])
          break

        case '':
          break

        default:
          directories[pathPointerArray[pathPointerArray.length - 1]].filesize += Number(commandSpecifics[0])
          break
      }
    })
  })
  console.log(fileAmount)
  console.log(directories)
})
