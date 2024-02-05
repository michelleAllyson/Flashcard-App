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
      history.push("/");
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
              <Link to="/" style={{ display: 'flex', alignItems: 'center'}}> 
                <i className="fas fa-house" style={{ marginRight: '5px'}}></i>
                 Home 
              </Link>
            </li>
            <li className="breadcrumb-item text-secondary">{deck.name}</li>
          </ol>
        </nav>
        <div>
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
          <div className="card-body" style={{ display: 'flex'}}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
              <div>
                <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary btn-md" style={{ width: '75px', height: '60px', marginRight: '10px'}}>
                  <div style={{ textAlign: 'center', height: '100%'}}>
                      <i className="fa-solid fa-pencil" ></i>
                      <br />
                      Edit
                  </div>
                </Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary btn-md"style={{ width: '75px', height: '60px', marginRight: '10px'}}>
                  <div style={{ textAlign: 'center', height: '100%'}}>
                      <i className="fa-solid fa-book-bookmark" ></i> 
                      <br />
                      Study
                  </div>
                </Link>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary btn-md"style={{ width: '125px', height: '60px', marginRight: '10px'}}>
                  <div style={{ textAlign: 'center', height: '100%'}}>
                      <i className="fa-solid fa-plus" ></i> 
                      <br />
                      Add Cards
                  </div>
                </Link>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '50%'}}>
                <button
                  type="button"
                  className="btn btn-danger btn-md"
                  style={{ width: '75px', height: '60px'}}
                  onClick={() => handleDelete(deck.id)}
                >
                  <div style={{ textAlign: 'center', height: '100%'}}> 
                      <i className="fa-solid fa-trash-can" ></i>
                      <br />
                      Delete
                    </div>
                </button>
              </div>
            </div>

          </div>
        </div>
     

        <div>
        <h1>Cards</h1>
      </div>
      <div>
        {deck.cards ? (
          deck.cards.map((card) => (
            <div key={card.id} className="card-body border">
              <div className="card border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <h5 className="card-title">Card Front</h5>
                      <p className="card-text">{card.front}</p>
                    </div>
                    <div className="col-sm-6">
                      <h5 className="card-title">Card Back</h5>
                      <p className="card-text">{card.back}</p>
                    </div>
                  <div className="card-body" style={{ display: 'flex', justifyContent: 'flex-end'}}> 
                  <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary btn-md" style={{ width: '75px', height: '60px', marginRight: '10px'}}>
                    <div style={{ textAlign: 'center', height: '100%'}}>
                      <i className="fa-solid fa-pencil" ></i>
                      <br />
                      Edit
                  </div>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger btn-md"
                    style={{ width: '75px', height: '60px'}}
                    onClick={() => handleDeleteCard(card.id)}
                    >
                    <div style={{ textAlign: 'center', height: '100%'}}> 
                      <i className="fa-solid fa-trash-can" ></i>
                      <br />
                      Delete
                    </div>
                  </button>
                  </div>

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