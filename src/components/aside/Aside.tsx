import React from "react";
import {FavouriteBlockItem} from "./favourite-block/FavouriteBlockItem";

export const Aside: React.FC<AsideProps> = ({favourites, removeFromFavourites, toggleAsideState, asideState}) => {
  return (
    <aside className={asideState ? 'open' : 'close'}>
      <header>
        <div className="burger-button-block" onClick={toggleAsideState}><span/></div>
        <h2>Favourite</h2>
      </header>
      <div className="favourites-block">
        <ul className="container-scroll">
          {favourites && favourites.map((item: IObjectItem) => <FavouriteBlockItem key={item.id}
                                                                        id={item.id}
                                                                        value={item.value}
                                                                        lastUpdate={item.lastUpdate}
                                                                        url={item.url}
                                                                        removeFromFavourites={removeFromFavourites}
                                                    />
          )}
        </ul>
      </div>
    </aside>
  );
}