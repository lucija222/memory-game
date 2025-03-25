"use-strict";
import { stopTimer, resetTimer, addStartTimerListener } from "./modules/timer.js";

//--------------------------ELEMENTS-----------------------------
const cards = document.querySelectorAll(".card");
const resetBtn = document.querySelector("#reset-btn");
const cardImgElements = document.querySelectorAll(
    "#memory-grid .back-side img"
);

//--------------------------VARIABLES-----------------------------
let flippedCards = { firstCard: [], secondCard: [] }; //[contentElem, cardIcon]
let numOfFlippedCards = 0; //0, 1 || 2
let numOfMatches = 0;
let numOfPairs = 8;
const icons = [
    "bird", "bush",
    "cactus1", "cactus2",
    "cactus3", "deer",
    "flamingo", "fox",
    "leaf1", "leaf2",
    "leaves1", "leaves2",
    "mountain", "tree1",
    "tree2",
];


//--------------------------FUNCTIONS-----------------------------
const checkCardsForMatch = () => {
    const cardIcon1 = flippedCards.firstCard[1];
    const cardIcon2 = flippedCards.secondCard[1];
    console.log(cardIcon1, cardIcon2);

    if (cardIcon1 !== cardIcon2) {
        setTimeout(() => {
            flippedCards.firstCard[0].classList.remove("flipped");
            flippedCards.secondCard[0].classList.remove("flipped");
            numOfFlippedCards = 0;
        }, 700);

    } else {
        numOfMatches += 1;
        numOfFlippedCards = 0;

        if (numOfPairs === numOfMatches) {
            stopTimer();
            console.log("YOU WON");
        }
    }
};

const flipCard = (e) => {
    const cardContentElem = e.currentTarget.querySelector(".content");
    const cardIcon = cardContentElem.querySelector("img").alt;

    if (
        !cardContentElem.classList.contains("flipped") &&
        numOfFlippedCards < 2
    ) {
        cardContentElem.classList.add("flipped");
        flippedCards[numOfFlippedCards ? "secondCard" : "firstCard"] = [
            cardContentElem,
            cardIcon,
        ];
        numOfFlippedCards += 1;

        if (numOfFlippedCards === 2) {
            checkCardsForMatch();
        }
    }
};

const updateCardImages = (array) => {
    cardImgElements.forEach((img, index) => {
        const alt = array[index];
        img.alt = alt;
        img.src = `./icons/${alt}.svg`;
    });
};

const getRandomIconPairs = (array) => {
    const shuffledArr = shuffleArray([...array]);
    const extractedArr = shuffledArr.slice(0, numOfPairs);
    return [...extractedArr, ...extractedArr];
};

const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    return newArr;
};

const randomizeIconsAndShuffleCards = (array) => {
    const iconsArr = getRandomIconPairs(array);
    const shuffledArr = shuffleArray(iconsArr);
    updateCardImages(shuffledArr);
};

const resetGame = (e, array) => {
    e.stopPropagation();
    const cards = document.querySelectorAll(".card .content");
    let completedAnimationCount = 0;

    cards.forEach((card) => {
        resetTimer();

        if (card.classList.contains("flipped")) {
            card.addEventListener("transitionend", () => {
                completedAnimationCount++;

                if (completedAnimationCount === cards.length) {
                    randomizeIconsAndShuffleCards(array);
                    console.log("GAME RESET");
                }
            }, {once: true});

            card.classList.remove("flipped");

        } else { //If card is not flipped, count as completed animation
            completedAnimationCount++;
        }
    });

    numOfFlippedCards = 0;
    numOfMatches = 0;
};

//--------------------------EVENT LISTENERS-----------------------------
document.addEventListener("DOMContentLoaded", () => {
    randomizeIconsAndShuffleCards([...icons]);
});

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});

resetBtn.addEventListener("click", (e) => {
    resetGame(e, [...icons]);
});

addStartTimerListener();