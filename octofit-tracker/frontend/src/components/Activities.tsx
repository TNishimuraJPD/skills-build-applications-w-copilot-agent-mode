import { useEffect, useState } from 'react';
import { ApiResponse, Activity } from '../types';
import { getApiBaseUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const url = `${getApiBaseUrl()}/api/activities/`;
        const response = await fetch(url);
        const result: ApiResponse<Activity> = await response.json();
        setActivities(Array.isArray(result.data) ? result.data : result.data.items ?? []);
      } catch (err) {
        setError('Unable to load activities.');
      }
    }

    fetchActivities();
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5>{activity.type}</h5>
                <p className="mb-1">{activity.notes}</p>
                <small>{new Date(activity.performedAt).toLocaleString()}</small>
              </div>
              <div className="text-end">
                <p className="mb-1">{activity.durationMinutes} min</p>
                <p className="mb-0">{activity.caloriesBurned} kcal</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
