import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";


import { readDeck , readCard , updateCard } from "../utils/api";


//AT A STOPPING POINT--need to update the Deck.js file to show cards, then come back to this file to finish the edit card functionality


//path: "/decks/:deckId/cards/:cardId/edit"
//The Edit Card screen has the following features:
    // The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).
    // You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited. Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.
    // There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).
    // It displays the same form as the Add Card screen, except it is prefilled with information for the existing card. It can be edited and updated.
    // If the user clicks on either Save or Cancel, the user is taken to the Deck screen.


function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    
    
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

    const initialCardState = {
        id: "",
        front: "",
        back: "",
    };

    const [card, setCard] = useState([]);

    useEffect(() => {
        async function loadCardToEdit () {
            const abortController = new AbortController();
            try {
                const response = await readCard(cardId, abortController.signal);
                setCard(response);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        loadCardToEdit();
    }, []);
    
    
    async function handleChange({target}) {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await updateCard({ ...card });
        history.push(`/decks/${deckId}`);
        return response;
    }

    const handleCancel = (event) => {
        event.preventDefault();
        const result = window.confirm("Cancel? You will lose any changes.");
            history.push(`/decks/${deckId}`);
        }
        
//AT A STOPPING POINT--need to update the Deck.js file to show cards, then come back to this file to finish the edit card functionality        
        
        return (
            <>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/"> Home /  </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deck.id}`}> {deck.name} /  </Link>
                        </li>
                        <li className="breadcrumb-item">    
                            <Link to={`/decks/${deck.id}/edit`}>Edit Card {card.length}</Link>
                        </li> 
                    </ol>
                </nav>
                
                <div>
                    <h1>Edit Card</h1>
                </div>
            </>
    )
};






export default EditCard;