import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { createCard , readDeck } from "../utils/api";

import CardForm from "./CardForm";


function AddCard() {
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({
        front: "",
        back: "",
    });
    const history = useHistory();
    const { deckId } = useParams();
  
    
    
    const loadDeck = async () => {
        try {
            const response = await readDeck(deckId);
            setDeck(response);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        loadDeck();
    }, [deckId]);
    
    
    const handleChange = (event) => {
        setCard({
            ...card,
            [event.target.name]: event.target.value,
        });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
      const newCard = {
        front: card.front,
        back: card.back,
      };
  
      await createCard(deckId, newCard);
  
        setCard({
            front: "",
            back: "",
        });
  
      event.target.reset();
    };
  
    const handleDone = () => {
      history.push(`/decks/${deckId}`);
    };
    
    
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb"> 
                    <li className="breadcrumb-item">
                        <Link to="/" style={{ display: 'flex', alignItems: 'center'}}> 
                            <i className="fas fa-house" style={{ marginRight: '5px'}}></i>
                            Home 
                        </Link>
                    </li>                
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}> {deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item text-secondary">Add Card</li>
                </ol>
            </nav>
            <div>
                <h1>{deck.name}: Add Card</h1>
            </div>
            {/* Replaced separate form component with CardForm.js to be used for AddCard and EditCard* 
                See previous commits for AddCard form */}
            <CardForm 
                card={card}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleQuit={handleDone}
                isNew={true}
            />
        </>
    )
}


export default AddCard; 