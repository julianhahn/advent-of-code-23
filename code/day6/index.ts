export class Race {
    distance: number
    time: number

    constructor(time: number, distance: number) {
        this.time = time
        this.distance = distance
        if (!this.validRace) {
            throw new Error(
                `given Race is not valid ${this.time} ${this.distance}`
            )
        }
    }

    countWaysToBreakRecord(): number {
        let ways = 0
        // from 0 to the end of time, iterate through each second as long as the new value yields a longer distance than he one before. If we slow down after holding longer, we don't need to counter further
        for (let i = 0; i < this.time; i++) {
            const newDistance = this.calculateDistanceForHoldTime(i)
            if (newDistance > this.distance) {
                ways++
            }
            /*    if (
                i > 0 &&
                this.calculateDistanceForHoldTime(i - 1) > newDistance
            ) {
                break
            } */
        }
        return ways
    }

    calculateDistanceForHoldTime(holdTime: number): number {
        // each milisecond hold down, we accelerate by 1m/s but we lose a second from the total time
        return holdTime * (this.time - holdTime)
    }

    validRace(): boolean {
        return (
            Number.isInteger(this.time) &&
            Number.isInteger(this.distance) &&
            // i guess a race with a time of zero makes no sense
            this.time > 0 &&
            this.distance >= 0
        )
    }
}

import { readFileSync } from 'fs'

function main() {
    const input = readFileSync('input.txt', 'utf8')
    const race = parseToOneRace(input)
    console.log(race.countWaysToBreakRecord())
}

main()

export function parseToOneRace(input: string): Race {
    let [timeString, distanceString] = input.split('\n')
    let timeChars = timeString.split(':')[1].split('')
    let distanceChars = distanceString.split(':')[1].split('')
    timeChars = timeChars.filter((char) => char !== ' ')
    distanceChars = distanceChars.filter((char) => char !== ' ')

    let timeValueString = ''
    let distanceValueString = ''
    for (let char of timeChars) {
        timeValueString += char
    }
    for (let char of distanceChars) {
        distanceValueString += char
    }
    console.log(timeValueString, distanceValueString)
    const timeValue = parseInt(timeValueString)
    const distanceValue = parseInt(distanceValueString)
    const race = new Race(timeValue, distanceValue)
    return race
}

export function parseToRaces(input: string): Race[] {
    const lines = input.split('\n')
    const timeString = lines[0].split(':')[1]
    const distanceString = lines[1].split(':')[1]
    let times = timeString.split(' ')
    let distances = distanceString.split(' ')
    times = times.filter((time) => time !== '')
    distances = distances.filter((distance) => distance !== '')
    const races: Race[] = []
    if (times.length !== distances.length) {
        throw new Error('Times and distances must be the same length')
    }
    for (let i = 0; i < times.length; i++) {
        races.push(new Race(parseInt(times[i]), parseInt(distances[i])))
    }
    // check that every race has a valid time and distance
    return races
}
