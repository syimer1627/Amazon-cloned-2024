

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductsCard.jsx';
import classes from './Product.module.css';
import Loader from '../Loader/Loader.jsx';



function Product() {
  const [products, setProducts] = useState(); 
  const [isLoading, setisLoading] = useState(false);  

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        console.log(res);
        setProducts(res.data); 
        console.log(res.data)
        setisLoading(false);  // Use setisLoading to update the state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setisLoading(false);  // Use setisLoading to update the state
      });
  }, []); // Empty dependency array to only run once on mount

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products?.map((singleProduct) => (
            <ProductCard renderAdd ={true} product={singleProduct} key={singleProduct.id} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;


