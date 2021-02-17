import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Dashboard.module.css';
import axios from 'axios';

const Dashboard = ({ currentUser, setCurrentUser }) => {
  const history = useHistory();
  useEffect(() => {
    const getUser = async () => {
      const { data: currentUser } = await axios.get('/user');
      setCurrentUser(currentUser);
    };
    getUser();
  }, []);

  const logout = async () => {
    const { data: message } = await axios.get('/logout');
    console.log(message);
    setCurrentUser(null);
    history.push('/login');
  };

  return (
    <div className={styles.container}>
      {currentUser && <h3>{`Hello, ${currentUser.username}`}</h3>}
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
