import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import '../App.css'
import { signin, authenticate, isAutheticated } from "../api/authapi";
import Menu from "./Menu";

const Signin = () => {
  const [values, setValues] = useState({
    email: "chailexsarma@gmail.com",
    password: "123456",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        // if (data.error) {
        //   setValues({ ...values, error: data.error, loading: false });
        // } else {
          setValues({ ...values, loading: false });
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          })
          console.log("Sign in successful")
        // }
      })
      .catch((error) => console.log(`Sign in request failed ${error}`));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/database" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
   
    <div className="container-fluid m-0 p-0 bg-dark" style={{height:"100vh"}}>
      <Menu/>
    <div className="jumbotron bg-dark text-white text-center mb-0" >
      <h2 className="display-4">Sign In page</h2>
      <p className="lead">A page for user to sign in!</p>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}

      <div class="text-center text-light mt-5 pt-5">
            <p>&copy; Nakhyatra 2020</p>
          </div>
    </div>
      
  </div>
  );
};

export default Signin;
