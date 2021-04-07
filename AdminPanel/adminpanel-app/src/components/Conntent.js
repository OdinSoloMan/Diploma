import {News} from './ConntentInfo/News';
import {Events} from './ConntentInfo/Events';
import {Navigation} from './Navigation';
import{Browser, BrowserRouter, Route, Switch} from 'react-router-dom';
import { Users } from './ConntentInfo/Users';

const Logout = () => {
    localStorage.removeItem('user');
    window.location.reload();     
}

function Conntent() {

    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <h2>Welcome, <span></span></h2>            
            <button onClick={Logout}>Logout</button>
            <h3 className="m-3 d-flex justify-content-center">
              React JS with Web api Demo
            </h3>
            
            <Navigation/>

            <Switch>
              <Route path='/news' component={News} exact/>
              <Route path='/events' component={Events} exact/>
              <Route path='/users' component={Users} exact/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default Conntent;