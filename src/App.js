import Main from "./components/main/Main";
import Aside from "./components/aside/Aside";
import {useEffect} from "react";

function App() {

  useEffect(() => {
    const mainButton = document.querySelector('main .burger-button-block');
    const asideButton = document.querySelector('aside .burger-button-block');

    const asideBlockToggleClass = () => {
      const asideBlock = document.querySelector('aside').className;
      document.querySelector('aside').className = asideBlock === 'open' ? 'close' : 'open';
    };

    const mainBlockToggleClass = () => {
      const mainBlock = document.querySelector('main').className;
      document.querySelector('main').className = mainBlock === 'open' ? 'close' : 'open';
    }

    mainButton.addEventListener('click', () => {
      mainBlockToggleClass();
      asideBlockToggleClass();
    });

    asideButton.addEventListener('click', () => {
      mainBlockToggleClass();
      asideBlockToggleClass();
    });

  });

  return (
    <div className="container">
      <Main/>
      <Aside/>
    </div>
  );
}

export default App;
