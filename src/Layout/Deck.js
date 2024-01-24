import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

//utils
import { readDeck, deleteDeck, updateDeck, deleteCard, readCard } from "../utils/api";

//libraries for icons
import { TrashIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/16/solid';
import { PencilSquareIcon } from '@heroicons/react/16/solid';


//The Deck screen has the following features:
    // The path to this screen should include the deckId (i.e., /decks/:deckId). 
        //---------!!!!!DONE!!!!!!!!: EX: http://localhost:3000/decks/2
    // You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
        //---------!!!!!DONE!!!!!!!!:
    // There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).
        //---------!!!!!DONE!!!!!!!!:
    // The screen includes the deck name (e.g., "React Router") and deck description (e.g., "React Router is a collection of navigational components that compose declaratively in your application").
        //---------!!!!!DONE!!!!!!!!:

    // The screen includes Edit, Study, Add Cards, and Delete buttons. Each button takes the user to a different destination, as follows:
        // | Button Clicked | Destination |
        // | -------------- | ---------------------------------------------------------------------------------------------- |
        // | Edit | Edit Deck Screen |
        // | Study | Study screen |
        // | Add Cards | Add Card screen |
        // | Delete | Shows a warning message before deleting the deck]( See the "Delete Card Prompt" section below) |


    // Each card in the deck:
        // Is listed on the page under the "Cards" heading.
            //--DONE, but needs formatting
        // Shows a question and the answer to the question.
            //--DONE, but needs formatting
        // Has an Edit button that takes the user to the Edit Card screen when clicked.
            //--takes user to Edit screen, but Card is not loaded here yet...
        // Has a Delete button that allows that card to be deleted.
            //--Button displayed but not yet functional
        // Delete Card Prompt
        // When the user clicks the Delete button associated with a card, a warning message is shown and the user can click OK or Cancel. If the user clicks OK, the card is deleted.

        // You can use window.confirm() to create the modal dialog shown in the screenshot below



function Deck() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState([]);
  const history = useHistory();
  const { deckId, cardId } = useParams(); 

  const handleDelete = async (deckId) => {
    const result = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (result) {
      await deleteDeck(deckId);
      history.go(0);
    }
  };

  useEffect(() => {
    async function loadDeck() {
      try {
        const response = await readDeck(deckId); 
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
    }
    loadDeck();
  }, [deckId]); 

  useEffect(() => {
    async function loadCards() {
      try {
        const response = await readCard(cardId); 
        setCard(response.cards);
      } catch (error) {
        console.log(error);
      }
    }
    loadCards();
  }, [cardId]); 

  const handleCardDelete = async ({ target }) => {
    const confirm = window.confirm("Delete this card? You will not be able to recover it.");
    if (confirm) {
        deleteCard(target.value)
        .then(updateDeck(deckId))
        .then(window.location.reload());
    }
}

  return (
    <div>
      <div>
        <h1>Deck</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/"> Home / </Link>
            </li>
            <li>{deck.name}</li>
          </ol>
        </nav>
        <div>
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
          <div>
            <Link
              to={`/decks/${deck.id}/edit`}
              className="btn btn-secondary btn-sm"
            >
              <PencilSquareIcon /> Edit
            </Link>
            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary btn-sm"
            >
              <BookmarkIcon /> Study
            </Link>
            <Link
              to={`/decks/${deck.id}/cards/new`}
              className="btn btn-primary btn-sm"
            >
              <PlusIcon /> Add Cards
            </Link>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(deck.id)}
            >
              <TrashIcon /> Delete
            </button>
          </div>
        </div>
     

        <div>
        <h1>Cards</h1>
      </div>
      <div>
        {deck.cards ? (
          deck.cards.map((card) => (
            <div key={card.id} className="col-sm-6 mb-3 mb-sm-0">
              <div className="card border-0">
                <div className="card-body">
                  <div className="row border">
                    <div className="col-sm-6">
                      <h5 className="card-title">Card Front</h5>
                      <p className="card-text">{card.front}</p>
                    </div>
                    <div className="col-sm-6">
                      <h5 className="card-title">Card Back</h5>
                      <p className="card-text">{card.back}</p>
                    </div>
                  <Link
                    to={`/decks/${deck.id}/cards/${card.id}/edit`}
                    className="btn btn-secondary btn-sm"
                    >
                    <PencilSquareIcon /> Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCardDelete(card.id)}
                    >
                    <TrashIcon /> Delete
                  </button>
                    </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>
</div>
</div>
);
}
export default Deck;