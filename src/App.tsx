import React, {useEffect, useState} from "react";
import {Main} from "./components/main/Main";
import {Aside} from "./components/aside/Aside";

export const App: React.FC = () => {

  const storage = (): any[] => {
    const favourites: string | null = localStorage.getItem('favourites');
    if (favourites) {
      return JSON.parse(favourites);
    } else return []
  }

  const [result, setResult] = useState<any[]>([]);
  const [favourites, setFavourites] = useState<any[]>(storage);
  const [queryCategory, setQueryCategory] = useState<string>('');
  const [categoryButton, setCategoryButton] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [asideState, setAsideState] = useState<boolean>(false);

  function pushToFavourites(index: number, id: string): void {
    const exist = favourites.find(i => i.id === id);
    if (exist) {
      setFavourites(prev => prev.filter(prev => prev.id !== id));
    } else {
      setFavourites(prev => [...prev, result[index]]);
    }
  }

  function removeFromFavourites(id: string): void {
    setFavourites(prev => prev.filter(item => item.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  function getQuery(): void {
    if (queryCategory === 'random') {
      fetch('https://api.chucknorris.io/jokes/random')
        .then(data => data.json())
        .then((data: Object) => {
          setResult([data]);
        });
    } else if (queryCategory === 'categories' && categoryButton) {
      fetch(`https://api.chucknorris.io/jokes/random?category=${categoryButton}`)
        .then(data => data.json())
        .then((data: Object) => {
          setResult([data]);
        });
    } else if (queryCategory === 'search') {
      fetch(`https://api.chucknorris.io/jokes/search?query=${value}`)
        .then(data => data.json())
        .then((data) => {
          // setResult(data.result);
          if (data.result.length >10) {
            setResult(data.result.slice(0, 10));
          } else setResult(data.result);
        });
    }
  }

  function toggleAsideState(): void {
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