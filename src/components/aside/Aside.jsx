import React from "react";
import FavouriteBlockItem from "./favourite-block/FavouriteBlockItem";

export default function Aside() {

  return (
    <aside className="close">
      <header>
        <div className="burger-button-block"><span></span></div>
        <h2>Favourite</h2>
      </header>
      <div className="favourites-block">
        <div className="container-scroll">
          <FavouriteBlockItem />
        </div>
      </div>
    </aside>
  );
}