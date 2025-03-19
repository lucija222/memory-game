"use-strict";
import { flipCard, resetGame } from "./modules/functions.js";

const memoryGrid = document.querySelector("#memory-grid");
const cards = document.querySelectorAll(".card");
// const cardsContent = document.querySelectorAll(".card .content");
const resetBtn = document.querySelector("#reset-btn");


cards.forEach((card) => {
    card.addEventListener("click", flipCard);
}); 

resetBtn.addEventListener("click", resetGame);