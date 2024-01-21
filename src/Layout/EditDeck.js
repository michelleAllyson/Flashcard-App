import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { readDeck } from "../utils/api";

//path: "/decks/:deckId/edit"
//The Edit Deck screen has the following features:

// The path to this screen should include the deckId (i.e., /decks/:deckId/edit). ---DONE---    
// You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
// There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck). ---DONE---
// It displays the same form as the Create Deck screen, except it is prefilled with information for the existing deck. --DONE--
// The user can edit and update the form.
// If the user clicks Cancel, the user is taken to the Deck screen.



function EditDeck() {

    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push(`/decks/${deckId}`);

        const editedDeck = {
            name: name,
            description: description,
        };

        readDeck(deckId, editedDeck);

            setName("");
            setDescription("");               
        };

            const handleCancel = async() => {
                const result = window.confirm("Cancel? You will lose any changes.");
                if (result) {
                    history.push(`/decks/${deckId}`);
                }
            };

            useEffect(() => {
                async function loadEditDeck() {
                    try {
                        const response = await readDeck(deckId);
                        setDeck(response);
                    } catch (error) {
                        console.log(error);
                    }
                }
                loadEditDeck();
            }, [deckId]);
            
     

            return (
                <>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/"> Home </Link>
                                <Link to={`/decks/${deck.id}`}> / {deck.name} </Link>
                                / Edit Deck
                            </li>
                        </ol>
                    </nav>
                    <div>
                        <h1>Edit Deck</h1>
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
                                    placeholder={deck.name}
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
                                    placeholder={deck.description}
                                    required={true}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary btn-sm">
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            );
        }

        export default EditDeck;

