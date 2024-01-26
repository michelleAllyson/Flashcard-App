import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import Home from "./Home";
import Deck from "./Deck";
import { listDecks , readDeck, readCard } from "../utils/api";
import AddCard from "./AddCard";



// The Study screen has the following features:
    // The path to this screen should include the deckId (i.e., /decks/:deckId/study).
    // You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
    // There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied, and finally the text Study (e.g., Home/Rendering In React/Study).
    // The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
    // Cards are shown one at a time, front-side first.
    // A button at the bottom of each card "flips" it to the other side.
    // After flipping the card, the screen shows a Next button (see the Next button section below) to continue to the next card.
    // After the final card in the deck has been shown, a message (see the Restart prompt section below) is shown offering the user the opportunity to restart the deck.
    // If the user does not restart the deck, they should return to the home screen.
    // Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck.


function Study() {

    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState([]);
    const history = useHistory();

    const handleRestart = async(deckId) => {
        const result = window.confirm("Restart cards? Click 'cancel' to return to the home page.");
        if (result) {
            await readDeck(deckId);
            history.go(0);
        }
    }

    useEffect(() => {
        async function loadDeck() {
          try {
            const response = await readDeck(deckId); 
            setDeck(response);
          } catch (error) {
            console.log(error);
          }
        }
        loadDeck();
      }, [deckId]); 
    
      useEffect(() => {
        async function loadCards() {
          try {
            const response = await readCard(cardId); 
            setCard(response.cards);
          } catch (error) {
            console.log(error);
          }
        }
        loadCards();
      }, [cardId]); 

//May need more than what is listed below, but work in progress//

    const handleFlip = () => {
        //flip the card
    }

    const handleNext = () => {
        //move to the next card
    }

    const handleAddCard = () => {
        history.push(`/decks/${deckId}/cards/new`);
    };

    // const handleNotEnoughCards = () => {}

//May need more than what is listed above, but work in progress//


    return (
       <div> 
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"> Home </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>  {deck.name} </Link>
                    </li>
                    <li className="breadcrumb-item text-secondary">
                        Study
                    </li> 
                </ol>
            </nav>
            <div> 
                {/* //title of deck */}
                <h1>Study: {deck.name}</h1>
            </div>
            {
                deck.cards && deck.cards.length > 2 ? (
                    deck.cards.map((card) => (
            <div className="card" key={card.id}> 
                <div className="card-body border">
                    <div>
                        <p className="card-subtitle text-secondary">Card {card.id} of {deck.cards.length}</p>
                        {/* //card # of #.length */}
                        <p className="card-text flex-fill">{card.front}</p>
                        {/* card contents */}
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleFlip()}
                        >
                        Flip
                        </button>
                        {/* //flip button */}
                        <button
                            type="button"
                            className="btn btn-primary btn-sm" 
                            onClick={() => handleNext(deck.id)}
                        >
                        Next
                        </button>
                        {/* //next button */}
                    </div>       
                </div>
            </div>
            ))
        ) : (
            <div>
                <h3>Not enough cards.</h3>
                {deck.cards !== undefined ? (
                    <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
                
                ) : (
                    <p>Loading...</p>
                )}
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAddCard(deck.id)}
                >
                    Add Cards
                </button>
            </div>
            )}
        </div>
    );
}

export default Study;