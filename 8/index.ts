// ------ PART ONE -------
// read the input.txt file
const input = Deno.readTextFileSync("./8/input.txt");

// the input is a square grid of numbers, read it in and turn it into a 2D array
const grid = input
  .split(
    `
`
  )
  .map((row) => row.split("").map((n) => parseInt(n, 10)));

console.log(grid);

// check if a number is visible from its position in the grid
function checkIsVisible(grid: number[][], x: number, y: number) {
  // a number is visible if it is in the first row, last row, first column, or last column
  if (x === 0 || x === grid.length - 1 || y === 0 || y === grid.length - 1) {
    return true;
  }
  // a number is visible if it is greater than all numbers to the left, right, above, or below it
  const left = grid[x].slice(0, y);
  const right = grid[x].slice(y + 1);
  const above = grid.slice(0, x).map((row) => row[y]);
  const below = grid.slice(x + 1).map((row) => row[y]);
  // console.log(`Considering X: ${x}, Y: ${y} which is ${grid[x][y]}`);
  // console.log(left);
  // console.log(right);
  // console.log(above);
  // console.log(below);
  // if any of the directions have all numbers less than the current number, it is visible
  if (
    left.every((n) => n < grid[x][y]) ||
    right.every((n) => n < grid[x][y]) ||
    above.every((n) => n < grid[x][y]) ||
    below.every((n) => n < grid[x][y])
  ) {
    return true;
  } else {
    return false;
  }
}

// count how many numbers can be seen from the point of view of each number in the grid
function calculateScenicScore(grid: number[][], x: number, y: number) {
  // a number is visible if it is in the first row, last row, first column, or last column
  if (x === 0 || x === grid.length - 1 || y === 0 || y === grid.length - 1) {
    return 0;
  }
  const left = grid[x].slice(0, y).reverse();
  const right = grid[x].slice(y + 1);
  const above = grid
    .slice(0, x)
    .map((row) => row[y])
    .reverse();
  const below = grid.slice(x + 1).map((row) => row[y]);
  // console.log(grid);
  // console.log(`Calculating X: ${x}, Y: ${y} which is ${grid[x][y]}`);
  let visibleToTheLeft = 0;
  let visibleToTheRight = 0;
  let visibleAbove = 0;
  let visibleBelow = 0;
  for (let i = 0; i < left.length; i++) {
    if (left[i] < grid[x][y]) {
      visibleToTheLeft += 1;
    } else {
      // bail out of the loop if we find a number that is greater than the current number
      visibleToTheLeft += 1;
      break;
    }
  }
  for (let i = 0; i < right.length; i++) {
    if (right[i] < grid[x][y]) {
      visibleToTheRight += 1;
    } else {
      // bail out of the loop if we find a number that is greater than the current number
      visibleToTheRight += 1;
      break;
    }
  }
  for (let i = 0; i < above.length; i++) {
    if (above[i] < grid[x][y]) {
      visibleAbove += 1;
    } else {
      // bail out of the loop if we find a number that is greater than the current number
      visibleAbove += 1;
      break;
    }
  }
  for (let i = 0; i < below.length; i++) {
    if (below[i] < grid[x][y]) {
      visibleBelow += 1;
    } else {
      // bail out of the loop if we find a number that is greater than the current number
      visibleBelow += 1;
      break;
    }
  }

  // console.log(`visibleToTheLeft: ${visibleToTheLeft} from ${left}`);
  // console.log(`visibleToTheRight: ${visibleToTheRight} from ${right}`);
  // console.log(`visibleAbove: ${visibleAbove} from ${above}`);
  // console.log(`visibleBelow: ${visibleBelow} from ${below}`);
  // console.log([
  //   visibleToTheLeft,
  //   visibleToTheRight,
  //   visibleAbove,
  //   visibleBelow,
  // ]);
  const scenicScore =
    visibleToTheLeft * visibleToTheRight * visibleAbove * visibleBelow;
  // console.log("scenicScore is " + scenicScore);
  // console.log("--------------");
  return scenicScore;
}

// go through each number in the grid and check if it is visible
let visibleCount = 0;
grid.forEach((row, x) => {
  row.forEach((number, y) => {
    if (checkIsVisible(grid, x, y)) {
      visibleCount += 1;
    }
  });
});
// console.log(visibleCount);
let maxScenicScore = 0;
// find the highest scenic score from the entire grid
grid.forEach((row, x) => {
  row.forEach((number, y) => {
    const scenicScore = calculateScenicScore(grid, x, y);
    if (scenicScore > maxScenicScore) {
      maxScenicScore = scenicScore;
    }
  });
});
console.log(maxScenicScore);
