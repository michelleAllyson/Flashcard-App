import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { readDeck, updateDeck } from "../utils/api";

//path: "/decks/:deckId/edit"


//---------FUNCTIONALITY FINISHED (I THINK), STILL NEEDS STYLING 1/21/2024----------------

//The Edit Deck screen has the following features:

// The path to this screen should include the deckId (i.e., /decks/:deckId/edit). ---DONE---    
// You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
// There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck). ---DONE---
// It displays the same form as the Create Deck screen, except it is prefilled with information for the existing deck. --DONE--
// The user can edit and update the form.
// If the user clicks Cancel, the user is taken to the Deck screen.



function EditDeck() {

    const { deckId } = useParams();
    const history = useHistory();
    
    const initialDeckState = {
        id: "",
        name: "",
        description: "",
    };

    const [deck, setDeck] = useState([]);
    

    useEffect(() => {
        async function loadDeckToEdit               () {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        loadDeckToEdit();
    }, []);
        
    
    async function handleChange({target}) {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    }
    
    
    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateDeck({ ...deck }, abortController.signal);
        history.push(`/decks/${deckId}`);
        return response;
    };
    
    const handleCancel = (event) => {
        event.preventDefault();
        const result = window.confirm("Cancel? You will lose any changes.");
        if (result) {
            history.push(`/decks/${deckId}`);
        }
    };
    
    
    
    
    

            return (
                <>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/"> 
                                    <i className="fas fa-house"></i>
                                     Home 
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to={`/decks/${deck.id}`}> {deck.name} </Link>
                            </li>
                            <li className="breadcrumb-item text-secondary">
                                Edit Deck
                            </li>
                        </ol>
                    </nav>
                    <div>
                        <h1>Edit Deck</h1>
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
                                    onChange={handleChange}
                                    value={deck.name}
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
                                    rows={3}
                                    onChange={handleChange}
                                    value={deck.description}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm px-3 py-2 mt-3 mr-2"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary btn-sm px-3 py-2 mt-3">
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            );
        }

        export default EditDeck;

