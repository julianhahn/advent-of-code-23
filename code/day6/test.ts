import { Race } from './index'

const example = `Time:      7  15   30
Distance:  9  40  200`

import { parseToOneRace, parseToRaces } from './index'

test('ways to break the record in each race', () => {
    const races = parseToRaces(example)
    const waysToWin = races.map((race) => race.countWaysToBreakRecord())
    let sum = 1
    for (let letWinCount of waysToWin) {
        sum *= letWinCount
    }
    expect(sum).toEqual(288)
})

test('ways to break the record in the one race', () => {
    const race = parseToOneRace(example)
    const waysToWin = race.countWaysToBreakRecord()
    expect(waysToWin).toEqual(71503)
    console.log(waysToWin)
})
