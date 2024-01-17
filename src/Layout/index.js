import React from "react";
import { Route, Switch } from "react-router-dom";


import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import AddCard from "./AddCard";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import Deck from "./Deck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch> 
          <Route exact path="/"> 
            <Home />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new"> 
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId"> 
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit"> 
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard /> 
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit"> 
            <EditCard />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
