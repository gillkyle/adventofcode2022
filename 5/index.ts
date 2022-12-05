// ------ PART ONE -------
// read the input.txt file
const input = Deno.readTextFileSync("./5/input.txt");

// go through each line of the input and push 3 lines groups into an array
const instructions = input.split(`
`);

/* 
         [G]             [D,]      [Q,]    
[P]      [T]             [L,] [M,] [Z,]    
[Z] [Z,] [C]             [Z,] [G,] [W,]    
[M] [B,] [F]             [P,] [C,] [H,] [N,]
[T] [S,] [R]      ["H",] [W,] [R,] [L,] [W,]
[R] [T,] [Q] [Z,] ["R",] [S,] [Z,] [F,] [P,]
[C] [N,] [H] [R,] ["N",] [H,] [D,] [J,] [Q,]
[N] [D,] [M] [G,] ["Z",] [F,] [W,] [S,] [S,]
 1   2   3   4   5   6   7   8   9 

*/
const stacks = [
  [], // add an empty stack so that the indexes of the instructions match
  ["P", "Z", "M", "T", "R", "C", "N"].reverse(),
  ["Z", "B", "S", "T", "N", "D"].reverse(),
  ["G", "T", "C", "F", "R", "Q", "H", "M"].reverse(),
  ["Z", "R", "G"].reverse(),
  ["H", "R", "N", "Z"].reverse(),
  ["D", "L", "Z", "P", "W", "S", "H", "F"].reverse(),
  ["M", "G", "C", "R", "Z", "D", "W"].reverse(),
  ["Q", "Z", "W", "H", "L", "F", "J", "S"].reverse(),
  ["N", "W", "P", "Q", "S"].reverse(),
];

console.log(instructions);
// go through each instruction and move the stack
instructions.forEach((instruction) => {
  // split the instruction into 3 variables num, fromStack, toStack out of this template: `move ${num} from ${fromStack} to ${toStack}`
  const splitInstruction = instruction.split(" ");
  const num = parseInt(splitInstruction[1]);
  const fromStack = parseInt(splitInstruction[3]);
  const toStack = parseInt(splitInstruction[5]);

  // // pop the number of items from the fromStack one by one and store them in a temp array
  // const temp: string[] = [];
  // for (let i = 0; i < num; i++) {
  //   if (stacks[fromStack].length > 0) {
  //     const tempValue: string = stacks[fromStack].pop() as string;
  //     temp.push(tempValue);
  //   }
  // }
  // // push the items from the temp array into the toStack
  // temp.forEach((item) => stacks[toStack].push(item));

  // pull off the top num items from the fromStack and push them onto the toStack
  stacks[toStack] = [...stacks[toStack], ...stacks[fromStack].splice(-num)];
});

// get just the last item from each stack and put them in an array, then join them together:
const finalTopOrder = stacks.map((stack) => stack[stack.length - 1]).join("");
console.log(finalTopOrder);
