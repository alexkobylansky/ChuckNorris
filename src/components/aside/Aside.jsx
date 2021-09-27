import React from "react";
import FavouriteBlockItem from "./favourite-block/FavouriteBlockItem";

export default function Aside({favourites, removeFromFavourites, toggleAsideState, asideState}) {
  return (
    <aside className={asideState ? 'open' : 'close'}>
      <header>
        <div className="burger-button-block" onClick={toggleAsideState}><span></span></div>
        <h2>Favourite</h2>
      </header>
      <div className="favourites-block">
        <ul className="container-scroll">
          {favourites && favourites.map((item, i)=> <FavouriteBlockItem key={favourites[i].id}
                                                                        id={favourites[i].id}
                                                                        value={favourites[i].value}
                                                                        lastUpdate={favourites[i].updated_at}
                                                                        url={favourites[i].url}
                                                                        removeFromFavourites={removeFromFavourites}
                                                    />
          )}
        </ul>
      </div>
    </aside>
  );
}