import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          FunBook
        </Link>

        {currentUser ? (
          <div className="header-nav">
            <Link to="/post/new" className="new-post-btn">
              New Post
            </Link>
            <Link to="/profile" className="profile-link">
              {currentUser.profilePicture ? (
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="profile-img"
                />
              ) : (
                <div className="profile-placeholder">
                  {currentUser.name.charAt(0)}
                </div>
              )}
              <span>{currentUser.name}</span>
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
