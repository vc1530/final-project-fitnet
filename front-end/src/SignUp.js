import './SignUp.css';
import Header from './Header';
import { useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [firstNameError, setfirstNameError] = useState('');
  const [lastNameError, setlastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [savedMessage, setSavedMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('registering user ' + username);

    //code taken from Stack Overflow
    //https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    //code taken from Stack Overflow
    //https://stackoverflow.com/questions/7331289/javascript-function-valid-username
    const validateUsername = (username) => {
      return /^[0-9a-zA-Z_.-]+$/.test(username);
    };

    let valid = true;

    if (firstName === '') {
      valid = false;
      setfirstNameError('Invalid first name');
    }
    if (lastName === '') {
      valid = false;
      setlastNameError('Invalid last name');
    }
    if (username === '' || !validateUsername(username)) {
      valid = false;
      setUsernameError('Invalid username');
    }
    if (email === '' || !validateEmail(email)) {
      valid = false;
      setEmailError('Invalid email');
    }
    if (password === '') {
      valid = false;
      setPasswordError('Invalid password');
    }

    if (valid) {
      console.log('registering user ' + username);
      axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/register`, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          password: password,
        })
        .then((res) => {
          console.log('User ' + username + ' succesfully registered');
          setfirstNameError('');
          setlastNameError('');
          setUsernameError('');
          setEmailError('');
          setPasswordError('');
          setSavedMessage('You have been registered!');
          window.location.replace('/login');
        })
        .catch((err) => {
          console.error(err);
          console.log('Unable to register user ' + username);
          if (err.response?.status === 401) setEmailError('This email is already in use');
          if (err.response?.status === 402)
            setUsernameError('This username has already been taken');
        });
    }
  };

  return (
    <main className="SignUp">
      <Header url="./SignUp" title="Sign Up" />
      <Link id="back-link" className="User-link" to="/">
        <AiOutlineLeft size={'28px'} />
      </Link>
      <body id="SignUp-info" className="Post-box">
        <h1>Sign up for FitNet!</h1>
        <h2>
          Already have an account? Log in{' '}
          <Link to="/LogIn" className="User-link">
            {' '}
            here.
          </Link>
        </h2>
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            onChange={(e) => {
              setfirstName(e.target.value);
              setfirstNameError('');
              setSavedMessage('');
            }}
            value={firstName}
            type="text"
            className="form-control"
            placeholder="First Name"
          />
          {firstNameError ? <p className="error">{firstNameError}</p> : ''}
          <label>Last Name</label>
          <input
            onChange={(e) => {
              setlastName(e.target.value);
              setlastNameError('');
              setSavedMessage('');
            }}
            value={lastName}
            type="text"
            className="form-control"
            placeholder="Last Name"
          />
          {lastNameError ? <p className="error">{lastNameError}</p> : ''}
          <label>Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
              setSavedMessage('');
            }}
            value={email}
            type="email"
            className="form-control"
            placeholder="Email"
          />
          {emailError ? <p className="error">{emailError}</p> : ''}
          <label>Username</label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError('');
              setSavedMessage('');
            }}
            value={username}
            type="text"
            className="form-control"
            placeholder="Username"
          />
          {usernameError ? <p className="error">{usernameError}</p> : ''}
          <label>Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
              setSavedMessage('');
            }}
            value={password}
            type="password"
            className="form-control"
            placeholder="Password"
          />
          {passwordError ? <p className="error">{passwordError}</p> : ''}
          <div className="submit-button">
            <button>Submit</button>
          </div>
        </form>
      </body>
      {savedMessage ? <p className="saved">{savedMessage}</p> : ''}
    </main>
  );
};

export default SignUp;
