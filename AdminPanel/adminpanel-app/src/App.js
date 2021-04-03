//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {Home} from './components/Home';
import {News} from './components/News';
import {Events} from './components/Events';
import {Navigation} from './components/Navigation';
import LoginForm from './components/LoginForm';

import{Browser, BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  const adminUser = {
    email : "admin@admin.com",
    password : "admin123"
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if(details.email == adminUser.email && details.password == adminUser.password) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email : details.email
      });
    } else {
      console.log("Details do not math!");
      setError("Details do not math!");
    }
  }

  const Logout = () => {    
    setUser({name: "", email: ""});
  }

  return (
    <div className="App">
      {(user.email != "") ? (
          <BrowserRouter>
          <div className="container">
            <h2>Welcome, <span>{user.name}</span></h2>            
            <button onClick={Logout}>Logout</button>
            <h3 className="m-3 d-flex justify-content-center">
              React JS with Web api Demo
            </h3>
            
            <Navigation/>

            <Switch>
              <Route path='/' component={Home} exact/>
              <Route path='/news' component={News} exact/>
              <Route path='/events' component={Events} exact/>
            </Switch>
          </div>
        </BrowserRouter>
        ) : (
          <LoginForm Login={Login} error={error}/>
        )}
    </div>
  );
}

export default App;

/**
 *   return (
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
*/