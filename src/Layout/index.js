import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Home />
        <Study />
        <NotFound />
      </div>
    </>
  );
}

export default Layout;
