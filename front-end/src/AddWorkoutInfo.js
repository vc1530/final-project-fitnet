import React from 'react'
import "./AddWorkoutInfo.css"
import { useState, useEffect } from 'react'
import axios from "axios"

const AddWorkoutInfo = props => { 

    // create a state variable for each form field
    const [workout_name, setName] = useState(props.workout_name)
    const [workout_description, setDesc] = useState(props.workout_description)

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
      //NEEDS axios stuff here
      console.log("NYI: submitForm, AddWorkoutInfo.js")
      axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/` + props.id, { 
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
    }

    return (
      //<main className="AddWorkoutInfo">
        <form className="AddWorkoutInfo-header" onSubmit={submitForm}>
          <input
            type="text"
            name = "workout_name"
            value = {workout_name}
            placeholder = {"Workout Name"}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            name = "workout_description" 
            value = {workout_description}
            placeholder = {"Workout Description"}
            onChange={e => setDesc(e.target.value)}
          />
          <input type="submit" disabled={!workout_name} value="Save" />
        </form>
      //</main>
        
      )
}

export default AddWorkoutInfo