import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  const [currentUser, setCurrentUser] = useState('');
  return (
    <Router>
      <div className={styles.container}>
        <Switch>
          <Route exact path='/login'>
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path='/register'>
            <Register
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </Route>
          <Route path='/'>
            <Dashboard
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
