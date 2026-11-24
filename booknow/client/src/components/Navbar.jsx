import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <Link to="/" className="logo">🎬 Book<span>Now</span></Link>
      <div className="links">
        <Link to="/">Movies</Link>
        {user ? (
          <>
            <Link to="/bookings">My Tickets</Link>
            <Link to="/profile">👤 {user.name.split(' ')[0]}</Link>
            <button className="btn ghost" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
