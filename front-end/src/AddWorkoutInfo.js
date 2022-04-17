import React from 'react'
import "./AddWorkoutInfo.css"
import { useState, useEffect } from 'react'
import axios from "axios"
import { Navigate } from "react-router-dom"

const AddWorkoutInfo = props => { 

    const jwtToken = localStorage.getItem("token") 

    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) 
    //id of the current user 
    const [uid, setUid] = useState("") 

    //getting the current user's id so we can edit their workout history 
    useEffect(() => { 
      axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, { 
          headers: { Authorization: `JWT ${jwtToken}` }
      })
      .then(res => { 
          setUid(res.data.user._id) 
      })
      .catch(err => { 
          console.error(err) 
          console.log("Invalid token") 
          setIsLoggedIn(false) 
      })
  }, [])

    // create a state variable for each form field
    const [workout_name, setName] = useState("")
    const [workout_description, setDesc] = useState("")
    const [savedMessage, setSavedMessage] = useState("") 

    useEffect(() => { 
      setName(props.workout_name) 
      setDesc(props.workout_description)
    }, [props.workout_name, props.workout_description])
    /**
    * A nested function that is called when the user submits the form to save a new Workout.
    * @param {*} e
    */
    const submitForm = e => {
      e.preventDefault() // prevent normal browser submit behavior
      axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/` + props.id, { 
          //this is the current user's id... not to be confused with the workout id 
          uid: uid, 
          workout_name: workout_name,
          workout_description: workout_description,  
        })
        .catch((err) => { 
          console.error(err) 
          console.log("editing workout " + props.id + " has failed")
        })
        .then((response) => { 
          console.log("editing workout " + props.id + " has succeeded")
        })
        setSavedMessage("Your workout has been saved!") 
    }

    if (isLoggedIn) 
      return (
        //<main className="AddWorkoutInfo">
          <form className="AddWorkoutInfo-header" onSubmit={submitForm}>
            <input
              type="text"
              name = "workout_name"
              value = {workout_name}
              placeholder = {"Workout Name"}
              onChange={e => { 
                setName(e.target.value)
                setSavedMessage("") 
              }}
            />
            <textarea
              name = "workout_description" 
              value = {workout_description}
              placeholder = {"Workout Description"}
              onChange={e => { 
                setDesc(e.target.value)
                setSavedMessage("") 
              }}
            />
            <input type="submit" disabled={!workout_name} value="Save" />
            {savedMessage ? <p id = "awiSaved" className = "saved">{savedMessage}</p> : ""}
          </form>
        //</main>
          
        )
    else return <Navigate to ="/login?error=protected" /> 
}

export default AddWorkoutInfo