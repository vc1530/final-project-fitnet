import './FeedPost.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import blankpic from './images/blank_profile.jpg';
import { Link } from 'react-router-dom';

const FeedPost = (props) => {
  function handleClick() {
    window.location.replace(props.user.username);
  }

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  if (!props.user) {
    console.log('user not found');
    return (
      <main className="Post-box">
        <p>user not defined</p>
      </main>
    );
  }

  return (
    <main id="FeedPost" className="Post-box">
      {props.picture ? (
        <img
          className="Post-image"
          src={`data:image/png;base64,${arrayBufferToBase64(props.picture.data.data)}`}
          alt="profile img"
        />
      ) : (
        ''
      )}
      <section className="Profile-info">
        <img
          className="Profile-image"
          src={
            props.user.profile_pic
              ? `data:image/png;base64,${arrayBufferToBase64(props.user.profile_pic.data.data)}`
              : blankpic
          }
          alt="Profile"
        />
        <div className="Profile-hover">
          <div className="Profile-link">
            <b>
              <Link to={`/users/${props.user.username}`} />
              {props.user.username}
            </b>
          </div>
          <div className="Profile-card" onClick={handleClick}>
            <div className="card-top">
              <img
                src={
                  props.user.profile_pic
                    ? `data:image/png;base64,${arrayBufferToBase64(
                        props.user.profile_pic.data.data
                      )}`
                    : blankpic
                }
                alt="profile"
              />
              <div className="card-names">
                <b>
                  <p>
                    <Link className="User-link" to={'/users/' + props.user.username}>
                      {props.user.username}
                    </Link>
                  </p>
                </b>
                <p>{props.user.name}</p>
              </div>
            </div>
            <p id="bio">{props.user.bio}</p>
          </div>
        </div>
      </section>
      <p>{props.description}</p>
    </main>
  );
};

export default FeedPost;
