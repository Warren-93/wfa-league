import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie'; // Used to manage login state via cookies



const Header = ({ user, setUser, setShowLogin, setShowRegister }) => {
  // Assumes setShowLogin and setShowRegister are passed from App.js to control modal visibility
  
  // Trigger login modal display
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  // Trigger register modal display
  const handleRegisterClick = () => {
    setShowRegister(true);
  };


  // Logout user, clear cookie, and update global user state
  const handleLogout = () => {
    Cookies.remove('user'); // Clear the user cookie
    setUser(null); // Update global user state to null, reflecting logged-out status
  };

  return (
      <div className='section'>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">Football League</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0">
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
                <NavLink className="nav-link" to="/players">Players</NavLink>

                {/* Conditional rendering based on user's role */}
                {user && user.role === 'admin' && (
                  <NavLink className="nav-link" to="/player/addPlayer">Add Player</NavLink>
                )}

                {/* Links visible only when user is logged in */}
                {user && (
                  <>
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                    <NavLink className="nav-link" to="/dashboard">Player Dashboard</NavLink>
                  </>
                )}
              </Nav>
              
              {/* Conditional rendering for login/register or logout options */}
              {!user ? (
                <>
                  <Button variant="outline-info" className="me-2" onClick={handleLoginClick}>Login</Button>
                  <Button variant="outline-info" onClick={handleRegisterClick}>Register</Button>
                </>
              ) : (
                <>
                  <span className="text-white me-2">Welcome, {user.name}</span>
                  <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
  );
}

export default Header;
