import Main from "./components/main/Main";
import Aside from "./components/aside/Aside";
import {useState} from "react";

export  default function App() {

  const [result, setResult] = useState([]);
  const [favourites, setFavourites] = useState([...JSON.parse(localStorage.getItem("favourites"))] || []);
  const [queryCategory, setQueryCategory] = useState('');
  const [categoryButton, setCategoryButton] = useState('');
  const [value, setValue] = useState('Free text search...');
  const [asideState, setAsideState] = useState(false);

  function pushToFavourites(index, id) {
    const exist = favourites.find(i => i.id === id);
    if (exist) {
      return null
    }
    else {
      setFavourites(prev => [...prev, result[index]]);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  }

  function removeFromFavourites(id) {
    setFavourites(prev => prev.filter(prev => prev.id !== id));
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }

  function getQuery() {
    let url = '';
    if (queryCategory === 'random') {
      url = 'https://api.chucknorris.io/jokes/random'
      fetch(url)
        .then(data => data.json())
        .then(data => {
          let arr = [];
          arr.push(data);
          setResult(arr);
        });
    } else if (queryCategory === 'categories' && categoryButton) {
      url = `https://api.chucknorris.io/jokes/random?category=${categoryButton}`
      fetch(url)
        .then(data => data.json())
        .then(data => {
          let arr = [];
          arr.push(data);
          setResult(arr);
        });
    } else if (queryCategory === 'search') {

      url = `https://api.chucknorris.io/jokes/search?query=${value}`
      fetch(url)
        .then(data => data.json())
        .then(data => {
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