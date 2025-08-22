import React, { useState, useEffect, useRef } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js"; 


const AnimatedChessboard = ({ movesString, interval = 1000, width = 400 }) => {
  const chessRef = useRef(null);
  const [position, setPosition] = useState("start");

  useEffect(() => {
    // Inizializza un'istanza di chess.js a ogni cambiamento delle mosse
    chessRef.current = new Chess();
    const movesArray = movesString.trim().split(/\s+/);
    let idx = 0;

    // Ripristina la scacchiera alla posizione iniziale
    setPosition(chessRef.current.fen());

    const timer = setInterval(() => {
      if (idx >= movesArray.length) {
        clearInterval(timer);
        return;
      }

      // Applica la mossa in SAN (e4, Nf3, ecc.)
      chessRef.current.move(movesArray[idx]);
      setPosition(chessRef.current.fen());
      idx++;
    }, interval);

    // Pulizia al dismount o a nuove props
    return () => clearInterval(timer);
  }, [movesString, interval]);

  return (
    <Chessboard
      width={width}
      position={position}
      transitionDuration={300}
      boardStyle={{
        borderRadius: "5px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
      }}
      // puoi aggiungere altre props di chessboardjsx a piacere
    />
  );
};

export default AnimatedChessboard;