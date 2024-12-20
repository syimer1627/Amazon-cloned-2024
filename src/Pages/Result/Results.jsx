


import classes from './Results.module.css';
import LayOut from '../../components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/EndPoints';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/product/ProductsCard';

function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();

  console.log('Category:', categoryName);

  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)

      .then((res) => {
        console.log('API Response:', res.data);
        setResults(res.data);
      })
      .catch((err) => {
        console.error('API Error:', err);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: '30px' }}>Results</h1>
        <p style={{ padding: '30px' }}>Category/{categoryName}</p>
        <hr />
        <div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              renderAdd={true}
            />
          ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;

