import React from "react";
import "./Categories.css";

import MenuIcon from "./images/menu.png";

const Categories = () => {
  return (
    <div className="categories__navbar">
      <div className="categories__names">
        <p>All</p>
        <p>Best Sellers</p>
        <p>Mobiles</p>
        <p>Prime</p>
        <p>Fashion</p>
        <p>Electronics</p>
        <p>New Releases</p>
        <p>Customer Service</p>
        <p>Amazon Pay</p>
        <p>Computers</p>
        <p>Home Kitchen</p>
        <p>Toy Games</p>
        <p>Today's Deals</p>
        <p>Books</p>
        <p>Sell</p>
        
      </div>
      <img alt="Prime is free delivery, movies and more" src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2020/June/gaming-swm._CB430661085_.jpg"></img>
    </div>
  );
};

export default Categories;
