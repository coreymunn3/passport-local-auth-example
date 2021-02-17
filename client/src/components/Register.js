import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import axios from 'axios';

const Register = ({ currentUser, setCurrentUser }) => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registerUsername || !registerPassword) {
      alert('Username and Password are Requried');
      return;
    }
    const userCreds = {
      username: registerUsername,
      password: registerPassword,
    };
    const { data } = await axios.post('/register', userCreds);
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <h4>Register</h4>
      <form>
        <div className={styles.formGroup}>
          <label>UserName</label>
          <input
            placeholder='usename'
            required
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            placeholder='password'
            required
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Sign Me Up</button>
      </form>
      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default Register;
