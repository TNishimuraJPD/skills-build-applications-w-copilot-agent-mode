import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">Modern fitness tracking with React, Vite, Express, and MongoDB.</p>
        </header>

        <nav className="mb-4 d-flex flex-wrap gap-2">
          <Link className="btn btn-primary" to="/">Home</Link>
          <Link className="btn btn-outline-primary" to="/users">Users</Link>
          <Link className="btn btn-outline-primary" to="/teams">Teams</Link>
          <Link className="btn btn-outline-primary" to="/activities">Activities</Link>
          <Link className="btn btn-outline-primary" to="/leaderboard">Leaderboard</Link>
          <Link className="btn btn-outline-primary" to="/workouts">Workouts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to OctoFit Tracker</h2>
      <p>Use the navigation above to explore the multi-tier fitness tracker.</p>
      <p>
        If you are running in Codespaces, set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to enable the Codespaces API URL.
      </p>
    </div>
  );
}

export default App;
