let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const startButton = document.getElementById('start');
let currentlyPlaying = true;

const randomChoreDoorGenerator= () => {let num = Math.floor(Math.random()*numClosedDoors);
if (num===0) {
  openDoor1 = botDoorPath;
  openDoor2 = beachDoorPath;
  openDoor3 = spaceDoorPath;
}
else if (num===1){
  openDoor2 = botDoorPath;
  openDoor3 = beachDoorPath;
  openDoor1 = spaceDoorPath;
}
else {
  openDoor3 = botDoorPath;
  openDoor1 = beachDoorPath;
  openDoor2 = spaceDoorPath;
}
}

const isBot = (door) => {
  if (door.src=== botDoorPath)  {
    return true;
    } 
  return false;
}


const isClicked = door => {
  if (door.src = closedDoorPath) {
    return false;
}
  return true;
}

const gameOver = (status) => {if (status === 'win')
{startButton.innerHTML = "You win! Play again?";}
else {
  startButton.innerHTML = "Game over! Play again?";
}
currentlyPlaying=false;}


const playDoor = (door) => {numClosedDoors-=1;
if (numClosedDoors == 0){
gameOver('win');
currentlyPlaying = false;
}
else if (isBot(door)) {
  gameOver('lose');
  currentlyPlaying = false;
}}


doorImage1.onclick = () => {
  if (!isClicked(doorImage1) && currentlyPlaying) {
  doorImage1.src = openDoor1;
  playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if (!isClicked(doorImage2) && currentlyPlaying) {
  doorImage2.src = openDoor2;
  playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if (!isClicked(doorImage3) && currentlyPlaying) {
  doorImage3.src = openDoor3;
  playDoor(doorImage3);
  }
}

if (currentlyPlaying) {
startButton.onclick = () =>{startRound();}
}


const startRound = () => {numClosedDoors=3;
doorImage1.src = closedDoorPath;
doorImage2.src = closedDoorPath;
doorImage3.src = closedDoorPath;
startButton.innerHTML = "Good luck!";
currentlyPlaying = true;
randomChoreDoorGenerator();
}
startRound()

