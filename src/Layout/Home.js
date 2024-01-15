import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Study from "./Study";
import Deck from "./Deck";
import { listDecks } from "../utils/api";

//path: "/"

// "Create Deck" button should link to the Create Deck screen.
    //add a "+" icon to the button

// Existing decks are each shown with the deck name, the number of cards, and a "Study", "View", and "Delete" button.

// Clicking the "Study" button should link to the Study screen.--import Study from "./Study";

// Clicking the "View" button should link to the Deck screen. --import Deck from "./Deck";

// Clicking the "Delete" button shows a warning message before deleting the deck.
    // You can use window.confirm() to create the modal dialog. 
       // Warning message: "Delete this deck? You will not be able to recover it."
       // Options: "Cancel" and "OK
            // If the user clicks "cancel", the deck is not deleted.
            // If the user clicks "OK", the deck is deleted and is no longer visible on the home screen.


export const Home = () => {

    const [decks, setDecks] = useState([]); 

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
        console.log("decks", decks);
    }, []);

    return (
        decks.length === 0 ? <p>Loading...</p> :
        <article>
            <div>
                {console.log("decks", decks)}
                <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
            </div>
            <div className="border p-4 h-100 d-flex flex-column"> 
                <h3 className="text-secondary flex-fill">{decks[0].name}</h3>
            </div>
        </article>
    );
};





export default Home;