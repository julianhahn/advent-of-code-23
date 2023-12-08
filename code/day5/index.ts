class Map {
    source: number
    destination: number
    range: number

    constructor(source: number, destination: number, range: number) {
        this.source = source
        this.destination = destination
        this.range = range
    }

    // destination source range
    // the map is for example 52 50 48, and for the seed 79.
    // this would mean 79-50 = 29, and 29+52 = 81
    getDestination(source: number): number {
        return source - this.source + this.destination
    }

    isSourceInRange(source: number): boolean {
        return source >= this.source && source <= this.source + this.range
    }
}

const SECTION_NAMES = {
    SEED_TO_SOIL: 'seed-to-soil map',
    SOIL_TO_FERTILIZER: 'soil-to-fertilizer map',
    FERTILIZER_TO_WATER: 'fertilizer-to-water map',
    WATER_TO_LIGHT: 'water-to-light map',
    LIGHT_TO_TEMPERATURE: 'light-to-temperature map',
    TEMPERATURE_TO_HUMIDITY: 'temperature-to-humidity map',
    HUMIDITY_TO_LOCATION: 'humidity-to-location map',
} as const

type SectionName = (typeof SECTION_NAMES)[keyof typeof SECTION_NAMES]

class Section {
    name: SectionName
    maps: Map[] = []

    constructor(input: string) {
        const lines = input.split('\n')
        this.name = lines[0].split(':')[0].trim() as SectionName
        const maps = lines.slice(1).map((line) => {
            const [destination, source, range] = line
                .split(' ')
                .map((value) => parseInt(value))
            return new Map(source, destination, range)
        })
        this.maps = maps
    }

    public getDestination(source: number): number {
        const map = this.maps.find((map) => map.isSourceInRange(source))
        if (!map) {
            return source
        }
        return map.getDestination(source)
    }

    public print() {
        console.log(this.name)
        this.maps.forEach((map) => {
            console.log(`${map.source} ${map.destination} ${map.range}`)
        })
    }
}

export class Almanach {
    seeds: number[] = []

    seedToSoil: Section
    soilToFertilizer: Section
    fertilizerToWater: Section
    waterToLight: Section
    lightToTemperature: Section
    temperatureToHumidity: Section
    humidityToLocation: Section

    constructor(public input: string) {
        this.input = input
        const sections = input.split('\n\n')
        const seeds = sections[0].split(':')[1].trim().split(' ')
        this.seeds = seeds.map((seed) => parseInt(seed, 10))

        this.seedToSoil = new Section(sections[1])
        this.soilToFertilizer = new Section(sections[2])
        this.fertilizerToWater = new Section(sections[3])
        this.waterToLight = new Section(sections[4])
        this.lightToTemperature = new Section(sections[5])
        this.temperatureToHumidity = new Section(sections[6])
        this.humidityToLocation = new Section(sections[7])
    }

    public getSeeds(): number[] {
        return this.seeds
    }

    public getMinForSeedRange(seedStart: number, seedRange: number): number {
        console.time('getMinForSeedRange')
        let min = Infinity
        for (let seed = seedStart; seed < seedStart + seedRange; seed++) {
            const location = this.getLocationForSeed(seed)
            if (location < min) {
                min = location
            }
        }
        console.timeEnd('getMinForSeedRange')
        return min
    }

    public getLocationForSeed(seed: number): number {
        const soil = this.seedToSoil.getDestination(seed)
        const fertilizer = this.soilToFertilizer.getDestination(soil)
        const water = this.fertilizerToWater.getDestination(fertilizer)
        const light = this.waterToLight.getDestination(water)
        const temperature = this.lightToTemperature.getDestination(light)
        const humidity = this.temperatureToHumidity.getDestination(temperature)
        const location = this.humidityToLocation.getDestination(humidity)
        return location
    }
}

import { readFileSync } from 'fs'

type SeedPair = {
    seedStart: number
    seedRange: number
}

function main() {
    const input = readFileSync('input.txt', 'utf8')
    const almanach = new Almanach(input)
    //const min = almanach.getMinForSeedRange(1347397244, 12212989) took 1.8 seconds

    const seedPairString = `1347397244 12212989 2916488878 1034516675 2821376423 8776260 2240804122 368941186 824872000 124877531 1597965637 36057332 4091290431 159289722 1875817275 106230212 998513229 159131132 2671581775 4213184`
    const seedPairValues = seedPairString
        .split(' ')
        .map((value) => parseInt(value))
    const seedPairs = []
    for (let i = 0; i < seedPairValues.length; i += 2) {
        seedPairs.push({
            seedStart: seedPairValues[i],
            seedRange: seedPairValues[i + 1],
        })
    }
    let min = Infinity
    for (const seedPair of seedPairs) {
        const seedStart = seedPair.seedStart
        const seedRange = seedPair.seedRange
        const location = almanach.getMinForSeedRange(seedStart, seedRange)
        if (location < min) {
            min = location
        }
    }
    console.log(`The lowest location is ${min}`)
}
main()
