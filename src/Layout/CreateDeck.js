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
        // history.push("/decks/:deckId");
    
    const newDeck = {
        name: name,
        description: description,
    };
    
    createDeck(newDeck);
    
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
                        <Link to="/" style={{ display: 'flex', alignItems: 'center'}}> 
                            <i className="fas fa-house" style={{ marginRight: '5px'}}></i>
                            Home 
                        </Link>
                    </li> 
                    <li className="breadcrumb-item text-secondary">Create Deck</li>
                </ol>
            
            </nav>
            <div>
                <h1>Create Deck</h1>
            </div>
            <form onSubmit={handleSubmit}>          
            <div className="card border-0">
            <h3 className="text-secondary mb-0 pt-2">Name</h3>
                <div className="card border-0 pb-3">
                <label htmlFor="name"></label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control text-secondary"
                        placeholder="Deck Name"
                        required={true}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <h3 className="text-secondary mb-0 pt-2">Description</h3>
                <div className="card border-0 mt-0">
                <label htmlFor="description"></label>
                    <textarea 
                        id="description"
                        name="description"
                        type="text"
                        className="form-control text-secondary"
                        placeholder="Brief description of the deck"
                        required={true}
                        onChange={(event) => setDescription(event.target.value)}
                        rows={3}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm px-3 py-2 mt-3 mr-2"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm px-3 py-2 mt-3"
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