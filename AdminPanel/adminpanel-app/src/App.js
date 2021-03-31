import logo from './logo.svg';
import './App.css';

import {Home} from './components/Home'
import {News} from './components/News'
import {Events} from './components/Events'
import {Navigation} from './components/Navigation'

import{Browser, BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="container">

        <h3 className="m-3 d-flex justify-content-center">
          React JS with Web api Demo
        </h3>

        <h5 className="m-3 d-flex justify-content-center">
          News Management Portal
        </h5>

        <Navigation/>

        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/news' component={News} exact/>
          <Route path='/events' component={Events} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
