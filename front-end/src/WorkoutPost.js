import './WorkoutPost.css';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const WorkoutPost = (props) => {
  return (
    <main id="WorkoutPost" className="Post-box">
      <div className="Workout-header">
        <b>
          <Link to={'/w/' + props.id} className="User-link">
            {props.name}
          </Link>
        </b>
        {props.playlist ? (
          <a className="User-link" href={props.playlist}>
            <HiOutlineMusicNote size="35px" />{' '}
          </a>
        ) : (
          ''
        )}
      </div>

      <p>{props.description}</p>
    </main>
  );
};

export default WorkoutPost;
