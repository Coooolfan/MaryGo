import { EmptyBoardState, type board_state, type GoMatch } from './GoMatch'

function extractNumberFromString(input: string, identifier: string): number | null {
  const regex = new RegExp(`${identifier}\\[(\\d+)\\]`)
  const match = input.match(regex)

  if (match && match[1]) {
    return parseInt(match[1], 10)
  }

  return null
}

function extractMoves(input: string): string | null {
  const regex = /((?:;[WB]\[[^\]]+\])+)/
  const match = input.match(regex)
  return match ? match[0] : null
}

function charToNumber(char: string): number | null {
  if (char.length !== 1) {
    throw new Error('Function expects a single character input.')
  }

  const lowerCaseOffset = 'a'.charCodeAt(0)
  const upperCaseOffset = 'A'.charCodeAt(0)

  if (char >= 'a' && char <= 'z') {
    return char.charCodeAt(0) - lowerCaseOffset
  } else if (char >= 'A' && char <= 'Z') {
    return char.charCodeAt(0) - upperCaseOffset + 26
  } else {
    return null
  }
}

export function parseSGF(string: string): GoMatch {
  const size = extractNumberFromString(string, 'SZ')
  const date = extractNumberFromString(string, 'DT')
  const time = extractNumberFromString(string, 'TM')
  const ruleType = extractNumberFromString(string, 'RU')
  const handicap = extractNumberFromString(string, 'HA')
  const result = extractNumberFromString(string, 'RE')
  const movesString = extractMoves(string)
  const playerBlack = extractNumberFromString(string, 'PB')

  const res: GoMatch = {
    id: Date.now().toString(),
    date: date?.toString() ?? new Date().toLocaleDateString(),
    time: time?.toString() ?? new Date().toLocaleTimeString(),
    ruleType: ruleType?.toString() ?? '',
    handicap: handicap?.toString() ?? '',
    result: {
      winner: result?.toString() === playerBlack?.toString() ? 'black' : 'white',
      method: '',
      points: '',
    },
    moves: 1,
    size: size ?? 19,
    timeUsed: {
      black: '',
      white: '',
    },
  }
  if (movesString == null) {
    return res
  }
  const positions: board_state[] = []
  positions.push(structuredClone(EmptyBoardState))
  const currentBoard = structuredClone(EmptyBoardState)
  const moveList = movesString.split(';')
  for (let i = 0; i < moveList.length; i++) {
    const move = moveList[i]
    console.log(move)
    if (move.length <= 1) {
      continue
    }
    const x = charToNumber(move[2])
    const y = charToNumber(move[3])
    if (x === null || y === null) {
      continue
    }
    currentBoard[x][y] = move[0] === 'B' ? 'b' : 'w'
    positions.push(structuredClone(currentBoard))
  }
  res.positions = positions
  res.moves = positions.length - 1
  return res
}
