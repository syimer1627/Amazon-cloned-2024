




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductsCard.jsx';
import classes from './Product.module.css'

function Product() {
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        console.log(res);
        setProducts(res.data); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to only run once on mount

  return (
    <section className={classes.products_container}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          img={product.image} 
          title={product.title} 
          id={product.id} 
          rating={product.rating} 
          price={product.price} 
        />
      ))}
    </section>
  );
}

export default Product;




