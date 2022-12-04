// ------ PART ONE -------
// read the input.txt file
const input = Deno.readTextFileSync("./4/input.txt");

// go through each line of the input and push 3 lines groups into an array
const items = input.split(`
`);

// split all the items by the comma and build a new array with 2 values
const assignments = items.map((item) => item.split(","));

// go through all assignments and count ones where ranges completely intersect
let totalCount = 0;
let anyCount = 0;
assignments.forEach((assignment) => {
  const firstElf = assignment[0].split("-");
  // create a range between the 2 values in the split, using the first as the start and the second as the end
  const firstRange = [
    ...Array(parseInt(firstElf[1]) - parseInt(firstElf[0]) + 1),
  ].map((_, i) => i + parseInt(firstElf[0]));
  const secondElf = assignment[1].split("-");
  const secondRange = [
    ...Array(parseInt(secondElf[1]) - parseInt(secondElf[0]) + 1),
  ].map((_, i) => i + parseInt(secondElf[0]));

  console.log(firstRange);
  console.log(secondRange);
  // Part 1
  // if all numbers in the first range are in the second range, or all numbers in the 2nd range are in the 1st range, add 1 to the total count
  if (
    firstRange.every((number) => secondRange.includes(number)) ||
    secondRange.every((number) => firstRange.includes(number))
  ) {
    totalCount += 1;
  }
  // Part 2
  //  if any of the numbers in the first range are in the second range, or any of the numbers in the 2nd range are in the 1st range, add 1 to the total count
  if (
    firstRange.some((number) => secondRange.includes(number)) ||
    secondRange.some((number) => firstRange.includes(number))
  ) {
    anyCount += 1;
  }
});
console.log(totalCount);
console.log(anyCount);
