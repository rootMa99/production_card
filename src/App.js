
import { useSelector } from 'react-redux';
import './App.css';
import NavBar from './components/UI/NavBar';
import React from 'react';
import Login from './components/login/Login';
import TeamLeader from './components/routes/TeamLeader';
import Moderator from './components/routes/Moderator';

function App() {
  const { isLoged } = useSelector((s) => s.login);
  return (
    <div className="App">
       <NavBar />
        {
          <React.Fragment>
          {!isLoged.login && <Login />}
          {isLoged.login && isLoged.role==="Teamleader" && <TeamLeader /> }
          {isLoged.login && isLoged.role==="Moderator" && <Moderator /> }
          </React.Fragment>
        }
    </div>
  );
}

export default App;
