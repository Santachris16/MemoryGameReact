import React, { useState, useEffect } from "react";
import GameBoard from "./assets/GameBoard";
import Controls from "./assets/Controls";
import "./App.css";

const App = () => {
  const [difficulty, setDifficulty] = useState("4x4");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    startGame();
  }, [difficulty]);

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerRunning]);

  const startGame = () => {
    resetGame();
    const newCards = createShuffledCards();
    setCards(newCards);
    setTimerRunning(true);
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMatchedCards(0);
    setMoves(0);
    setTime(0);
    setTimerRunning(false);
  };

  const createShuffledCards = () => {
    const size = difficulty.split("x").map(Number);
    const numCards = size[0] * size[1];
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").slice(0, numCards / 2);
    let newCards = [...symbols, ...symbols];
    newCards.sort(() => Math.random() - 0.5);
    return newCards;
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);

      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatchedCards(prev => prev + 2);
        setFlippedCards([]);
        if (matchedCards + 2 === cards.length) {
          setTimerRunning(false);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="game-container">
      <h1>Memory Game</h1>
      <Controls 
        difficulty={difficulty} 
        setDifficulty={setDifficulty} 
        restartGame={startGame} 
        moves={moves} 
        time={time} 
      />
      <GameBoard 
        cards={cards} 
        flippedCards={flippedCards} 
        handleCardClick={handleCardClick} 
        difficulty={difficulty} 
      />
    </div>
  );
};

export default App;
