import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🎬 MovieRec
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Search</Link>
              <Link to="/library" className="nav-link">My Library</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;