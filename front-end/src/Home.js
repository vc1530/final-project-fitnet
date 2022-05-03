import './Home.css';
import Header from './Header';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="Home">
      <Header url="./" title="Home" />
      <body className="btnCont">
        <Link to="/LogIn">
          <div className="btn">Log In</div>
        </Link>
        <Link to="/SignUp">
          <div className="btn">Sign Up</div>
        </Link>
      </body>
    </main>
  );
};

export default Home;
