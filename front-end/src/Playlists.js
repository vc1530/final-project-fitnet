import "./Playlists.css"
import Header from "./Header"
import Footer from "./Footer" 
import { useParams } from 'react-router-dom' 
import { useState, useEffect } from 'react' 
import axios from "axios" 
import { BsArrowLeftCircle } from 'react-icons/bs'

const Playlists = () => {

    let params = useParams()

    const [playlist, setPlaylist] = useState("") 
    const [savedMessage, setSavedMessage] = useState("") 
    const [errorMessage, setErrorMessage] = useState("") 
    const [displayPlaylist, setDisplayPlaylist] = useState("") 

    const embedPlaylist = playlist => { 
        console.log(playlist) 
        let newURI = playlist.substring(0, 25) + "embed/" + playlist.substring(25, playlist.length) 
        let i = newURI.indexOf('?') 
        if (i === -1) return newURI 
        newURI = newURI.substring(0, i) 
        return newURI 
    }

    const validatePlaylist = playlist => { 
        if (playlist === "") return true 
        return /^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/.test(playlist)
    }

    useEffect(() => { 
        console.log("fetching playlist for workout " + params.id) 
        axios
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/p/` + params.id)
            .then (res => { 
                setPlaylist(res.data.playlist) 
                if (res.data.playlist) setDisplayPlaylist(embedPlaylist(res.data.playlist)) 
                console.log("successful retrieval of playlist for workout " + params.id) 
            })
            .catch(err => { 
                console.log("failed retrieval of playlist for workout " + params.id) 
                console.error(err) 
            })
    }, [params.id])

    const handleSubmit = e => { 
        e.preventDefault() 
        console.log("uploading playlist to workout " + params.id) 
        if (!validatePlaylist(playlist)) { 
            setErrorMessage("Invalid URL") 
        }
       else { 
            axios   
                .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/p/` + params.id, { 
                    playlist: playlist,
                }) 
                .catch((err) => { 
                    console.error(err) 
                    console.log("uploading playlist to workout " + params.id + " failed") 
                })
                .then((res) => { 
                    console.log("uploading playlist for workout " + params.id + " succeeded")
                    setSavedMessage('Your playlist has been saved!')
                    if (playlist) setDisplayPlaylist(embedPlaylist(playlist))
                })
        }
    }

    return (
        <main className="Playlists">
            <Header 
                url = "./Playlists" 
                title = "Playlists"
            /> 
            <div className="backlink">
                <a className = "User-link" href={"../w/" + params.id}>{<BsArrowLeftCircle size = "30px"/>}</a>
            </div>
            <body className="Post-box">
                <form onSubmit = {handleSubmit}> 
                    <input 
                        className = "playlistForm"
                        type= "text" 
                        name = "playlist" 
                        value = {playlist}
                        placeholder = "Enter a playlist URL" 
                        onChange = {e => { 
                            setPlaylist(e.target.value)
                            setSavedMessage("") 
                            setErrorMessage("") 
                        }}
                    />
                    <div className = "submit-button">
                        <button>Connect to Playlist</button>
                    </div>
                </form>
            </body>
            {savedMessage ? <p className = "saved">{savedMessage}</p> : ""}
            {errorMessage ? <p id = "invalidURL" className = "error">{errorMessage}</p> : ""}
            {displayPlaylist ? <iframe title = "playlist" src ={displayPlaylist} width="340" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> : ""} 
            <Footer 
                title = "Playlists" 
            /> 
        </main>
    )
}

export default Playlists