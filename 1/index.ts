// ------ PART ONE -------
// read the input.txt file
const input = Deno.readTextFileSync("./1/input.txt");

// split the input into groups (Elves) using the empty line as a separator
const elves = input.split(`

`);

// sum the totals for each elf
const totals = elves.map((elf) => {
  // turn each group into an array of numbers
  const numbers = elf
    .split(
      `
`
    )
    .map((n) => parseInt(n, 10));
  const totalCalories = numbers.reduce((a, b) => a + b, 0);
  return totalCalories;
});

// sort the totals from least to greatest
const sortedTotals = totals.sort((a, z) => a - z);

// grab the last total (the greatest)
const greatestTotal = sortedTotals.at(-1);
console.log(greatestTotal);

// ------ PART TWO -------

// sum the totals of the last 3 elves
const lastThreeTotals = sortedTotals.slice(-3);
const lastThreeTotal = lastThreeTotals.reduce((a, b) => a + b, 0);
console.log(lastThreeTotal);
