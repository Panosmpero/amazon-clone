import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import publicIp from "public-ip";

const Header = () => {
  const [country, setCountry] = useState("");

  useEffect(() => {

    const getCountry = async () => {

      let ip = await publicIp.v4();
      let url = await fetch(
        `http://api.ipstack.com/${ip}?access_key=${process.env.REACT_APP_IPSTACK}`
      );
      let data = await url.json();
      console.log(data)
      let resultCountry = data.country_name
        ? data.country_name
        : "Not found!"
      
      setCountry(resultCountry);
    };
    // uncomment to get your country
    // getCountry();

  }, [country]);

  return (
    <>
      <header className="header">        
        <div className="nav-belt">
          <div className="nav-left">

            <Menu>
              {/* <a>test1</a>
              <a>test2</a>
              <a>test3</a> */}
            </Menu>

            <div className="amazon-logo">
              <Link to="/">
                <img src="amazon-logo.jpg" width="100px" height="40px" alt="amazon logo"/>
              </Link>
            </div>

          </div>
          <div className="nav-middle">

            <select className="custom-select" defaultValue="all" >
              <option value="all" disabled >All</option>
              <option value="books">Books</option>
              <option value="computers">Computers</option>
              <option value="electronics">Electronics</option>
              <option value="movies">Movies</option>
              <option value="sports">Sports</option>
            </select>

            <input type="text"/>
            <div className="nav-search">              
              <i className="fas fa-search"></i>
            </div>
          </div>
          <div className="nav-right">
            <div>Links</div>
          </div>
        </div>

        <div className="nav-extras">
          <div className="location">
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
                    </svg>) : <i className="fas fa-times-circle"></i>}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="most-wanted">
            <div>thing</div>
            <div>thing2</div>
            <div>thing3</div>
            <div>thing4</div>
          </div>
          <div className="deals">
            <div>Shop Deals of the Day</div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
