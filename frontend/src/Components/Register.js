import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();
  
  // pathname: signin, search: ?redirect=shipping
  const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

  useEffect(() => {
    // if (userInfo) props.history.push("/signin");
    if (userInfo) props.history.push(redirect);
  }, [props.history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== rePassword) return alert("Passwords do not match!")
    dispatch(register(username, email, password));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-container">
        <div>
          <h3>Create Account</h3>
        </div>
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error.msg}</div>}
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
        <div>
          Already have an account?
          <Link to={redirect === "/" ? "/signin" : `/signin?redirect=${redirect}`} >          
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
