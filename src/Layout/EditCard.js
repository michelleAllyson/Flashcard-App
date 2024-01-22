import React from "react";


import { readDeck , readCard } from "../utils/api";

//path: "/decks/:deckId/cards/:cardId/edit"
//The Edit Card screen has the following features:

// The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).
// You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited. Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.
// There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).
// It displays the same form as the Add Card screen, except it is prefilled with information for the existing card. It can be edited and updated.
// If the user clicks on either Save or Cancel, the user is taken to the Deck screen.

export const EditCard = () => {
    return (
        <div>
            <h1>Edit Card</h1>
        </div>
    )
}






export default EditCard;