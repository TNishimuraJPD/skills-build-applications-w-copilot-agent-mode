import { useEffect, useState } from 'react';
import { ApiResponse, LeaderboardEntry } from '../types';
import { getApiBaseUrl } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const url = `${getApiBaseUrl()}/api/leaderboard/`;
        const response = await fetch(url);
        const result: ApiResponse<LeaderboardEntry> = await response.json();
        setEntries(Array.isArray(result.data) ? result.data : result.data.items ?? []);
      } catch (err) {
        setError('Unable to load leaderboard.');
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li key={entry._id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold">{entry.user?.name || 'Unknown'}</div>
              <div>Points: {entry.totalPoints}</div>
            </div>
            <span className="badge bg-primary rounded-pill">Rank {entry.rank}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
