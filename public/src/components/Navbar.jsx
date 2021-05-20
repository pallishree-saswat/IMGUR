import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logOut } from "../redux/actions/userActions";
import "../styles/Navbar.css";

const button = {
  margin: "10px",
  height: "50px",
  width: "120px",
  float: "right",
};

const NavBar = ({ user, logOut, history,Favourites ,...restProps }) => {
  const handleLogout = () => {
    logOut();
    history.push("/login");
  };
  return (
    <div className="navbar">
      {user !== null ? (
        <div>
          <button style={button} onClick={handleLogout}>
            Logout
          </button>
          <Link to="/myfav">
            <button style={button}>Favourites</button>
          </Link>
          <Link to="/myphoto">
            <button style={button}>My photos</button>
          </Link>
          <Link to="/createpost">
            <button style={button}>Create</button>
          </Link>
          <Link to="/">
              <button style={button}>Home</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button style={button}>Login</button>
          </Link>
          <Link to="/register">
            <button style={button}>Register</button>
          </Link>
          <Link to="/">
              <button style={button}>Home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
    Favourites: storeState.favState.fav
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));