import "./Exercise.css"

const Exercise = ({exerciseName, numSets, numReps}) => {

    // Props should have exercise name, numSets, numReps
    return (
        <div className="Exercise">
            <div className="ExerciseName">{exerciseName}</div>
            <div className="ExerciseSets">{numSets}</div>
            <div className="ExerciseReps">{numReps}</div>
        </div>
    )
}

export default Exercise