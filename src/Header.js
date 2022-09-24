import React from "react";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import "./Header.css";
import AmazonLogo from "./AmazonLogo.png";
import Location from "./images/LocationNew.png";

import SearchIcon from "@material-ui/icons/Search";

import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  customWidth: {
    maxWidth: 300,
  },
  noMaxWidth: {
    maxWidth: "none",
  },
}));

const longText = () => {
  <div>
    <h1>This is Header</h1>
    <p>This is Text</p>
  </div>
}

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  const classes = useStyles();

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
          alt="AmazonLogo"
        />
      </Link>
      <div className="location">
        <div className="location__Image">
          <img className="header__locationImage" src={Location} alt="L" />
        </div>
        <div className="header__location">
          <span className="header__locationLineOne">Hello</span>
          <span className="header__locationLineTwo">Select your address</span>
        </div>
      </div>

      <div className="header__search">
        <button className="header__searchCategories">
          All <ArrowDropDownIcon />
        </button>
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__language">
        <Tooltip title={longText}>
          <p className={classes.button}>
            🇮🇳 <ArrowDropDownIcon style={{ color: "white" }} />{" "}
          </p>
        </Tooltip>
      </div>

      <div className="header__nav">
        <Link style={{ textDecoration: "none" }} to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello, {!user ? " Sign In" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Account & Lists"}
            </span>
          </div>
        </Link>

        <Link style={{ textDecoration: "none" }} to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">And Orders</span>
          </div>
        </Link>

        {/* <div className="header__option">
                    <span className="header__optionLineOne">
                        Your
                    </span>
                    <span className="header__optionLineTwo">
                        Prime
                    </span>
                </div> */}

        <Link style={{ textDecoration: "none" }} to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
