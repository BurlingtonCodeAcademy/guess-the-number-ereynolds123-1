//Readline boiler plate code, allows for asynchronous programming
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//Variable declarations 
//let randomInteger= randomInt(100);
let min= 1;
let max= 100;
let randomInteger= randomNum(min, max);



//Function starts the game
start();

//Function that gives random number in a range
function randomNum(min, max) {
  let computerGuess= Math.floor(Math.random() * (max - min + 1) + min);
  return computerGuess;
}

//Asynchronous function to start the game
async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  console.log("The computer guessed: "+ randomInteger);
  let input = await ask ("Is that your secret number? Type yes (y) or no (n).\n")
  
//loop here

  //If input is secret number, displays victory message and exits. If not, awaits second guess. If nonesense input, asks again. 
  if (input==="yes"||input==="y"){
    //Displays victory message
    console.log("Congratulations! The computer won!");
    process.exit()
  }else if (input==="no"|| input==="n" ){
  /*let higherLower= or loop*/  ask ("Is the number higher (type 'H') or lower (type 'L')?")
  }
  else{
    console.log ("Type yes or no!");
  }

  process.exit();
}

/*let higherLower= await ask ("Is ")
  if (higherLower==="h"){
  min=randomInteger;
} else if(higherLower==="l){
  max=randomInteger*/


/*while (input !=="y"|| input !=="yes"){
  make a guess
  ask if the guess is correct
  if not ask higher or lower*/