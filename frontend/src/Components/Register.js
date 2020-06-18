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

  useEffect(() => {
    if (userInfo) props.history.push("/signin")
  }, [props.history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
          {error && <div>{error}</div>}
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="name"
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
          <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
