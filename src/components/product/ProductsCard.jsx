import React from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormate from '../CurrencyFormat/CurrencyFormate';
import classes from './Product.module.css'
import  {Link}  from 'react-router-dom';

function ProductCard({ img, title, id, rating, price }) {
  
  return (
    
    <div className={classes.card_container}>
      <Link to={`/products/${id}`}>
        <img src={img} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          {/* Rating component */}
          <Rating value={rating.rate} precision={0.1} />
          {/* Rating count */}
          <small>{rating.count}</small>
        </div>
      </div>
      <div>
        {/* Price formatting */}
        <CurrencyFormate amount={price} />
      </div>
      <button className={classes.button}>
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;



