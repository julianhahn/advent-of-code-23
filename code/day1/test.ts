import { part1 } from "./index";
const example_string_1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const example_string_2 = `one
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

/* test("the result of the example be 142", () => {
  expect(part1(example_string_1)).toBe(142);
}); */

test("the result of the example be 142", () => {
  expect(part1(example_string_2)).toBe(281);
});
