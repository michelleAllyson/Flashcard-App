import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Study from "./Study";
import Deck from "./Deck";
import { listDecks , deleteDeck } from "../utils/api";
import { TrashIcon } from '@heroicons/react/24/solid';
import { EyeIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/16/solid';

//path: "/"

// "Create Deck" button should link to the Create Deck screen.
    //add a "+" icon to the button------NEEDS STYLING

// Existing decks are each shown with the deck name, the number of cards, and a "Study", "View", and "Delete" button.----NEEDS STYLING

// Clicking the "Study" button should link to the Study screen.--import Study from "./Study";

// Clicking the "View" button should link to the Deck screen. --import Deck from "./Deck";

// Clicking the "Delete" button shows a warning message before deleting the deck.----DONE 
    // You can use window.confirm() to create the modal dialog. 
       // Warning message: "Delete this deck? You will not be able to recover it."
       // Options: "Cancel" and "OK
            // If the user clicks "cancel", the deck is not deleted.
            // If the user clicks "OK", the deck is deleted and is no longer visible on the home screen.


export const Home = () => {

    const [decks, setDecks] = useState([]); 
    const history = useHistory();
    
    const handleDeleteDeck = async (deckId) => {
        const result = window.confirm(`Delete this deck with the id of ${deckId}? You will not be able to recover it.`);
        if (result) {
            await deleteDeck(deckId);
            history.go(0);
        }
    }

    useEffect(() => {
        async function loadDecks() {
            try {
                const response = await listDecks();
                setDecks(response);
            } catch (error) {
                console.log(error);
            }
        }
        loadDecks();
    }, []);

    return (
        decks.length === 0 ? <p>Loading...</p> :
        <article>
            <div>
                <Link 
                    to="/decks/new" 
                    className="btn btn-secondary btn-sm"
                >
                    <PlusIcon /> Create Deck
                </Link>
            </div>
            {decks.map((deck) => ( 
                <div className="card" key={deck.id}> 
                    <div className="card-body border">
                        <h3 className="card-title text-secondary flex-fill">{deck.name}</h3>
                        <h6 className="card-subtitle text-secondary">{deck.cards.length} cards</h6>
                        <p className="card-text flex-fill">{deck.description}</p>
                        <Link 
                            to= {`/decks/${deck.id}`} 
                            className="btn btn-secondary btn-md"
                        >
                           <EyeIcon /> View                        
                        </Link>
                        <Link 
                            to= {`/decks/${deck.id}/study`} 
                            className="btn btn-primary btn-sm"
                        >
                            <BookmarkIcon /> Study
                        </Link>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDeleteDeck(deck.id)}
                        >
                            <TrashIcon /> Delete
                        </button>
                    </div>
                </div>
            )
            )}
        </article>
    );
};





export default Home;
