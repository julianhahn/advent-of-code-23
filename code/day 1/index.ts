import { readFileSync } from "fs";

let counter = 0;

export function part1(input: string): number {
  counter = 0;
  const lines = split(input);
  let sum = 0;
  for (const line of lines) {
    const result = returnNumber(line);
    sum += result;
  }
  return sum;
}

export function returnNumber(input: string): number {
  const regex =
    /(?=((\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)))/g;

  const results = [];
  const regexResults = input.matchAll(regex);
  const matches = Array.from(regexResults, (m) => m[1]);
  console.log(matches);
  if (!matches) return 0;
  for (const match of matches) {
    let numberString = "";
    switch (match) {
      case "one":
        numberString += "1";
        break;
      case "two":
        numberString += "2";
        break;
      case "three":
        numberString += "3";
        break;
      case "four":
        numberString += "4";
        break;
      case "five":
        numberString += "5";
        break;
      case "six":
        numberString += "6";
        break;
      case "seven":
        numberString += "7";
        break;
      case "eight":
        numberString += "8";
        break;
      case "nine":
        numberString += "9";
        break;
      default:
        numberString += match;
        break;
    }
    if (numberString === "" && matches.length >= 1) numberString = match;
    results.push(numberString);
  }
  console.log(input);
  console.log(results);
  let resultString = "" + results[0] + results[results.length - 1];
  console.log(resultString);

  if (resultString === "") return 0;
  counter++;

  let resultNumber = parseInt(resultString);
  return resultNumber;
}

export function split(input: string): string[] {
  return input.split("\n");
}

function main() {
  const input = readFileSync("input_2.txt", "utf8");
  const result = part1(input);
  console.log(result);
  console.log(counter);
}

main();
