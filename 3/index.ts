// ------ PART ONE -------
// read the input.txt file
const input = Deno.readTextFileSync("./3/input.txt");

// go through each line of the input and push 3 lines groups into an array
const items = input.split(`
`);
const groups = [];
let currentGroup = [];
for (const item of items) {
  currentGroup.push(item);
  if (currentGroup.length === 3) {
    groups.push(currentGroup);
    currentGroup = [];
  }
}
console.log(groups);

// make an empty Set to add double items to
const doubleItems = new Set();
const doubleItemsArray: string[] = [];

// create a list of all lowercase and capital letters a-z and A-Z, using the letter as the key, and the letter's index in the alphabet as the value
const itemAlphabet = {
  ...[...Array(26)].reduce((acc, _, i) => {
    const letter = String.fromCharCode(i + 97);
    return {
      ...acc,
      [letter]: i + 1,
    };
  }, {}),
  ...[...Array(26)].reduce((acc, _, i) => {
    const letter = String.fromCharCode(i + 65);
    return {
      ...acc,
      [letter]: i + 1 + 26,
    };
  }, {}),
};

// go through all the items
items.forEach((item) => {
  // split the string into an array of letters
  const letters = item.split("");

  // split the array into 2 halves, with a new variable for each
  const [firstHalf, secondHalf] = [
    letters.slice(0, Math.ceil(letters.length / 2)),
    letters.slice(Math.ceil(letters.length / 2)),
  ];

  // create a Map of letters that appear in each half
  const firstHalfLetterCounts = new Map();
  const secondHalfLetterCounts = new Map();

  // get the intersection between the two halves
  const intersection = new Set();

  // go through the first half
  firstHalf.forEach((letter) => {
    // add the letter to the first half letter counts
    if (firstHalfLetterCounts.has(letter)) {
      firstHalfLetterCounts.set(letter, firstHalfLetterCounts.get(letter) + 1);
    } else {
      firstHalfLetterCounts.set(letter, 1);
    }
  });

  // go through the second half
  secondHalf.forEach((letter) => {
    // add the letter to the second half letter counts
    if (secondHalfLetterCounts.has(letter)) {
      secondHalfLetterCounts.set(
        letter,
        secondHalfLetterCounts.get(letter) + 1
      );
    } else {
      secondHalfLetterCounts.set(letter, 1);
    }

    // if the letter is in the first half letter counts, add it to the intersection
    if (firstHalfLetterCounts.has(letter)) {
      intersection.add(letter);
    }
  });

  // print results
  console.log(item);
  console.log(firstHalf);
  console.log(secondHalf);
  console.log("firstHalfLetterCounts", firstHalfLetterCounts);
  console.log("secondHalfLetterCounts", secondHalfLetterCounts);
  console.log("intersection", intersection);
  // add all intersection letters to the doubleItems Set
  intersection.forEach((letter) => {
    doubleItems.add(letter);
    // @ts-ignore works fine
    doubleItemsArray.push(letter);
  });
});

console.log("All Double Items");
console.log(doubleItems);

// go through all letters in the doubleItem set and total their values from the itemAlphabet
const sumOfPriorities = [...doubleItemsArray].reduce((acc, letter) => {
  // @ts-ignore it'll always index since input data isn't bad
  return acc + itemAlphabet[letter];
}, 0);
console.log(sumOfPriorities);

// ------ PART TWO -------
const badgeSet: string[] = [];
// go through all the groups
groups.forEach((group) => {
  // find the intersection of letters between all 3 arrays of strings in the group
  const intersection = new Set();
  group.forEach((rucksack) => {
    const letters = rucksack.split("");
    letters.forEach((letter) => {
      if (group.every((rucksack) => rucksack.includes(letter))) {
        intersection.add(letter);
      }
    });
  });
  console.log(intersection);
  // add all intersection letters to the badgeSet Set
  intersection.forEach((letter) => {
    // @ts-ignore doesnt need this
    badgeSet.push(letter);
  });
});
// add up all letter values in the badgeSet
const sumOfPriorities2 = [...badgeSet].reduce((acc, letter) => {
  // @ts-ignore it'll always index since input data isn't bad
  return acc + itemAlphabet[letter];
}, 0);
console.log(sumOfPriorities2);
