import React from "react";
import FillHeart from '../../icons/FillHeart'
import Message from "../../icons/Message";

export default function FavouriteBlockItem({url, value, id, lastUpdate, removeFromFavourites}) {
  return (
    <li>
      <article className="favourite-block-item">
      <span className="icon-heart-block" onClick={event => removeFromFavourites(id)}>
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
              <div className="footer">
                <span>last update: {lastUpdate} hours update</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}