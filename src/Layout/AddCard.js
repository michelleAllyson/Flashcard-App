import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { createCard , readDeck } from "../utils/api";

//path: "/decks/:deckId/cards/new"

//The Add Card screen has the following features:

// The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new).
// You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.
// There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, and finally the text Add Card (e.g., Home/React Router/Add Card).
// The screen displays the React Router: Add Card deck title.
// A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.
// If the user clicks Save, a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.
// If the user clicks Done, the user is taken to the Deck screen.

function AddCard() {
    const [deck, setDeck] = useState({});
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
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
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const newCard = {
        front: front,
        back: back,
      };
  
      // Use createCard to add a new card to the deck
      await createCard(deckId, newCard);
  
      setFront("");
      setBack("");
  
      // Reload the deck to update the card list
      loadDeck();
    };
  
    const handleDone = () => {
      history.push(`/decks/${deckId}`);
    };
    
    
    
    
    
    
    
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb"> 
                    <li className="breadcrumb-item">
                        <Link to="/"> Home </Link>
                    </li>                
                    <li>
                        <Link to={`/decks/${deck.id}`}> / {deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item">/ Add Card</li>
                </ol>
            </nav>
            <div>
                <h1>Add Card: {deck.name}</h1>
            </div>
            <form onSubmit={handleSubmit}> 
                <h6>Front</h6>
                <div>
                <label htmlFor="front"></label>
                    <textarea 
                        id="front"
                        name="front"
                        type="text"
                        placeholder="Front side of card"
                        required={true}
                        onChange={(event) => setFront(event.target.value)}
                    />    
                </div>
                <h6>Back</h6>
                <div>
                <label htmlFor="back"></label>
                    <textarea 
                        id="back"
                        name="back"
                        type="text"
                        placeholder="Back side of card"
                        required={true}
                        onChange={(event) => setBack(event.target.value)}
                    />
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={handleDone}
                        >
                            Done
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                        >
                            Save
                        </button>
                    </div>
            </form>

        </>
        
    )
}




export default AddCard; 