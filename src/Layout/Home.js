import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Study from "./Study";
import Deck from "./Deck";
import { listDecks , deleteDeck } from "../utils/api";



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
                    className="btn btn-secondary btn-lg"
                    style={{ width: '175px', height: '100%'}}
                >
                <i className="fa-solid fa-plus" ></i> Create Deck
                </Link>
            </div>
            {decks.map((deck) => ( 
                <div className="card" key={deck.id}> 
                    <div className="card-body border">
                        <h3 className="card-title text-secondary flex-fill">{deck.name}</h3>
                        <h6 className="card-subtitle text-secondary">{deck.cards.length} cards</h6>
                        <p className="card-text flex-fill">{deck.description}</p>
                        <div className="card-body" style={{ display: 'flex'}}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
                                <Link to= {`/decks/${deck.id}`} className="btn btn-secondary btn-md" style={{ width: '75px', height: '60px', marginRight: '10px'}}>
                                    <div style={{ textAlign: 'center', height: '100%'}}>
                                        <i className="fa-solid fa-eye" ></i>
                                        <br />
                                        View
                                    </div>
                                </Link>
                                <Link to= {`/decks/${deck.id}/study`} className="btn btn-primary btn-md" style={{ width: '75px', height: '60px'}}>
                                    <div style={{ textAlign: 'center', height: '100%'}}>
                                        <i className="fa-solid fa-book-bookmark" ></i> 
                                        <br />
                                        Study
                                    </div>
                                </Link>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-md" 
                                    style={{ width: '75px', height: '60px'}}
                                    onClick={() => handleDeleteDeck(deck.id)}
                                >
                                    <div style={{ textAlign: 'center', height: '100%'}}> 
                                        <i className="fa-solid fa-trash-can" ></i>
                                        <br />
                                        Delete
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            )}
        </article>
    );
};





export default Home;
