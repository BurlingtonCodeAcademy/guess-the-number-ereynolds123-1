//Readline boiler plate code, allows for asynchronous programming
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}


//Function that gives random number in a range
function randomNum(min, max) {
  let computerGuess = Math.floor((max + min) / 2);
  return computerGuess;
}

//Function that allows you to play again
async function playAgain() {
    let playAgain = await ask(
    "Would you like to play again? yes (y) or no (n)"
  );
  if (
    playAgain.toLowerCase() === "yes" ||
    playAgain.toLowerCase() === "y"
  ) {
    whichGame();
  } else {
    console.log("Thanks for playing! Goodbye");
    process.exit();
  } 
}

whichGame();

//Function asks player whether they want to pick the number and the computer guesses or have the computer pick they number and they guess
async function whichGame() {
  let game = await ask(
    "Would you like pick the number or would you like the computer to start? Type 'player' or 'computer'? \n"
  );
  if (game.toLowerCase() === "player") {
    playerStart();
  } else if (game.toLowerCase() === "computer") {
    computerGameStart();
  } else {
    console.log("I did not recognize your input!");
    whichGame();
  }
}

//Asynchronous function to start the game
async function playerStart() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  // Variable Declarations
  //Input for minimum
  let min = await ask(
    "What is the minimum number you want for the range of game?"
  );

  //Sanitizes min so that the min must be a positive integer
  while (Number.isInteger(parseInt(min)) !== true || parseInt(min) <= 0) {
    console.log("Please enter a positive integer");
    min = await ask(
      "What is the minimum number you want for the range of game?"
    );
  }
  min = +min; //Coerces input to number

  //Input for maximum number
  let max = await ask(
    "What is the maximum number you want for the range of the game?"
  );

  //Sanitizes max
  while (Number.isInteger(parseInt(max)) !== true ) {
    console.log(
      "Please enter a positive integer greater than your minimum number"
    );
    max = await ask(
      "What is the maximum number you want for the range of game?"
    );
  }
  max = +max;

  let randomInteger = randomNum(min, max);
  let computerTurns = 0;
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );

  //Sanitizes the secretNumber so that the only input allowed is a

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

  //If the guess is correct and they aren't cheating, gives victory message and asks to play again
  if (input.toLowerCase() === "yes" || input.toLowerCase() === "y"  && (randomInteger)!==parseInt(secretNumber)) {
    console.log("You cheated!");
    playAgain();

  } else if (input.toLowerCase() === "yes" || input.toLowerCase() === "y" && (randomInteger)==parseInt(secretNumber)) {
    console.log("Congratulations! You won on the first try. ");
    playAgain();

  } else {
    //While the answer is not yes: make a guess, print guess to console, increment computerTurns
    while (input.toLowerCase() !== "yes" || input.toLowerCase() !== "y") {
      let higherLower = await ask(
        "Is the number higher (type 'H') or lower (type 'L') or correct (type 'C')?\n"
      );
      if (
        higherLower.toLowerCase() === "higher" ||
        higherLower.toLowerCase() === "h"
      ) {
        min = randomInteger+1; 
        
        //Detects cheating
        if (max < min) {
          console.log("You are a cheater");
        } else {
          randomInteger = randomNum(min, max);
          console.log("The computer guessed: " + randomInteger);
          computerTurns++;
        }
      } else if (
        higherLower.toLowerCase() === "lower" ||
        higherLower.toLowerCase() === "l"
      ) {
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
      } else if (
        higherLower.toLowerCase() === "correct" ||
        higherLower.toLowerCase() === "c"
      ) {
        console.log("Congratulations! You have won in " + computerTurns + " turns.")
        playAgain();
          
      }
    }
  }
}

//Computer Guessing Game logic

async function computerGameStart() {
  //Function that gives random number in a range
  let computerNumber = Math.round(Math.random() * 100);
  let humanAnswer = await ask(
    "Hello human! I am thinking of a number 1-100. Can you guess my number?\n "
  );
  humanAnswer = +humanAnswer;

  //If answer is correct, victory message. Otherwise asks until you are correct.
  if (humanAnswer === computerNumber) {
    console.log("Congratulations! You won! On the first try!");
    playAgain();
  } else {
    while (humanAnswer !== computerNumber) {
      if (parseInt(humanAnswer) > computerNumber) {
        console.log("That is incorrect human! My number is lower");
      } else if (parseInt(humanAnswer) < computerNumber) {
        console.log("That is incorrect human! My number is higher!");
      } else if (parseInt(humanAnswer) === computerNumber) {
        console.log("Congratulations! You won!");
      playAgain();
 
      }
      //Updates the variable and re-accepts input
      humanAnswer = await ask("Guess again human!");
    }
  }
}


