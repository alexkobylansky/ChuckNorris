import React, {useEffect, useState} from "react";
import CategorySelectButton from "./category-select-button/CategorySelectButton";
import ResultBlockItem from "./result/ResultBlockItem";

export default function Main() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [queryCategory, setQueryCategory] = useState('');
  const [category, setCategory] = useState([]);
  const [categoryButton, setCategoryButton] = useState('');
  const [test, setTest] = useState();
  let resultArr = [];

  useEffect(() => {
    fetch('https://api.chucknorris.io/jokes/categories')
      .then(data => data.json())
      .then(data => {
        setCategory(data);
      });
  }, []);

  function getQuery() {
    let url = '';
    if (queryCategory === 'random') {
      url = 'https://api.chucknorris.io/jokes/random'
    } else if (queryCategory === 'categories') {
      url = `https://api.chucknorris.io/jokes/random?category=${categoryButton}`
    } else if (queryCategory === 'search') {
      url = `https://api.chucknorris.io/jokes/search?query=`
    }
    fetch(url)
      .then(data => data.json())
      .then(data => {
        setIsLoaded(true);
        console.log('data: ', data);
        setTest(data);
        resultArr.push(data);
        console.log('resultArr: ',resultArr);
      });
  }

  return (
      <main className="close">
        <header>
          <h1>MSI 2020</h1>
          <div className="favourite-open">
            <div className="burger-button-block"><span></span></div>
            <h2>Favourite</h2>
          </div>
        </header>
        <div className="search-block">
          <p>
            <span>Hey!</span>
            Let's try to find a joke for you:
          </p>
          <ul className="search-group">
            <li>
              <input type="radio"
                     name="radio_button"
                     className="random"
                     value="random"
                     id="random"
                     checked={queryCategory === 'random'}
                     onChange={(e) => setQueryCategory(e.target.value)}
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
                     onChange={(e) => setQueryCategory(e.target.value)}
                     id="categories"
              />
              <label htmlFor="categories" data-for="categories">
                <span>From categories</span>
              </label>
              {queryCategory === 'categories' && (<ul className="categories-group">
                {category.map((item, i) => <CategorySelectButton key={i} active={categoryButton === item} onClick={setCategoryButton} name={item} value={item}/>)}
              </ul>)}
            </li>
            <li>
              <input type="radio"
                     name="radio_button"
                     className="search"
                     value="search"
                     checked={queryCategory === 'search'}
                     onChange={(e) => setQueryCategory(e.target.value)}
                     id="search"
              />
              <label htmlFor="search" data-for="search">
                <span>Search</span>
              </label>
              {queryCategory === 'search' && (<><input type="text" className="search-input" placeholder="Free text search..."/></>)}
            </li>
          </ul>
          <button type="button" onClick={getQuery} className="joke-button">Get a joke</button>
        </div>
        <div className="result-block">
          <div className="container-scroll">
            {isLoaded === 'true' && resultArr.map((item, i)=> <ResultBlockItem id={test.id}/>)}
          </div>
        </div>
      </main>
    );
}