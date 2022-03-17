
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./Home.js"
import AddExercise from "./AddExercise.js"
import AddWorkout from "./AddWorkout.js"
import MyProfile from "./MyProfile.js"
import Feed from "./Feed.js"
import UserProfile from "./UserProfile.js" 
import WorkoutHistory from "./WorkoutHistory.js"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addExercise" element={<AddExercise />} />
        <Route path="/addWorkout" element={<AddWorkout />} />
        <Route path= "/Feed" element = {<Feed />} />
        <Route path="/:username" element={<UserProfile />} />
        <Route path="/workoutHistory" element={<WorkoutHistory />} />
        <Route path="/myProfile" element={<MyProfile />} /> 
      </Routes>
    </Router>
  )
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App
