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
        	    <div
        	      className="btn">
			Log In
		    </div>
		   <div
		      className="btn">
			Set Up
	  	 </div>
	   </div>
        </main>
    )
}

export default Home
