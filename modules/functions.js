import { numOfTurnedCards } from "./variables.js";

const checkCardsForMatch = () => {
    //check for match, keep the cards & track the score or set timer to turn them back
}

const flipCard = (e) => {
    e.stopPropagation();
    const cardContentElem = e.currentTarget.querySelector(".content");
    cardContentElem.classList.add("flipped");
    numOfTurnedCards += 1;

    if (numOfTurnedCards === 2) {
        checkCardsForMatch()
    }
};

export { flipCard,  };