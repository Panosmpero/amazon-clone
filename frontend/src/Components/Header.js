import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import publicIp from "public-ip";
import { useSelector } from "react-redux";

const Header = () => {
  const [country, setCountry] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const isAdmin = userInfo ? userInfo.isAdmin : false;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    const getCountry = async () => {
      let ip = await publicIp.v4();
      let url = await fetch(
        `http://api.ipstack.com/${ip}?access_key=${process.env.REACT_APP_IPSTACK}`
      );
      let data = await url.json();
      // console.log(data);
      let resultCountry = data.country_name ? data.country_name : "Not found!";

      setCountry(resultCountry);
    };
    // uncomment to get your country :D
    // getCountry();
  }, [country]);

  useEffect(() => {
  }, [userInfo])

  return (
    <>
      <header className="header">
        <div className="nav-belt">
          <div className="nav-left">
            <Menu>
              <Link to="/">Home</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/profile">Profile</Link>
              {isAdmin ? (<Link to="/products">Product Management</Link>) : null}
              
            </Menu>

            <div className="amazon-logo">
              <Link to="/">
                <img
                  src="amazon-logo.jpg"
                  width="100px"
                  height="40px"
                  alt="amazon logo"
                />
              </Link>
            </div>
          </div>
          <div className="nav-middle">
            <select className="custom-select" defaultValue="all">
              <option value="all">All</option>
              <option value="books">Books</option>
              <option value="computers">Computers</option>
              <option value="electronics">Electronics</option>
              <option value="movies">Movies</option>
              <option value="sports">Sports</option>
            </select>

            <input type="text" />
            <div className="nav-search">
              <i className="fas fa-search"></i>
            </div>
          </div>
          <div className="nav-right">

            <Link className="nav-link" to="/cart">
              <div className="nav-link-text">Cart</div>
              {cartItems.length > 0 && (
                <div className="nav-link-notification">
                  {cartItems.reduce((acc, x) => acc + x.qty, 0)}
                </div>
              )}              
            </Link>
            
            {userInfo ? (
              <Link to="/profile">
                <div className="nav-link-text">{userInfo.username}</div>
              </Link>
            ) : (
              <Link to="/signin">
                <div className="nav-link-text">Sign In</div>
              </Link>
            )}
          </div>
        </div>

        <div className="nav-extras">
          <div className="nav-extras-left">
            <i className="fas fa-map-marker-alt"></i>
            <div className="country">
              <p> Deliver to: </p>
              {country === "" ? (
                <span>loading...</span>
              ) : (
                <div className="country-result">
                  {country}
                  <div>
                    {/* https://stackoverflow.com/a/41078668/13266620 animation */}
                    {country !== "Not found!" ? (
                      <svg
                        className="checkmark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                      >
                        <circle
                          className="checkmark__circle"
                          cx="26"
                          cy="26"
                          r="25"
                          fill="none"
                        />
                        <path
                          className="checkmark__check"
                          fill="none"
                          d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                      </svg>
                    ) : (
                      <i className="fas fa-times-circle"></i>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="nav-extras-middle">
            <div>thing</div>
            <div>thing2</div>
            <div>thing3</div>
            <div>thing4</div>
          </div>
          <div className="nav-extras-right">
            <div>Shop Deals of the Day</div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
