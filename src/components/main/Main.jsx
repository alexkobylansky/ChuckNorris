import React, {useEffect, useState} from "react";
import CategorySelectButton from "./category-select-button/CategorySelectButton";
import ResultBlockItem from "./result/ResultBlockItem";

export default function Main() {

  const [queryCategory, setQueryCategory] = useState('');
  const [category, setCategory] = useState([]);
  const [categoryButton, setCategoryButton] = useState('');
  const [resultArr, setResultArr] = useState([])

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
      fetch(url)
        .then(data => data.json())
        .then(data => {
          console.log('data: ', data);
          let arr = [];
          arr.push(data);
          setResultArr(arr);
          console.log('resultArr: ', resultArr);
        });
    } else if (queryCategory === 'categories' && categoryButton) {
      url = `https://api.chucknorris.io/jokes/random?category=${categoryButton}`
      fetch(url)
        .then(data => data.json())
        .then(data => {
          console.log('data: ', data);
          let arr = [];
          arr.push(data);
          // setResultArr(()=> {total: 1, resutl: data });
          setResultArr(arr)
          console.log('resultArr: ', resultArr);
        });
    } else if (queryCategory === 'search') {
      const queryText = document.querySelector('.search-input');
      url = `https://api.chucknorris.io/jokes/search?query=${queryText.value}`
      fetch(url)
        .then(data => data.json())
        .then(data => {
          console.log('data: ', data);
          setResultArr(data.result)
          console.log('resultArr: ', resultArr);
        });
    }
  }

  function getIndex(e) {
    let target;
    resultArr.forEach(item => {
      item.onClick = (e) => {
         target = e.target.dataset.index;
      }
    });
    console.log(target);
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
          {resultArr && resultArr.map((item, i) => <ResultBlockItem key={resultArr[i].id}
                                                                    id={resultArr[i].id}
                                                                    value={resultArr[i].value}
                                                                    category={resultArr[i].categories['0']}
                                                                    lastUpdate={resultArr[i].updated_at}
                                                                    url={resultArr[i].url}
                                                                    index={i}
                                                                    item={item}
                                                                    onClick={getIndex}
          />)}
        </div>
      </div>
    </main>
  );
}