import { flipCard } from "./modules/functions.js";

const memoryGrid = document.querySelector("#memory-grid");
const cards = document.querySelectorAll(".card");
const resetBtn = document.querySelector("#reset-btn");


cards.forEach((card) => {
    card.addEventListener("click", flipCard);
}); 
