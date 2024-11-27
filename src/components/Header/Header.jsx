

import React from 'react';
import { CiSearch } from "react-icons/ci";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import { Link } from 'react-router-dom';
import LowerHeader from '../LowerHeader';
import { SlLocationPin } from "react-icons/sl";

function Header() {
  return (
    <>
      <section className={classes.header_container}>
        {/* Logo and Delivery Section */}
        <div className={classes.logo_container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
            />
          </Link>
          <div className={classes.delivery}>
            <span>
            <SlLocationPin />
            </span>
            <p>Delivered to</p>
            <span>Ethiopia</span>
          </div>
        </div>

        {/* Search Section */}
        <div className={classes.search}>
          <select name="category" id="category">
            <option value="all">All</option>
          </select>
          <input type="text" placeholder="Search" />
          <CiSearch className={classes.search_icon} />
        </div>

        {/* Right Links Section */}
        <div className={classes.order_container}>
          {/* Language Selector */}
          <div className={classes.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of the_United_States.svg.png"
              alt=""
 />
            <select name="language" id="language">
              <option value="EN">EN</option>
            </select>
          </div>

          {/* Account & Lists */}
          <Link to="/" >
            <p>Sign In</p>
            <span>Account & Lists</span>
          </Link>

          {/* Orders */}
          <Link to="/orders" className={classes.orders}>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span >0</span>
          </Link>
        </div>
      </section>
      <LowerHeader/>
    </>
  );
}

export default Header;





