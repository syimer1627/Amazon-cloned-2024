import React, { useContext } from 'react';
import classes from './Cart.module.css';
import LayOut from '../../components/LayOut/LayOut';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/product/ProductsCard';
import { Link } from 'react-router-dom';
import CurrencyFormate from '../../components/CurrencyFormat/CurrencyFormate';
import { Type } from '../../Utility/action.type';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Calculate total price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  // Increment item amount
  const increment = (item) => {
    console.log('Incrementing:', item);
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  // Decrement item amount or remove from basket
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <div>
      <LayOut>
        <section className={classes.container}>
          <div className={classes.cart_container}>
            <h2>Hello</h2>
            <h3>Your shopping basket</h3>
            <hr />
            {basket?.length === 0 ? (
              <p>Oops! No item in your cart</p>
            ) : (
              basket.map((item, i) => (
                <section className={classes.cart_product}>
                
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={classes.btn_container}>
                    <button  className={classes.btn} onClick={() => increment(item)}>
                    <MdKeyboardArrowUp size ={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button className={classes.btn} onClick={() => decrement(item.id)}>
                    <MdKeyboardArrowDown size ={20}/>
                    </button>
                  </div>
                </section>
              ))
            )}
          </div>

          {basket?.length !== 0 && (
            <div className={classes.subtotal}>
              <div>
                <p>Subtotal ({basket?.length} items)</p>
                <CurrencyFormate amount={total} />
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/payments">Continue to checkout</Link>
            </div>
          )}
        </section>
      </LayOut>
    </div>
  );
}

export default Cart;


