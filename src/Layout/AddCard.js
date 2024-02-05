import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { createCard , readDeck } from "../utils/api";


//----FUNCTIONALITY FINISHED (I THINK), STILL NEEDS STYLING 1/21/2024----------------

//path: "/decks/:deckId/cards/new"


//TO DO: Clear form when "save" is clicked---DONE with event.target.reset() in handleSubmit
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
  
      await createCard(deckId, newCard);
  
      setFront("");
      setBack("");
  
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
            <form onSubmit={handleSubmit}> 
                <div className="card border-0">
                    <h5 className="text-secondary mp-0 pt-2">Front</h5>
                    <div className="card border-0 pb-3">
                    <label htmlFor="front"></label>
                        <textarea 
                            id="front"
                            name="front"
                            type="text"
                            className="form-control"
                            placeholder="Front side of card"
                            required={true}
                            onChange={(event) => setFront(event.target.value)}
                        />    
                    </div>
                    <h5 className="text-secondary mp-0 pt-2">Back</h5>
                    <div className="card border-0 mt-0">
                    <label htmlFor="back"></label>
                        <textarea 
                            id="back"
                            name="back"
                            type="text"
                            className="form-control"
                            placeholder="Back side of card"
                            required={true}
                            onChange={(event) => setBack(event.target.value)}
                        />
                        </div>
                </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm px-3 py-2 mt-3 mr-2"
                            onClick={handleDone}
                        >
                            Done
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm px-3 py-2 mt-3"
                        >
                            Save
                        </button>
                    </div>
            </form>

        </>
        
    )
}




export default AddCard; 