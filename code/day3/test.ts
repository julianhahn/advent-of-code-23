import { part1, part2 } from './index'

const exampleString = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

describe('first', () => {
    it('should return 4361', () => {
        expect(part1(exampleString)).toBe(4361)
    })

    it('should return 0', () => {
        expect(part2(exampleString)).toBe(467835)
    })
})
