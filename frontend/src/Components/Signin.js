import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) props.history.push("/");
  }, [props.history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-container">
        <div>
          <h3>Sign-In</h3>
        </div>
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
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
          <button type="submit">Sign-In</button>
        </div>
        <div>New to amazon?</div>
        <div>
          <Link to="/register" >
            <button>Create an account</button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Signin;
