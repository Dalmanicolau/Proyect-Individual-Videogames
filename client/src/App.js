import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home/Home'; 
import LandingPage from './components/LandingPage/LandingPage'
import Detail from './components/Detail/Detail'
import CreateGame from './components/CreateGame/CreateGame'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact={true} path= '/' component= { LandingPage }/>
          <Route exact={true} path= '/home' component= { Home }/>
          <Route exact={true} path= '/videogame' component = { CreateGame }/>
          <Route exact={true} path= '/videogame/:videogameID' component= { Detail }/>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
