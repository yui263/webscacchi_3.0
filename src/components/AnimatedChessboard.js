import React, { useState, useEffect, useRef } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

const AnimatedChessboard = ({ movesString, interval = 1000, width = 400 }) => {
  const chessRef = useRef(null);
  const [position, setPosition] = useState("start");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    chessRef.current = new Chess();
    setErrorMessage("");
    const movesArray = movesString.trim().split(/\s+/);
    let idx = 0;
    setPosition(chessRef.current.fen());

    const timer = setInterval(() => {
      if (idx >= movesArray.length) {
        clearInterval(timer);
        return;
      }
      const move = movesArray[idx];

      try {
        const result = chessRef.current.move(move);
        if (result) {
          setPosition(chessRef.current.fen());
        }
      } catch (e) {
        // La mossa non è valida e ha causato un'eccezione
        console.error(`❌ Errore nella mossa "${move}":`, e);
        setErrorMessage(`⚠️ Mossa non valida: "${move}" alla posizione ${idx + 1}`);
        clearInterval(timer); // Ferma l'animazione immediatamente
      } finally {
        idx++; // Incrementa l'indice in ogni caso per evitare loop
      }
    }, interval);

    return () => clearInterval(timer);
  }, [movesString, interval]);

  return (
    <div>
      <Chessboard
        width={width}
        position={position}
        transitionDuration={300}
        boardStyle={{
          borderRadius: "5px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        }}
      />
      {errorMessage && (
        <div style={{ color: "red", marginTop: "1rem", fontWeight: "bold" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default AnimatedChessboard;


