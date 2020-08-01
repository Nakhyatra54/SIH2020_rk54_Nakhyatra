import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../api/authapi";
import logo from "../assets/lol.png"

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark justify-content-around">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link mt-4" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "")}
          className="nav-link mt-4"
          to="/database"
        >
          Database
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/progress")}
          className="nav-link mt-4"
          to="/sendsms"
        >
          Alert system
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/progress")}
          className="nav-link"
          to="/cart"
        >
          <img src={logo} height="90px"/>
        </Link>
      </li>
      <li className="nav-item">
        <a
          style={currentTab(history, "/progress")}
          className="nav-link mt-4"
          href="https://github.com/Chailex"
        >
          Github
        </a>
      </li>
      {!isAutheticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link mt-4"
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link mt-4"
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAutheticated() && (
        <Fragment>
          <li className="nav-item">
            <span
              className="nav-link text-light  mt-4"
             
            >
              Team
            </span>
          </li>
           <li className="nav-item">
            <span
              className="nav-link text-warning  mt-4"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
          
        </Fragment>
       
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
