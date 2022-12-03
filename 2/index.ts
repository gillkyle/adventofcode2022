// day 2 of advent of code 2022

// ------ PART ONE -------
// read the input.txt file
const input = Deno.readTextFileSync("./2/input.txt");

// split input into list of games, splitting on newlines
const games = input.split(`
`);

type Shapes = "Rock" | "Paper" | "Scissors";
type Outcomes = "lost" | "draw" | "won";

// define the points scored for scenarios, depending on the letter that wins:
// The total score is the sum of your scores for each round. The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won). Rock is A and X, Paper is B and Y, and Scissors is C and Z.
const pointsPerShape = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};
const lettersToShapes = {
  A: {
    shape: "Rock",
  },
  B: {
    shape: "Paper",
  },
  C: {
    shape: "Scissors",
  },
};
const lettersToOutcomes = {
  X: {
    outcome: "lost",
  },
  Y: {
    outcome: "draw",
  },
  Z: {
    outcome: "won",
  },
};
const pointsPerOutcome = {
  lost: 0,
  draw: 3,
  won: 6,
};

// play the game of rock paper scissors with the letter inputs and return the outcome for player2
function playRockPaperScissors({
  player1Shape,
  player2Shape,
}: {
  player1Shape: Shapes;
  player2Shape: Shapes;
}) {
  // get the points for each shape
  const player1Points = pointsPerShape[player1Shape];
  const player2Points = pointsPerShape[player2Shape];

  // compare the points to determine the outcome
  let outcome: "lost" | "draw" | "won";
  if (player1Points === player2Points) {
    outcome = "draw";
  } else if (
    player1Points - player2Points === 1 ||
    player1Points - player2Points === -2
  ) {
    outcome = "lost";
  } else if (
    player1Points - player2Points === -1 ||
    player1Points - player2Points === 2
  ) {
    outcome = "won";
  } else {
    throw new Error(
      `Unknown outcome for player1: ${player1Shape} and player2: ${player2Shape}`
    );
  }

  // return the outcome
  return outcome;
}

function getShapeBasedOnOutcome(outcome: Outcomes, player1Shape: Shapes) {
  let shape: Shapes;
  if (outcome === "lost") {
    if (player1Shape === "Rock") {
      shape = "Scissors";
    } else if (player1Shape === "Paper") {
      shape = "Rock";
    } else if (player1Shape === "Scissors") {
      shape = "Paper";
    } else {
      throw new Error(`Unknown shape: ${player1Shape}`);
    }
  } else if (outcome === "draw") {
    shape = player1Shape;
  } else if (outcome === "won") {
    if (player1Shape === "Rock") {
      shape = "Paper";
    } else if (player1Shape === "Paper") {
      shape = "Scissors";
    } else if (player1Shape === "Scissors") {
      shape = "Rock";
    } else {
      throw new Error(`Unknown shape: ${player1Shape}`);
    }
  } else {
    throw new Error(`Unknown outcome: ${outcome}`);
  }
  return shape;
}

let totalScore = 0;
games.forEach((game) => {
  // split each game into the 2 players
  const plays = game.split(` `);
  console.log(plays);
  // get the play from each player
  const player1 = plays[0] as "A" | "B" | "C";
  const player2 = plays[1] as "X" | "Y" | "Z";
  console.log(`Game ${game} - Player 1: ${player1} - Player 2: ${player2}`);
  //  get shapes from letters
  const player1Shape = lettersToShapes[player1].shape as Shapes;
  // ------ PART TWO -------
  const desiredOutcome = lettersToOutcomes[player2].outcome as Outcomes;
  // const player2Shape = lettersToShapes[player2].shape as Shapes;
  const player2Shape = getShapeBasedOnOutcome(desiredOutcome, player1Shape);
  console.log(`Player 1 shape: ${player1Shape}`);
  console.log(`Shape for an outcome of ${desiredOutcome} is ${player2Shape}`);

  // play the game
  const outcome = playRockPaperScissors({
    player1Shape,
    player2Shape,
  });
  console.log(`Outcome: ${outcome}`);

  // determine the points based on the outcome
  const pointsForOutcome = pointsPerOutcome[outcome];
  const pointsForShape = pointsPerShape[player2Shape];
  console.log(`Points for shape: ${pointsForShape}`);
  console.log(`Points for outcome: ${pointsForOutcome}`);
  // add points to total
  totalScore += pointsForOutcome + pointsForShape;
});

console.log(totalScore);
