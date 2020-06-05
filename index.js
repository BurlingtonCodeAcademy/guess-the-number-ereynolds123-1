//Readline boiler plate code, allows for asynchronous programming
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//Function starts the game
start();

//Function that gives random number in a range
function randomNum(min, max) {
  let computerGuess = Math.floor((max + min) / 2 + 1);
  return computerGuess;
}

//Asynchronous function to start the game
async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  //User inputs a min and max range
  //Variable Declarations
  let min = await ask(
    "What is the minimum number you want for the range of game?"
  );
  min = +min;

  let max = await ask(
    "What is the maximum number you want for the range of the game?"
  );
  max = +max;

  let randomInteger = randomNum(min, max);
  let computerTurns = 0;

  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );

  //A loop to sanitizes to an integer

  while (
    Number.isInteger(parseInt(secretNumber)) !== true ||
    parseInt(secretNumber) <= 0
  ) {
    console.log("Please enter a positive integer");
    secretNumber = await ask(
      "What is your secret number?\nI won't peek, I promise...\n"
    );
  }

  //Getting the human number input
  console.log("The computer guessed: " + randomInteger);
  let input = await ask(
    "Is that your secret number? Type yes (y) or no (n).\n"
  );

  //If the guess is correct, gives victory message.
  if (input === "yes" || input === "y") {
    console.log("Congratulations! You won! On the first try!");
  } else {
    //While the answer is not yes: make a guess, print guess to console, increment computerTurns
    while (input !== "yes" || input !== "y") {
      let higherLower = await ask(
        "Is the number higher (type 'H') or lower (type 'L') or correct (type 'C')?\n"
      );
      if (higherLower === "higher" || higherLower === "H") {
        min = randomInteger;

        //Detects cheating
        if (max <= min) {
          console.log("You are a cheater");
        } else {
          randomInteger = randomNum(min, max);
          console.log("The computer guessed: " + randomInteger);
          computerTurns++;
        }
      } else if (higherLower === "lower" || higherLower === "L") {
        max = randomInteger;

        //Detects cheating
        if (min >= max) {
          console.log("You are a cheater");
          process.exit();
        } else {
          randomInteger = randomNum(min, max);
          console.log("The computer guessed: " + randomInteger);
          computerTurns++;
        }
      } else if (higherLower === "correct" || higherLower === "C") {
        console.log(
          "Congratulations! You have won in " + computerTurns + " turns."
        );
        process.exit();
      }
    }
  }

  process.exit();
}

//Bugs

//Sanitize min/max
//Sanitize the inputs of higher/lower/correct

