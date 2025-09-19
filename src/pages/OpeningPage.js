import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { NavLink } from "react-router-dom"; 
import { useSelector } from "react-redux";
import AnimatedChessboard from "../components/AnimatedChessboard"; 
import { cleanPNGMoves } from "../utils/cleanPNGMoves"; 



function OpeningPage() {
  const { id } = useParams();
  const opening = useSelector((state) =>
    state.openings.list.find((o) => o.id === parseInt(id))
  );

  const [cleanedMoves, setCleanedMoves] = useState('');
  const [error, setError] = useState('');

  // CORREZIONE APPLICATA QUI
  useEffect(() => {
    // Aggiungiamo un controllo per assicurarci che "opening" esista prima di usarlo
    if (opening) {
      try {
        const rawMoves = opening.moves;
        const finalString = cleanPNGMoves(rawMoves);
        setCleanedMoves(finalString);
        setError('');
      } catch (err) {
        console.error("Errore nella pulizia delle mosse:", err);
        setError("⚠️ Errore durante la lettura delle mosse. Controlla il formato.");
      }
    }
    // Diciamo a React di rieseguire questo effetto ogni volta che "opening" cambia
  }, [opening]); 

  if (!opening) {
    return <div>Apertura non trovata o in caricamento...</div>;
  }

  return ( 
    <>
    <div className="scacchiera"> 
      <h1>{opening.name}</h1> {/* Mostriamo anche il nome dell'apertura! */}
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cleanedMoves ? (
        <AnimatedChessboard movesString={cleanedMoves} 
        interval={1200}
        width={480} />
      ) : (
        <p>Caricamento della scacchiera...</p>
      )}
    </div> 
    <div className="returnback"> 
      <h3><NavLink to="/">Go back...</NavLink></h3>
      </div> 
    </>
  );
}

export default OpeningPage;






