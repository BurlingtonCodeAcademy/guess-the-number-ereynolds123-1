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
  let computerGuess = Math.floor((max + min) / 2);
  return computerGuess;
}

//Asynchronous function to start the game
async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  //User inputs a min and max range
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
  console.log("You entered: " + secretNumber);
  console.log("The computer guessed: " + randomInteger);
  let input = await ask(
    "Is that your secret number? Type yes (y) or no (n).\n"
  );

  //While the answer is not yes: make a guess, print guess to console, increment computerTurns
  while (input !== "yes" || input !== "y") {
    let higherLower = await ask(
      "Is the number higher (type 'H') or lower (type 'L') or correct (type 'C')?"
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
    }
  }

  process.exit();
}
