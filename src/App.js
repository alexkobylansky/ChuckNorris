import Main from "./components/main/Main";
import Aside from "./components/aside/Aside";
import React, {useEffect, useState} from "react";

export default function App() {

  const [result, setResult] = useState([]);
  const [favourites, setFavourites] = useState((JSON.parse(localStorage.getItem("favourites"))) || []);
  const [queryCategory, setQueryCategory] = useState('');
  const [categoryButton, setCategoryButton] = useState('');
  const [value, setValue] = useState('Free text search...');
  const [asideState, setAsideState] = useState(false);

  function pushToFavourites(index, id) {
    const exist = favourites.find(i => i.id === id);
    if (exist) {
      setFavourites(prev => prev.filter(prev => prev.id !== id));
    } else {
      setFavourites(prev => [...prev, result[index]]);
    }
  }

  function removeFromFavourites(id) {
    setFavourites(prev => prev.filter(prev => prev.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  function getQuery() {
    if (queryCategory === 'random') {
      fetch('https://api.chucknorris.io/jokes/random')
        .then(data => data.json())
        .then(data => {
          setResult([data]);
        });
    } else if (queryCategory === 'categories' && categoryButton) {
      fetch(`https://api.chucknorris.io/jokes/random?category=${categoryButton}`)
        .then(data => data.json())
        .then(data => {
          setResult([data]);
        });
    } else if (queryCategory === 'search') {

      fetch(`https://api.chucknorris.io/jokes/search?query=${value}`)
        .then(data => data.json())
        .then(data => {
          /*if (data.result.length >100) {
            let res = data.result.slice(0, 100);
            setResult(res);
          } else setResult(data.result);*/
          setResult(data.result);
        });
    }
  }

  function toggleAsideState() {
    setAsideState(!asideState);
  }

  return (
    <div className="container">
      <Main
        pushToFavourites={pushToFavourites}
        getQuery={getQuery}
        result={result}
        categoryButton={categoryButton}
        setValue={setValue}
        queryCategory={queryCategory}
        setQueryCategory={setQueryCategory}
        setCategoryButton={setCategoryButton}
        favourites={favourites}
        toggleAsideState={toggleAsideState}
        asideState={asideState}
      />
      <Aside
        favourites={favourites}
        removeFromFavourites={removeFromFavourites}
        toggleAsideState={toggleAsideState}
        asideState={asideState}
      />
    </div>
  );
}