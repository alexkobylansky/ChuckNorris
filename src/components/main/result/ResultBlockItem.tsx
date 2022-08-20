import React from "react";
import {ReactComponent as Message} from '../../../assets/img/Message.svg'
import {ReactComponent as Heart} from '../../../assets/img/Heart.svg'
import {ReactComponent as FillHeart} from '../../../assets/img/FillHeart.svg'

export const ResultBlockItem: React.FC<ResultBlockItemProps> = ({id, category, value, lastUpdate, url, index, pushToFavourites, favourites}) => {

  function lastUpdated(lastUpdate: string): number {
    const getMilliseconds = Date.parse(lastUpdate);
    return Math.floor((getMilliseconds / 1000) / 3600);
  }

  return (
    <li>
      <article className="result-block-item">
      <span className="icon-heart-block" onClick={() => pushToFavourites(index, id)}>
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
                <span>last update: {lastUpdated(lastUpdate)} hours update</span>
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