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

export const DEFAULT_MATCH: GoMatch = {
  id: '1739373119987',
  date: '2025-01-25',
  time: '10:45',
  ruleType: '韩国规则',
  handicap: '4又1/2子',
  result: {
    winner: 'white',
    method: '-',
    points: '黑哨',
  },
  moves: 160,
  size: 19,
  timeUsed: {
    black: '2小时10分钟',
    white: '2小时20分钟',
  },
  positions: parseSGF(
    '(;RU[jp]SZ[19]KM[6.5]HA[0];B[pd];W[dd];B[pq];W[dq];B[fc];W[df];B[co];W[ep];B[po];W[cl];B[ee];W[de];B[db];W[jp];B[dn];W[bp];B[fn];W[gp];B[dk];W[em];B[ck];W[dm];B[dh];W[fm];B[cc];W[fg];B[fe];W[dg];B[eh];W[ff];B[cg];W[gi];B[gj];W[fi];B[ej];W[ge];B[go];W[ho];B[gm];W[fo];B[en];W[gn];B[cm];W[bm];B[cn];W[dl];B[bl];W[bk];B[al];W[am];B[fl];W[ak];B[bl];W[al];B[el];W[bl];B[bn];W[an];B[ao];W[bj];B[hn];W[gl];B[go];W[fk];B[ek];W[gn];B[hm];W[fj];B[bi];W[cj];B[dj];W[ci];B[ch];W[bo];B[be];W[go];B[cp];W[bq];B[cq];W[cr];B[br];W[ar];B[ah];W[bs];B[gk];W[gc];B[ij];W[ii];B[ji];W[ih];B[jh];W[jg];B[ig];W[hg];B[if];W[jj];B[kj];W[hj];B[jk];W[hk];B[qj];W[kg];B[je];W[bf];B[af];W[ke];B[kd];W[le];B[ld];W[me];B[md];W[ne];B[oc];W[pe];B[qe];W[qf];B[ni];W[jd];B[id];W[qd];B[re];W[jc];B[ic];W[qc];B[hh];W[pc];B[hi];W[il];B[jm];W[im];B[jo];W[in];B[kp];W[qp];B[qq];W[pp];B[op];W[qo];B[oo];W[qh];B[pf];W[od];B[qg];W[ph];B[of];W[nh];B[rh];W[ri];B[rf];W[sh];B[sg];W[rg];B[di];W[ap];B[rh];W[bd];B[si];W[cd];B[nd]PB[柯洁]PW[卞相壹])',
  ).positions,
}
