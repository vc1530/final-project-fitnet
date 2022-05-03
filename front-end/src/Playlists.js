import './Playlists.css';
import Header from './Header';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Playlists = () => {
  const jwtToken = localStorage.getItem('token');

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  let params = useParams();

  const [uid, setUid] = useState('');
  const [playlist, setPlaylist] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayPlaylist, setDisplayPlaylist] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, {
        headers: { Authorization: `JWT ${jwtToken}` },
      })
      .then((res) => {
        setUid(res.data.user._id);
        getPlaylist(res.data.user._id, params.id);
      })
      .catch((err) => {
        console.error(err);
        console.log('Invalid token');
        setIsLoggedIn(false);
      });
  }, [uid]);

  const getPlaylist = (uid, id) => {
    console.log('fetching playlist for workout ' + params.id);
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/${uid}/${id}`)
      .then((res) => {
        setPlaylist(res.data.workout.playlist);
        if (res.data.workout.playlist) setDisplayPlaylist(embedPlaylist(res.data.workout.playlist));
        console.log('successful retrieval of playlist for workout ' + params.id);
      })
      .catch((err) => {
        console.log('failed retrieval of playlist for workout ' + params.id);
        console.error(err);
        setIsLoggedIn(false);
      });
  };

  const embedPlaylist = (playlist) => {
    let newURI = playlist.substring(0, 25) + 'embed/' + playlist.substring(25, playlist.length);
    let i = newURI.indexOf('?');
    if (i === -1) return newURI;
    newURI = newURI.substring(0, i);
    return newURI;
  };

  const validatePlaylist = (playlist) => {
    if (playlist === '') return true;
    if (playlist.substring(0, 25) !== 'https://open.spotify.com/') return false;
    //rest of the playlist excluding "https://open.spotify.com/"
    let rest = playlist.substring(25, playlist.length);
    let i = rest.indexOf('/');
    let type = rest.substring(0, i + 1);
    if (
      type !== 'album/' &&
      type !== 'playlist/' &&
      type !== 'track/' &&
      type !== 'episode/' &&
      type !== 'show/'
    )
      return false;
    if (rest.substring(i + 1).length === 0) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('uploading playlist to workout ' + params.id);
    if (!validatePlaylist(playlist)) {
      setErrorMessage('Invalid URL');
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/p/` + params.id, {
          uid: uid,
          playlist: playlist,
        })
        .catch((err) => {
          console.error(err);
          console.log('uploading playlist to workout ' + params.id + ' failed');
        })
        .then((res) => {
          console.log('uploading playlist for workout ' + params.id + ' succeeded');
          if (playlist) setDisplayPlaylist(embedPlaylist(playlist));
          else setDisplayPlaylist('');
        });
    }
  };

  if (isLoggedIn) {
    return (
      <main className="Playlists">
        <Header url="./Playlists" title="Playlists" />
        <div className="backlink">
          <Link className="User-link" to={'../w/' + params.id}>
            {<BsArrowLeftCircle size="30px" />}
          </Link>
        </div>
        <body className="Post-box">
          <form onSubmit={handleSubmit}>
            <input
              className="playlistForm"
              type="text"
              name="playlist"
              value={playlist}
              placeholder="Enter a playlist URL"
              onChange={(e) => {
                setPlaylist(e.target.value);
                setErrorMessage('');
              }}
            />
            <div className="submit-button">
              <button>Connect to Playlist</button>
            </div>
          </form>
        </body>
        {errorMessage ? (
          <p id="invalidURL" className="error">
            {errorMessage}
          </p>
        ) : (
          ''
        )}
        {displayPlaylist ? (
          <iframe
            title="playlist"
            src={displayPlaylist}
            width="340"
            height="380"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        ) : (
          ''
        )}
        <Footer title="Playlists" />
      </main>
    );
  } else return <Navigate to="/login?error=protected" />;
};

export default Playlists;
