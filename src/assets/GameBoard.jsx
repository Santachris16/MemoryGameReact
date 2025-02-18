import React from "react";
import Card from "./Card";

const GameBoard = ({ cards, flippedCards, handleCardClick, difficulty }) => {
  return (
    <div className="game-board-container">
      <div className={`game-board grid-${difficulty}`}>
        {cards.map((symbol, index) => (
          <Card 
            key={index} 
            index={index} 
            symbol={symbol} 
            isFlipped={flippedCards.includes(index)} 
            handleCardClick={handleCardClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
