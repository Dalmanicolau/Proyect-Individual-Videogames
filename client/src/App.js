import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home'; 

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Henry Videogames</h1>
      <Home />
    </div>
    </BrowserRouter>
  );
}

export default App;
