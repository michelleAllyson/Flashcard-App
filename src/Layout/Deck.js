import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

//utils
import { readDeck, deleteDeck } from "../utils/api";

//libraries for icons
import { TrashIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/16/solid';
import { PencilSquareIcon } from '@heroicons/react/16/solid';

const Deck = () => {
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const { deckId } = useParams(); 

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
      </div>
    </div>
  );
};

export default Deck;
