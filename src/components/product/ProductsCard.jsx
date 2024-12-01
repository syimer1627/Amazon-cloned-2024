import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormate from '../CurrencyFormat/CurrencyFormate';
import classes from './Product.module.css'
import  {Link}  from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';

function ProductCard({ product,flex,renderDesc,renderAdd}) {
  const { image, title, id, rating, price, description, } = product;

const [state, dispatch] =useContext(DataContext)

 console.log(state)

const addToCart =()=>{
  dispatch({
    type: Type.ADD_TO_BASKET,
    item:{
      image, title, id, rating, price, description
    }
  })
}
 

  return (
    
    <div className={`${classes.card_container} ${flex ? classes.product_flexd : ""}`}>

      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img_container}/>
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{maxWidth:"750px"}}>{description}</div>}
        <div className={classes.rating}>
          {/* Rating component */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* Rating count */}
          <small>{rating?.count}</small>
       
      </div>
      <div>
        {/* Price formatting */}
        <CurrencyFormate amount={price} />
      </div>
      {
        renderAdd &&       <button className={classes.button} onClick={addToCart} >
        Add to cart
      </button>
      }


    </div>
    </div>
  );
}

export default ProductCard;


