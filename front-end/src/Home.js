import "./Home.css"
import Header from "./Header"
import Footer from "./Footer"
import { Link } from "react-router-dom"

const Home = () => {
    return (
	<main className="Home">
            <Header
                url="./Home"
                title="Home"
            />
	    <div className = "btnCont">
		<a href = "/LogIn">
			<div className="btn">
			Log In
		    </div>
		</a>
		<a href="/SignUp">
		   <div className="btn">
			Sign Up
	  	 </div>
		</a>
	   </div>
        </main>
    )
}

export default Home
