import { useState, useEffect } from "react";

export default function MemoryGame() {
  const [cards, setCards] = useState(generateGrid());
  const [isLock, setIsLock] = useState(false);
  const [FlippedCard, setFlippedCard] = useState([]);

  const handleClick = (index) => {
    if (cards[index].isFlipped || isLock) {
      return;
    }
    const copyCards = [...cards];
    copyCards[index].isFlipped = true;
    setCards(copyCards);
    setFlippedCard([...FlippedCard, index]);
  };

  useEffect(() => {
    if (FlippedCard.length === 2) {
      setIsLock(true);
      setTimeout(() => {
        if (cards[FlippedCard[0]].number !== cards[FlippedCard[1]].number) {
          setCards((prevCards) => {
            const copyCards = [...prevCards];
            copyCards[FlippedCard[0]].isFlipped = false;
            copyCards[FlippedCard[1]].isFlipped = false;
            return copyCards;
          });
        }
        setIsLock(false);
        setFlippedCard([]);
      }, 1000);
    }
  }, [FlippedCard]);

  return (
    <div className="grid-container">
      {cards.map(({ id, number, isFlipped }) => {
        return (
          <div className="cards" key={id} onClick={() => handleClick(id)}>
            {isFlipped ? number : "?"}
          </div>
        );
      })}
    </div>
  );
}

function generateGrid() {
  const arr = Array.from(
    {
      length: 18,
    },
    (_, index) => index + 1
  );

  const grids = [...arr, ...arr].sort(() => Math.random() - 0.5);
  const cards = grids.map((item, index) => {
    return {
      id: index,
      number: item,
      isFlipped: false,
    };
  });
  return cards;
}
