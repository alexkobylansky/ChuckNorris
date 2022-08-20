import React from "react";
import {ReactComponent as Message} from '../../../assets/img/Message.svg'
import {ReactComponent as FillHeart} from '../../../assets/img/FillHeart.svg'

export const FavouriteBlockItem: React.FC<FavouriteBlockItemProps> = ({url, value, category, id, lastUpdate, removeFromFavourites}) => {

  function lastUpdated(lastUpdate: string) {
    const getMilliseconds = Date.parse(lastUpdate);
    return Math.floor((getMilliseconds / 1000) / 3600)
  }

  return (
    <li>
      <article className="favourite-block-item">
      <span className="icon-heart-block" onClick={() => removeFromFavourites(id)}>
        <FillHeart />
      </span>
        <div className="favourite-block-item_container">
          <div className="icon-message-block">
            <Message />
          </div>
          <div className="favourite-block-item_wrapper">
            <p className="favourite-block_id"><span>ID: </span><a href={url} className="favourite-block_id_href">{id}</a>
            </p>
            <div className="favourite-block_description">
              <p>
                {value}
              </p>
              <footer>
                <span>last update: {lastUpdated(lastUpdate)} hours update</span>
                {category.length > 0 && category.map(item => <div className="tags" key={item}>
                  <span className="tag">{item}</span>
                </div>)}
              </footer>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}