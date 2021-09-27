import React from "react";
import Heart from "../../icons/Heart";
import FillHeart from "../../icons/FillHeart";
import Message from "../../icons/Message";

export default function ResultBlockItem({id, category, value, lastUpdate, url, index, pushToFavourites, favourites}) {
  return (
    <li>
      <article className="result-block-item">
      <span className="icon-heart-block" onClick={event => pushToFavourites(index, id)}>
        {favourites.find(i => i.id === id) ? <FillHeart/> : <Heart/>}
      </span>
        <div className="result-block-item_container">
          <div className="icon-message-block">
            <Message/>
          </div>
          <div className="result-block-item_wrapper">
            <p className="result-block_id"><span>ID: </span><a href={url}>{id}</a></p>
            <div className="result-block_description">
              <p>{value}</p>
              <div className="footer">
                <span>last update: {lastUpdate} hours update</span>
                {category && <div className="tags">
                  <span className="tag">{category}</span>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}