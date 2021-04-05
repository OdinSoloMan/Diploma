//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from '../src/components/Home'

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;

/*
    const state = {snackbaropen : false, snackbarmsg : ''};
    const submitHandler = e => {
       e.preventDefault();
       fetch('https://localhost:44367/login', {
        method :'GET',
        headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body :JSON.stringify({
          Username : e.target.name.value,
          password : e.target.password.value
        })
      })
      .then(res => res.json())
      .then((result) =>
      {        
        //alert(result);
        //this.setState({snackbaropen : true, snackbarmsg : result});
      },
      (error) => {
        //alert('Failed')
        //this.setState({snackbaropen : true, snackbarmsg : 'failed'});
      })
*/

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