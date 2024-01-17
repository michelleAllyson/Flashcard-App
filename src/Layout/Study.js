import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import Home from "./Home";
import Deck from "./Deck";
import { listDecks , readDeck } from "../utils/api";



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


export const Study = () => {

    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const history = useHistory();

    const handleRestart = async(deckId) => {
        const result = window.confirm("Restart cards? Click 'cancel' to return to the home page.");
        if (result) {
            await readDeck(deckId);
            history.go(0);
        }
    }

    useEffect(() => {
        async function loadStudyDeck() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch (error) {
                console.log(error);
            }
        }
        loadStudyDeck();
    }, []);

    const handleFlip = () => {
        //flip the card
    }

    const handleNext = () => {
        //move to the next card
    }



    return (
       <div> 
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"> Home /  </Link>
                        <Link to={`/decks/${deck.id}`}> {deck.name} /  </Link>
                        <Link to={`/decks/${deck.id}/study`}>Study</Link>
                    </li> 
                </ol>
            </nav>
            <div> 
                {/* //title of deck */}
                <h1>Study: {deck.name}</h1>
            </div>
            <div className="card" key={deck.id}> 
                <div className="card-body border">
                    <div>
                        <p className="card-subtitle text-secondary">Card (#cards.id) of (cards.length)</p>
                        {/* //card # of #.length */}
                        <p className="card-text flex-fill">(card.front)</p>
                        {/* card contents */}
                    </div>
                    <div>
                        <button>Flip</button>
                        {/* //flip button */}
                        <button>Next</button>
                        {/* //next button */}
                    </div>       
                </div>
            </div>
       </div>
       
        )
   };



export default Study;