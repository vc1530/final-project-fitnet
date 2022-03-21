import { useParams } from "react-router-dom";
import { useState } from 'react'
import "./AddWorkoutInfo.css"
import workout_database from './mock_workouts.json'

const AddWorkoutInfo = () => {
    // create a state variable for each form field
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    /**
    * A nested function that is called when the user submits the form to save a new Workout.
    * @param {*} e
    */
    const submitForm = e => {
    e.preventDefault() // prevent normal browser submit behavior
    //NEEDS axios stuff here
    console.log("NYI: submitForm, AddWorkoutInfo.js")
    setTitle('')
    setDesc('')
    }

    let workouts = workout_database; 
    let params = useParams(); 
    const workout = workouts.find(x=>x.id == params.id); 

    return (
      <main className="AddWorkoutInfo">
        <form className="AddWorkoutInfo-header" onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Workout title"
            defaultValue = {workout.workout_name} 
            onChange={e => setTitle(e.target.value)}
            //value={title}
          />
          <textarea
            placeholder="Workout description"
            defaultValue={workout.workout_description}
            onChange={e => setDesc(e.target.value)}
            //value={desc}
          />
          <input type="submit" disabled={!title && !desc} value="Save" />
        </form>
      </main>
        
      )
}

export default AddWorkoutInfo