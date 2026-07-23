import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">Modern fitness tracking with React, Vite, Express, and MongoDB.</p>
        </header>

        <nav className="mb-4">
          <Link className="btn btn-primary me-2" to="/">Home</Link>
          <Link className="btn btn-outline-primary" to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to OctoFit Tracker</h2>
      <p>Build and track workouts, teams, and achievements from a modern multi-tier application.</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>This frontend is built with React 19, Vite, Bootstrap, and client-side routing.</p>
    </div>
  );
}

export default App;
