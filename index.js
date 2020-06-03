//Readline boiler plate code, allows for asynchronous programmin
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//Variable declarations 
let randomInteger= randomInt(100);


//Function starts the game
start();

//Computer randomly generats an integer between 1-100. Stores variable
 function randomInt(max){
  let computerGuess= Math.floor(Math.random()*Math.floor(max));
  return computerGuess;
}

//Asynchronous function to start the game
async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  console.log("The computer guessed: "+ randomInteger);
  let input= await ask ("Is that your secret number? Type yes or no.")
  
  //If input is secret number, displays victory message and exits. If not, awaits second guess. If nonesense input, asks again. 
  if (input==="yes"){
    console.log("Congratulations! You won!");
    process.exit()
  }/*else if (input==="no"){
    ask ("Is the number higher (type 'H') or lower (type 'L')?")
  }*/ //This code isn't working
  else{
    console.log ("Type yes or no!");
  }

  process.exit();
}
