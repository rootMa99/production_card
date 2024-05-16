
import { useSelector } from 'react-redux';
import './App.css';
import NavBar from './components/UI/NavBar';
import React from 'react';
import Login from './components/login/Login';

function App() {
  const { isLoged } = useSelector((s) => s.login);
  return (
    <div className="App">
       <NavBar />
        {
          <React.Fragment>
          {!isLoged.login && <Login />}
          </React.Fragment>
        }
    </div>
  );
}

export default App;
