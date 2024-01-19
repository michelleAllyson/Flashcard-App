import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";



import Home from "./Home";
import { readDeck , deleteDeck } from "../utils/api";

//path: "/decks/:deckId"

const Deck = () => {


const [deck, setDeck] = useState([]);
const history = useHistory();

const handleDelete = async (deckId) => {
    const result = window.confirm("Delete this deck? You will not be able to recover it.");
    if (result) {
        await deleteDeck(deckId);
        history.go(0);
    }   
}

    useEffect(() => {
        async function loadDeck() {
            try {
                const response = await readDeck();
                setDeck(response);
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
    }, []);

//need to map over decks--see Home.js for example

    return (
        <>
            <div>
                <h1>Deck</h1>
            </div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"> Home / </Link>
                    </li>
                    {/* <li>{Deck.id}</li> */}
                </ol>
            </nav>
        </>
    );
}

export default Deck;