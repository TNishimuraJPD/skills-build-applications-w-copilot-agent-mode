import { useEffect, useState } from 'react';
import { ApiResponse, User } from '../types';
import { getApiBaseUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const url = `${getApiBaseUrl()}/api/users/`;
        const response = await fetch(url);
        const result: ApiResponse<User> = await response.json();
        setUsers(Array.isArray(result.data) ? result.data : result.data.items ?? []);
      } catch (err) {
        setError('Unable to load users.');
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {users.map((user) => (
          <div key={user._id} className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <p className="card-text"><strong>Role:</strong> {user.role}</p>
                <p className="card-text"><strong>Goals:</strong> {user.goals}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
