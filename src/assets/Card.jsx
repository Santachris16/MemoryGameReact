import React from "react";

const Card = ({ index, symbol, isFlipped, handleCardClick }) => {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={() => handleCardClick(index)}>
      {isFlipped ? symbol : "?"}
    </div>
  );
};

export default Card;
