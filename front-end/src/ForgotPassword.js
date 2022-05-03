import './ForgotPassword.css';
import Header from './Header';
import { useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const [submitted, setSubmitted] = useState(false);
  const [fieldsFilled, setFieldsFilled] = useState(false);

  const handleSubmit = () => {
    if (email === '') {
      setFieldsFilled(false);
    } else {
      setFieldsFilled(true);
      setSubmitted(true);
    }
  };

  return (
    <main className="ForgotPassword">
      <Header url="./ForgotPassword" title="ForgotPassword" />
      <Link id="back-link" className="User-link" to="/Login">
        <AiOutlineLeft size={'28px'} />
      </Link>
      <body id="ForgotPassword-info" className="Post-box">
        <form onSubmit={handleSubmit}>
          <h1>Forgot Your Password?</h1>
          <h3>Enter your email address below to receive a password reset link.</h3>
          <label>Email</label>
          <input type="text" placeholder="Email" onChange={changeEmail} />
        </form>
        <div className="submit-button">
          <button type="button">Submit</button>
        </div>
      </body>
    </main>
  );
}

export default ForgotPassword;
