"use-strict";
import { flipCard, randomizeIconsAndShuffleCards, resetGame } from "./modules/functions.js";

// const memoryGrid = document.querySelector("#memory-grid");
const cards = document.querySelectorAll(".card");
const resetBtn = document.querySelector("#reset-btn");

// const icons = ["bird", "bush", "cactus1", "deer", "fox", "leaf1", "leaves1", "tree1"];
let numOfPairs = 8;
const icons = ["bird", "bush", "cactus1", "cactus2", "cactus3", "deer", "flamingo", "fox", "leaf1", "leaf2", "leaves1", "leaves2", "mountain", "tree1", "tree2"];

document.addEventListener("DOMContentLoaded", () => {
    randomizeIconsAndShuffleCards(icons, numOfPairs);
});

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
}); 

resetBtn.addEventListener("click", (e) => {
    resetGame(e, icons, numOfPairs);
});