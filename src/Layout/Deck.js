import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

//utils
import { readDeck, deleteDeck, deleteCard, readCard } from "../utils/api";

//libraries for icons
import { TrashIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/16/solid';
import { PencilSquareIcon } from '@heroicons/react/16/solid';


//The Deck screen has the following features:
    // Each card in the deck:
        // Has an Edit button that takes the user to the Edit Card screen when clicked.
            //--takes user to Edit screen, but Card is not loaded here yet...

//ALL Deck.js requirements are met, except for the Edit button on each card---need to come back to this after EditCard.js is finished

//Still needs styling
        


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

  async function handleDeleteCard(cardId) {
    const result = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (result) {
      await deleteCard(cardId);
      history.go(0);
    }
  }

  async function handleEditCard(cardId) {
    history.push(`/decks/${deckId}/cards/${cardId}/edit`);
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
                    onClick={() => handleDeleteCard(card.id)}
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