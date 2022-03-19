import "./Playlists.css"
import Header from "./Header"
import Footer from "./Footer" 

const Playlists = () => {
    return (
        <main className="Playlists">
        <Header 
            url = "./Playlists" 
            title = "Playlists"
        /> 
        <body className="Playlists-info">
            <p>Playlists being linked to Spotify soon!</p>
        </body>
        <Footer 
            title = "Playlists" 
        /> 
    </main>
    )
}

export default Playlists