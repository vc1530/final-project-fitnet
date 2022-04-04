import React from 'react'
import "./AddWorkoutInfo.css"
import { useState } from 'react'
import axios from "axios"

function AddWorkoutInfo (props) {

    const workout = props.workout 

    // create a state variable for each form field
    const [workout_name, setName] = useState(workout.workout_name)
    const [workout_description, setDesc] = useState(workout.workout_description)
    /**
    * A nested function that is called when the user submits the form to save a new Workout.
    * @param {*} e
    */
    const submitForm = e => {
      e.preventDefault() // prevent normal browser submit behavior
      //NEEDS axios stuff here
      console.log("NYI: submitForm, AddWorkoutInfo.js")
      axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/` + workout.id, { 
          workout_name: workout_name,
          workout_description: workout_description,  
        })
        .catch((err) => { 
          console.error(err) 
          console.log("editing workout " + workout.id + " has failed")
        })
        .then((response) => { 
          console.log("editing workout " + workout.id + " has succeeded")
        })
    }

    return (
      //<main className="AddWorkoutInfo">
        <form className="AddWorkoutInfo-header" onSubmit={submitForm}>
          <input
            type="text"
            name = "workout_name"
            value = {workout_name}
            placeholder = {workout.workout_name}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            name = "workout_description" 
            value = {workout_description}
            placeholder = {workout.workout_description}
            onChange={e => setDesc(e.target.value)}
          />
          <input type="submit" disabled={!workout_name} value="Save" />
        </form>
      //</main>
        
      )
}

export default AddWorkoutInfo