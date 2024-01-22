import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";

import { createDeck } from "../utils/api";


//FUNTIONALITY COMPLETED--NEEDS STYLING 1/18/2024


//The Create Deck screen has the following features:
    // The path to this screen should be /decks/new. ----------***DONE***---------
    // There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck). DONE
    // A form is shown with the appropriate fields for creating a new deck.
    // The name field is an <input> field of type text. --DONE, but needs styling--
    // The description field is a <textarea> field that can be multiple lines of text. --DONE, but needs styling--
    // If the user clicks Submit, the user is taken to the Deck screen. --DONE--
    // If the user clicks Cancel, the user is taken to the Home screen. ---DONE----

function CreateDeck() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push("/decks/:deckId");

    const newDeck = {
        name: name,
        description: description,
    };

    CreateDeck(newDeck);
    
    setName("");
    setDescription("");

    event.target.reset();
};
    const handleCancel = () => {
        history.push("/"); 
    }
    
    
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"> Home  </Link>
                    </li> 
                    <li className="breadcrumb-item">/ Create Deck</li>
                </ol>
            
            </nav>
            <div>
                <h1>Create Deck</h1>
            </div>
            <form onSubmit={handleSubmit}>          
            <div>
                <h6>Name</h6>
                <div>
                <label htmlFor="name"></label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Deck Name"
                        required={true}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <h6>Description</h6>
                <div>
                <label htmlFor="description"></label>
                    <textarea 
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Brief description of the deck"
                        required={true}
                        onChange={(event) => setDescription(event.target.value)}
                        rows={3}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                    >
                        Submit
                    </button>
                </div>
            </div>
            </form>
        </>
    )
}


export default CreateDeck;