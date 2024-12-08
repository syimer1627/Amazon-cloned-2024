
import React, { useContext } from 'react';
import { CiSearch } from "react-icons/ci";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import { Link } from 'react-router-dom';
import LowerHeader from '../LowerHeader';
import { SlLocationPin } from "react-icons/sl";
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebse';


const Header =() =>{
const [{user,basket},dispatch] =useContext(DataContext)

const totalItem =basket?.reduce((amount,item)=>{
  return item.amount + amount
},0)
  return (
 
    
    <section className={classes.fixed}> 
    <section>
      <section className={classes.header_container}>
        {/* Logo and Delivery Section */}
        <div className={classes.logo_container}>
          <Link to="/">
            <img
              src=" https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
              //
            />
          </Link>
          <span>
          <SlLocationPin />
          </span>
          <div className={classes.delivery}>
           
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
          <CiSearch size={38}
          className={classes.search_icon} />
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
          <Link to={!user && "/auth"} >
          <div>
            {user ? (
             
             <>

              <p>Hello{user?.email?.split("@")[0]}</p>
              <span onClick ={()=>auth.signOut()}>Sign Out</span>
              </>
            ):(
              <>
              <p>Hello, Sign In</p>
              <span>Account & Lists</span>
              </>
              
            )
            }
          </div>
          
         
          </Link>

          {/* Orders */}
          <Link to="/orders" className={classes.orders}>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span >{totalItem}</span>
          </Link>
        </div>
      </section>
      <LowerHeader/>
    </section>
    </section>
   
  );
}

export default Header;





