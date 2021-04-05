//import logo from './logo.svg';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Conntent from './Conntent'

function Home() {

    return (
        <div className="App">
            {(localStorage.getItem('user')) ? (
                <Conntent />
            ) : (
                <LoginForm />
            )}
        </div>
    );
}

export default Home;