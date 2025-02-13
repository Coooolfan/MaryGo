export interface Result {
  winner: 'black' | 'white'
  method: string
  points: string
}

export interface TimeUsed {
  black: string
  white: string
}

export type position = 'b' | 'w' | 'x'

export type board_state = position[][]

export interface GoMatch {
  id: string
  date: string
  time: string
  ruleType: string
  handicap: string
  result: Result
  moves: number
  timeUsed: TimeUsed
  size: number
  positions?: board_state[]
}

export const EmptyBoardState: board_state = Array(19)
  .fill(null)
  .map(() => Array(19).fill('x'))

export const GoMatches: GoMatch[] = [
  {
    id: 'match-001',
    date: '2024-03-15',
    time: '14:30',
    ruleType: '中国规则',
    handicap: '3又3/4子',
    result: {
      winner: 'white',
      method: '点胜',
      points: '1.5目',
    },
    moves: 285,
    timeUsed: {
      black: '2小时15分钟',
      white: '2小时20分钟',
    },
    size: 19,
  },
  {
    id: 'match-002',
    date: '2024-03-16',
    time: '09:45',
    ruleType: '日本规则',
    handicap: '无让子',
    result: {
      winner: 'black',
      method: '中盘胜',
      points: '认输',
    },
    moves: 156,
    timeUsed: {
      black: '1小时45分钟',
      white: '1小时30分钟',
    },
    size: 19,
  },
  {
    id: 'match-003',
    date: '2024-03-16',
    time: '15:00',
    ruleType: '中国规则',
    handicap: '2又1/4子',
    result: {
      winner: 'white',
      method: '点胜',
      points: '2.75目',
    },
    moves: 312,
    timeUsed: {
      black: '2小时30分钟',
      white: '2小时25分钟',
    },
    size: 19,
  },
  {
    id: 'match-004',
    date: '2024-03-17',
    time: '10:30',
    ruleType: '中国规则',
    handicap: '无让子',
    result: {
      winner: 'black',
      method: '大场胜',
      points: '32.5目',
    },
    moves: 245,
    timeUsed: {
      black: '1小时55分钟',
      white: '2小时05分钟',
    },
    size: 19,
  },
  {
    id: 'match-005',
    date: '2024-03-17',
    time: '14:15',
    ruleType: '日本规则',
    handicap: '4子',
    result: {
      winner: 'white',
      method: '中盘胜',
      points: '认输',
    },
    moves: 178,
    timeUsed: {
      black: '1小时20分钟',
      white: '1小时35分钟',
    },
    size: 19,
  },
  {
    id: 'match-006',
    date: '2024-03-18',
    time: '13:00',
    ruleType: '中国规则',
    handicap: '2又3/4子',
    result: {
      winner: 'black',
      method: '点胜',
      points: '3.25目',
    },
    moves: 298,
    timeUsed: {
      black: '2小时10分钟',
      white: '2小时15分钟',
    },
    size: 19,
  },
  {
    id: 'match-007',
    date: '2024-03-19',
    time: '09:30',
    ruleType: '中国规则',
    handicap: '5又1/4子',
    result: {
      winner: 'white',
      method: '点胜',
      points: '0.75目',
    },
    moves: 342,
    timeUsed: {
      black: '2小时40分钟',
      white: '2小时35分钟',
    },
    size: 19,
  },
  {
    id: 'match-008',
    date: '2024-03-19',
    time: '14:45',
    ruleType: '日本规则',
    handicap: '6子',
    result: {
      winner: 'black',
      method: '大场胜',
      points: '45.5目',
    },
    moves: 198,
    timeUsed: {
      black: '1小时50分钟',
      white: '1小时45分钟',
    },
    size: 19,
  },
  {
    id: 'match-009',
    date: '2024-03-20',
    time: '10:15',
    ruleType: '中国规则',
    handicap: '无让子',
    result: {
      winner: 'white',
      method: '中盘胜',
      points: '认输',
    },
    moves: 167,
    timeUsed: {
      black: '1小时25分钟',
      white: '1小时40分钟',
    },
    size: 19,
  },
  {
    id: 'match-010',
    date: '2024-03-20',
    time: '15:30',
    ruleType: '日本规则',
    handicap: '2子',
    result: {
      winner: 'black',
      method: '时间胜',
      points: '超时',
    },
    moves: 276,
    timeUsed: {
      black: '2小时25分钟',
      white: '3小时00分钟',
    },
    size: 19,
  },
  {
    id: 'match-011',
    date: '2024-03-21',
    time: '09:00',
    ruleType: '中国规则',
    handicap: '3又1/4子',
    result: {
      winner: 'white',
      method: '点胜',
      points: '4.25目',
    },
    moves: 325,
    timeUsed: {
      black: '2小时30分钟',
      white: '2小时20分钟',
    },
    size: 19,
  },
  {
    id: 'match-012',
    date: '2024-03-21',
    time: '14:00',
    ruleType: '中国规则',
    handicap: '7子',
    result: {
      winner: 'black',
      method: '大场胜',
      points: '52.5目',
    },
    moves: 215,
    timeUsed: {
      black: '1小时35分钟',
      white: '1小时50分钟',
    },
    size: 19,
  },
  {
    id: 'match-013',
    date: '2024-03-22',
    time: '10:45',
    ruleType: '日本规则',
    handicap: '4又1/2子',
    result: {
      winner: 'white',
      method: '中盘胜',
      points: '认输',
    },
    moves: 189,
    timeUsed: {
      black: '1小时55分钟',
      white: '1小时45分钟',
    },
    size: 19,
  },
  {
    id: 'match-014',
    date: '2024-03-22',
    time: '15:15',
    ruleType: '中国规则',
    handicap: '无让子',
    result: {
      winner: 'black',
      method: '点胜',
      points: '1.75目',
    },
    moves: 301,
    timeUsed: {
      black: '2小时15分钟',
      white: '2小时10分钟',
    },
    size: 19,
  },
]
