import "./Exercise.css"
import { useState, useEffect } from 'react'
import axios from "axios"
import React from 'react'

const Exercise = props => {
    // Give each exercise an index w/in the array to pass to database
    
    const [exercise_name, setName] = useState("")
    const [num_sets, setSets] = useState("")
    const [num_reps, setReps] = useState("")
    const [saveColor, setSaveColor] = useState("") 

    useEffect(() => { 
        setName(props.exercise_name) 
        setSets(props.num_sets)
        setReps(props.num_reps)
        setSaveColor("1px solid grey") 
      }, [props.exercise_name, props.num_sets, props.num_reps])

    const submitForm = e => {
        e.preventDefault() // prevent normal browser submit behavior
        axios
          .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/` + props.id, { //Change this to exercise, index
            exercise_name: exercise_name,
            num_sets: num_sets,  
            num_reps: num_reps
          })
          .catch((err) => { 
            console.error(err) 
            console.log("editing workout " + props.id + " has failed")
          })
          .then((response) => { 
            console.log("editing workout " + props.id + " has succeeded")
          })
          setSaveColor("1px solid grey") 
      }
    // Props should have exercise name, numSets, numReps
    return (
        // <div className="Exercise">
        //     <div className="ExerciseName">{exerciseName}</div>
        //     <div className="ExerciseSets">{numSets}</div>
        //     <div className="ExerciseReps">{numReps}</div>
        // </div>
        <form className="Exercise" onSubmit={submitForm}>
            {/* style={{border: saveColor}} */}
            <input
                className="ExerciseName"
                type="text"
                name = "exercise_name"
                value = {exercise_name}
                placeholder = {"Exercise name"}
                onChange={e => { 
                    setName(e.target.value)
                    setSaveColor("rgb(76, 78, 228)") 
                }}
            />
            <input
                className="ExerciseSets"
                type="text"
                name = "num_sets"
                value = {num_sets}
                placeholder = {"Sets"}
                onChange={e => { 
                    setSets(e.target.value)
                    setSaveColor("rgb(76, 78, 228)") 
                }}
            />
            <input
                className="ExerciseReps"
                type="text"
                name = "num_reps"
                value = {num_reps}
                placeholder = {"Reps"}
                onChange={e => { 
                    setReps(e.target.value)
                    setSaveColor("rgb(76, 78, 228)") 
                }}
            />
            <input 
                className="ExerciseSubmit" 
                type="submit" 
                // disabled={!(exercise_name && num_sets && num_reps)} 
                disabled={ // Every input needs a value, and at least one needs to differ from database
                    !((exercise_name && num_sets && num_reps) && 
                    ((exercise_name !== props.exercise_name) || 
                    (num_sets !== props.num_sets) ||
                    (num_reps !== props.num_reps)))
                }
                value="Save" 
                color={saveColor}
            />
            {/* {savedMessage ? <p id = "awiSaved" className = "saved">{savedMessage}</p> : ""} */}
      </form>
    )
}

export default Exercise