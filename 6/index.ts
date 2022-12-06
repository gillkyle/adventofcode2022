// ------ PART ONE -------
// read the input.txt file
const input = Deno.readTextFileSync("./6/input.txt");

// const NUM_CHARS_IN_CODE = 4;
// PART TWO
const NUM_CHARS_IN_CODE = 14;

// go through the input which is a set of random characters in one big line and look for the first 4 consecutive characters that are all different
// keep the track of the last 4 characters and remove any older characters
const lastChars = [];
let charactersSeen = 0;
for (let i = 0; i < input.length; i++) {
  console.log("New letter ----------------");
  charactersSeen += 1;
  if (lastChars.length === NUM_CHARS_IN_CODE) {
    console.log(lastChars);
    // shift out the earliest value
    lastChars.shift();
  }
  const char = input[i];
  lastChars.push(char);
  console.log(lastChars);
  console.log(
    `Been through ${charactersSeen} characters with latest character ${char}`
  );
  console.log(new Set(lastChars));
  // check if every value in the array is different from every other value by adding them to a set and checking the length
  if (new Set(lastChars).size === NUM_CHARS_IN_CODE) {
    console.log("FOUND");
    console.log(lastChars);
    console.log(charactersSeen);
    break;
  }
}
