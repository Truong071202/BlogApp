import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { start, done } from "../services/nprogressService"; // Import nprogressService
import logo from "../img/DotBlog_domain_logo.png";
import "./css-responsive/navbar.scss";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };
  // Hàm xử lý click để bắt đầu thanh loading
  const handleLinkClick = (path) => {
    start();
    navigate(path);
    setTimeout(done, 500); // Hoặc một thời gian khác nếu cần
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" onClick={() => handleLinkClick("/")}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link
            className="link"
            to="/?cat=technology"
            onClick={() => handleLinkClick("/?cat=technology")}
          >
            <h6>TECHNOLOGY</h6>
          </Link>

          <Link
            className="link"
            to="/?cat=film"
            onClick={() => handleLinkClick("/?cat=film")}
          >
            <h6>FILM</h6>
          </Link>

          <Link
            className="link"
            to="/?cat=love"
            onClick={() => handleLinkClick("/?cat=love")}
          >
            <h6>LOVE</h6>
          </Link>
          <Link
            className="link"
            to="/?cat=art"
            onClick={() => handleLinkClick("/?cat=art")}
          >
            <h6>ART</h6>
          </Link>

          <Link
            className="link"
            to="/?cat=science"
            onClick={() => handleLinkClick("/?cat=science")}
          >
            <h6>SCIENCE</h6>
          </Link>

          <Link
            className="link"
            to="/?cat=music"
            onClick={() => handleLinkClick("/?cat=music")}
          >
            <h6>MUSIC</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={handleLogOut}>Logout</span>
          ) : (
            <Link
              className="link"
              to="/login"
              onClick={() => handleLinkClick("/login")}
              style={{ textTransform: "uppercase" }}
            >
              Login
            </Link>
          )}
          <span className="write">
            <Link
              className="link"
              to="/write"
              onClick={() => handleLinkClick("/write")}
              style={{ textTransform: "uppercase" }}
            >
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
