import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";


import { readDeck , readCard , updateCard } from "../utils/api";


//-------FUNTIONALITY DONE, STILL NEEDS STYLING 1/24/2024----------------



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
    }, [cardId]);
    
    
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
        };

        return (
            <>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                        <Link to="/" style={{ display: 'flex', alignItems: 'center'}}> 
                            <i className="fas fa-house" style={{ marginRight: '5px'}}></i>
                            Home 
                        </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deck.id}`}> {deck.name}   </Link>
                        </li>
                        <li className="breadcrumb-item text-secondary">    
                            Edit Card {card.id}
                        </li> 
                    </ol>
                </nav>
                
                <div>
                    <h1>Edit Card</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card border-0"> 
                    <h5 className="text-secondary mp-0 pt-2">Front</h5>
                        <div className="card border-0 pb-3">
                            <label htmlFor="front"></label>
                            <textarea
                                id="front"
                                name="front"
                                className="form-control"
                                value={card.front}
                                placeholder="Front side of card"
                                required={true}
                                onChange={handleChange}
                            />
                        </div>
                        <h5 className="text-secondary mp-0 pt-2">Back</h5>
                        <div className="card border-0 mt-0">
                            <label htmlFor="back"></label>
                            <textarea
                                id="back"
                                name="back"
                                className="form-control"
                                value={card.back}
                                placeholder="Back side of card"
                                required={true}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
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
                </form>
            </>
    )
};






export default EditCard;