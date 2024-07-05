#! /usr/bin/env node
import inquirer from 'inquirer';

interface GameState {
  hasSword: boolean;
  monsterDefeated: boolean;
}

const gameState: GameState = {
  hasSword: false,
  monsterDefeated: false,
};

async function startGame() {
  console.log("Welcome to the Adventure Game!");

  await firstChoice();
}

async function firstChoice() {
  const answers = await inquirer.prompt({
    name: 'firstChoice',
    type: 'list',
    message: 'You are in a forest. What do you want to do?',
    choices: ['Look around', 'Move forward'],
  });

  if (answers.firstChoice === 'Look around') {
    await lookAround();
  } else {
    await moveForward();
  }
}

async function lookAround() {
  console.log("You found a sword!");

  gameState.hasSword = true;

  const answers = await inquirer.prompt({
    name: 'nextAction',
    type: 'list',
    message: 'What do you want to do next?',
    choices: ['Move forward'],
  });

  await moveForward();
}

async function moveForward() {
  const answers = await inquirer.prompt({
    name: 'encounter',
    type: 'list',
    message: 'You encounter a monster! What do you want to do?',
    choices: gameState.hasSword ? ['Fight', 'Run'] : ['Run'],
  });

  if (answers.encounter === 'Fight') {
    await fightMonster();
  } else {
    await runAway();
  }
}

async function fightMonster() {
    console.log("You fought and defeated the monster!");

    gameState.monsterDefeated = true;
  
    console.log("Congratulations, you won the game!");
  }
  
  async function runAway() {
    console.log("You ran away safely.");
  
    console.log("Game Over.");
  }
  
  startGame();
  
  