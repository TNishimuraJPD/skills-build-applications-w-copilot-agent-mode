import { useEffect, useState } from 'react';
import { ApiResponse, Workout } from '../types';
import { getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const url = `${getApiBaseUrl()}/api/workouts/`;
        const response = await fetch(url);
        const result: ApiResponse<Workout> = await response.json();
        setWorkouts(Array.isArray(result.data) ? result.data : result.data.items ?? []);
      } catch (err) {
        setError('Unable to load workouts.');
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5>{workout.name}</h5>
                <p>{workout.description}</p>
                <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes} min</p>
                <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="mb-0"><strong>Trainer:</strong> {workout.trainer || 'TBD'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
