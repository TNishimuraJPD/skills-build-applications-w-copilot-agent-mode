import { useEffect, useState } from 'react';
import { ApiResponse, Team } from '../types';
import { getApiBaseUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const url = `${getApiBaseUrl()}/api/teams/`;
        const response = await fetch(url);
        const result: ApiResponse<Team> = await response.json();
        setTeams(Array.isArray(result.data) ? result.data : result.data.items ?? []);
      } catch (err) {
        setError('Unable to load teams.');
      }
    }

    fetchTeams();
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id} className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <p className="card-text"><strong>Members:</strong> {team.members?.map((member) => member.name).join(', ') || 'None'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
