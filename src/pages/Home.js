import React, { useState } from "react"; 
import OpeningCard from "../components/OpeningCard";  
import { useSelector } from "react-redux"; 
import { useDispatch } from "react-redux";
import { addOpening } from "../features/openings/OpeningSlice"; 




function Home() { 
    const openings = useSelector((state) => state.openings.list); 
    const dispatch = useDispatch(); 
    
    
    const [formData, setFormData] = useState({
        name: "",
        moves: "",
        description: ""
      }); 

      const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.moves) return alert("Nome e mosse obbligatorie");
        dispatch(addOpening(formData));
        setFormData({ name: "", moves: "", description: "" });
      }; 


      
    
    return(
        <>
        <div className="intro">
            <h1>Benvenuti nella Pagina WebScacchi3.0! </h1> 
            <h2>Qui potrai provare le tue aperture in modo da allenarti per le tue prossime partite su Chess.com !! </h2> 
            <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
  <h3>Aggiungi una nuova apertura:</h3>
  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Nome apertura"
    required
    style={{ marginRight: "1rem" }}
  />
  <input
    type="text"
    name="moves"
    value={formData.moves}
    onChange={handleChange}
    placeholder="Mosse (es: 1.e4 e5 2.Nf3 Nc6)"
    required
    style={{ marginRight: "1rem" }}
  />
  <input
    type="text"
    name="description"
    value={formData.description}
    onChange={handleChange}
    placeholder="Descrizione (opzionale)"
    style={{ marginRight: "1rem" }}
  />
  <button type="submit">Aggiungi</button>
</form> 
            <div className="grid">
                {openings.map((opening) => ( 
                    <OpeningCard key={opening.id} opening={opening} />
                ))}
            </div>
        </div>
        <div className="outro">
          <h2>Created with React by Alessio Bove - August 22, 2025 </h2>
        </div>
        </>
    ); 
}

export default Home; 
 

