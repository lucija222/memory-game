let flippedCards = { firstCard: [], secondCard: [] }; //[contentElem, cardIcon]
let numOfFlippedCards = 0; //0, 1 || 2
let numOfMatches = 0;
const cardImgElements = document.querySelectorAll(
    "#memory-grid .back-side img"
);

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
            console.log("YOU WON");
        }
    }
};

const flipCard = (e) => {
    e.stopPropagation();
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

const getRandomIconPairs = (array, numOfPairs) => {
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

const randomizeIconsAndShuffleCards = (array, numOfPairs) => {
    const iconsArr = getRandomIconPairs(array, numOfPairs);
    const shuffledArr = shuffleArray(iconsArr);
    updateCardImages(shuffledArr);
};

const resetGame = (e, array, numOfPairs) => {
    e.stopPropagation();
    const cards = document.querySelectorAll(".card .content");

    cards.forEach((card) => {
        if (card.classList.contains("flipped")) {
            card.classList.remove("flipped");
        }
    });

    numOfFlippedCards = 0;
    numOfMatches = 0;
    randomizeIconsAndShuffleCards(array, numOfPairs);
    console.log("GAME RESET");
};

export { flipCard, resetGame, randomizeIconsAndShuffleCards };
