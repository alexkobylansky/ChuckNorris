import React, {useEffect, useState, useRef} from "react";
import {CategorySelectButton} from "./category-select-button/CategorySelectButton";
import {ResultBlockItem} from "./result/ResultBlockItem";

export const Main : React.FC<MainProps> = ({getQuery, pushToFavourites, categoryButton, queryCategory, setValue, setCategoryButton, setQueryCategory, result, favourites, toggleAsideState, asideState}) => {
  const [category, setCategory] = useState([]);
  const inputRef = useRef<any>();

  useEffect(() => {
    fetch('https://api.chucknorris.io/jokes/categories')
      .then(data => data.json())
      .then(data => {
        setCategory(data);
      });
  }, []);

  function search() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        inputRef.current.focus()
      }
    });
  }

  return (
    <main className={asideState ? 'open' : 'close'}>
      <header>
        <h1>MSI 2020</h1>
        <div className="favourite-open">
          <div className="burger-button-block" onClick={toggleAsideState}><span/></div>
          <h2>Favourite</h2>
        </div>
      </header>
      <div className="search-block">
        <p>
          <span>Hey!</span>
          Let's try to find a joke for you:
        </p>
        <form action="#" method="GET">
          <ul className="search-group">
            <li>
              <input type="radio"
                     name="radio_button"
                     className="random"
                     value="random"
                     id="random"
                     checked={queryCategory === 'random'}
                     onChange={(event) => setQueryCategory(event.target.value)}
              />
              <label htmlFor="random" data-for="random">
                <span>Random</span>
              </label>
            </li>
            <li>
              <input type="radio"
                     name="radio_button"
                     className="categories"
                     value="categories"
                     checked={queryCategory === 'categories'}
                     onChange={(event) => setQueryCategory(event.target.value)}
                     id="categories"
              />
              <label htmlFor="categories" data-for="categories">
                <span>From categories</span>
              </label>
              {queryCategory === 'categories' && <ul className="categories-group">
                {category.map((item, i) => <CategorySelectButton key={i} active={categoryButton === item} setCategoryButton={setCategoryButton} name={item} value={item}/>)}
              </ul>}
            </li>
            <li>
              <input type="radio"
                     name="radio_button"
                     className="search"
                     value="search"
                     checked={queryCategory === 'search'}
                     onChange={(event) => setQueryCategory(event.target.value)}
                     id="search"
              />
              <label htmlFor="search" data-for="search">
                <span>Search</span>
              </label>
              {queryCategory === 'search' && <input type="text" className="search-input" onClick={search} onChange={event => setValue(event.target.value)} placeholder="Free text search..." />}
            </li>
          </ul>
          <button type="button" ref={inputRef} onClick={getQuery} className="joke-button">Get a joke</button>
        </form>
      </div>
      <div className="result-block">
        <ul className="container-scroll">
          {result && result.map((item: IResult, i: number) => <ResultBlockItem key={item.id}
                                                              id={item.id}
                                                              value={item.value}
                                                              category={item.categories}
                                                              lastUpdate={item.updated_at}
                                                              url={item.url}
                                                              index={i}
                                                              pushToFavourites={pushToFavourites}
                                                              favourites={favourites}
          />)}
        </ul>
      </div>
    </main>
  );
}