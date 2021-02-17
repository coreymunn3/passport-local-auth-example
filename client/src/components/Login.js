import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './Register.module.css';
import axios from 'axios';

const Login = ({ currentUser, setCurrentUser }) => {
  const history = useHistory();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      alert('Username and Password are Required');
      return;
    }
    const userCreds = {
      username: loginUsername,
      password: loginPassword,
    };
    const {
      data: { message, user },
    } = await axios.post('/login', userCreds);
    console.log(user);
    if (message === 'Successfully Logged In') {
      setCurrentUser(user);
      history.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <h4>Log In</h4>
      <form>
        <div className={styles.formGroup}>
          <label>UserName</label>
          <input
            placeholder='usename'
            onChange={(e) => setLoginUsername(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            placeholder='password'
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Log In</button>
        <p>
          Don't have an account? <Link to='/register'>Register Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
