import React from 'react'
import { IoMenuSharp } from "react-icons/io5";
import classes from "./Header/Header.module.css"
function LowerHeader() {
  return (

    <div className ={classes.lower_container}>
        <ul>
         <li><IoMenuSharp /></li> 
           <li><p>All</p></li>
           <li>Today's Deal</li>
           <li>Customer Service</li>
           <li>Registry</li>
           <li>Gift Cards</li>
           <li>Sell</li>
        </ul>
    </div>
  )
}

export default LowerHeader