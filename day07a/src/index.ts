import { readFile } from 'fs'

interface directory {
  parentDirectory: string
  childDirectories: string[]
  fileSize: number
}

interface directoryObject {
  [name: string]: directory
}

interface checkSizeType {
  usedChildren: string[]
  fileSize: number
}

readFile('./day07a/src/assets/input.txt', 'utf-8', (err: any, data: string) => {
  if (err !== null) {
    console.error(err)
  }
  const commandArray: string[] = data.split('$ ')
  const pathPointerArray: string[] = []
  const directories: directoryObject = {}
  let fileAmount: number = 0
  const alreadyCheckedArray: string[] = []

  const checkParents = (parent: string, fileSize: number, usedElements: string[]): checkSizeType => {
    const currentFileSize = fileSize + directories[parent].fileSize
    const greatParent = directories[directories[parent].parentDirectory]
    const siblings = greatParent.childDirectories
    siblings.splice(directories[directories[parent].parentDirectory].childDirectories.indexOf(parent), 1)
    let siblingFileSize = 0
    const siblingArray: string[] = []
    if (siblings.length >= 1) {
      siblings.forEach((el) => {
        if (alreadyCheckedArray.includes(el) || usedElements.includes(el)) return
        const resultArray = checkChildrens(el, siblingFileSize)
        siblingFileSize = resultArray.fileSize
        siblingArray.push(...resultArray.usedChildren)
      })
      if ((currentFileSize + siblingFileSize + greatParent.fileSize) > 100000) {
        return {
          usedChildren: [],
          fileSize: 0
        }
      } else {
        console.log(siblingFileSize)
        console.log(siblingArray)
      }
    }
    if ((greatParent.fileSize + currentFileSize) <= 100000) {
      const resultArray = checkParents(directories[parent].parentDirectory, currentFileSize, [...usedElements, parent])
      if (resultArray.usedChildren[0] === undefined) {
        return {
          fileSize: currentFileSize,
          usedChildren: usedElements
        }
      }
      return { fileSize: resultArray.fileSize, usedChildren: [...resultArray.usedChildren, parent, ...usedElements] }
    } else {
      return {
        usedChildren: usedElements,
        fileSize: currentFileSize
      }
    }
  }

  const checkChildrens = (child: string, fileSize: number): checkSizeType => {
    const usedChildren: string[] = [child]
    let currentFileSize: number = fileSize + directories[child].fileSize
    for (let x = 0; x <= directories[child].childDirectories.length - 1; x++) {
      if (!alreadyCheckedArray.includes(directories[child].childDirectories[x])) {
        break
      }
      const checkResult = checkChildrens(directories[child].childDirectories[x], fileSize)
      usedChildren.push(...checkResult.usedChildren)
      currentFileSize += checkResult.fileSize
    }
    return {
      usedChildren,
      fileSize: currentFileSize
    }
  }

  commandArray.forEach((el) => {
    el.split('\n').forEach((el2) => {
      const commandSpecifics = el2.split(' ')
      switch (commandSpecifics[0]) {
        case 'cd':
          commandSpecifics[1] === '..'
            ? pathPointerArray.pop()
            : pathPointerArray.push(commandSpecifics[1])

          break

        case 'ls':
          if (pathPointerArray.length - 1 < 0) break
          directories[pathPointerArray[pathPointerArray.length - 1]] = {
            parentDirectory: (pathPointerArray.length - 2) >= 0 ? pathPointerArray[pathPointerArray.length - 2] : '',
            childDirectories: [],
            fileSize: 0
          }
          break

        case 'dir':
          directories[pathPointerArray[pathPointerArray.length - 1]].childDirectories.push(commandSpecifics[1])
          break

        case '':
          break

        default:
          directories[pathPointerArray[pathPointerArray.length - 1]].fileSize += Number(commandSpecifics[0])
          break
      }
    })
  })
  console.log(directories)
  Object.keys(directories).forEach((el) => {
    if (directories[el].childDirectories[0] !== undefined) return
    if (alreadyCheckedArray.includes(el)) return
    const usedElements: string[] = [el]
    let fileSize: number = directories[el].fileSize
    if (directories[el].fileSize > 100000) return
    console.log(el, directories[el].fileSize)
    const checkResult = checkParents(directories[el].parentDirectory, fileSize, usedElements)
    if (checkResult.usedChildren.includes('dnhzj')) console.log(checkResult, 'meep')
    usedElements.push(...checkResult.usedChildren)
    fileSize = checkResult.fileSize
    alreadyCheckedArray.push(...usedElements)
    fileAmount += fileSize
  })
  alreadyCheckedArray.sort()
  console.log(alreadyCheckedArray)
  console.log(fileAmount)
})
