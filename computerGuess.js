//Readline boiler plate code, allows for asynchronous programming
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//Function that gives random number in a range
let computerNumber = Math.round(Math.random() * 100);


//Begins the game
computerGameStart();

//Function accepts input for human guess and checks if correct. 
async function computerGameStart() {
  let humanAnswer = await ask(
    "Hello human! I am thinking of a number 1-100. Can you guess my number?\n "
  );
  humanAnswer = +humanAnswer;

  //If answer is correct, victory message. Otherwise asks until you are correct. 
  if (humanAnswer === computerNumber) {
    console.log("Congratulations! You won! On the first try!");
  } else {
    while (humanAnswer !== computerNumber) {
      if (parseInt(humanAnswer) > computerNumber) {
        console.log("That is incorrect human! My number is lower");
      } else if (parseInt(humanAnswer) < computerNumber) {
        console.log("That is incorrect human! My number is higher!");
      }else if (parseInt(humanAnswer)===computerNumber){
          console.log("Congratulations! You won!")
          process.exit();
      }
      //Updates the variable and re-accepts input
      humanAnswer = await ask("Guess again human!");
    }
  } process.exit();
} 
