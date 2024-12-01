1


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/EndPoints';
import LayOut from '../../components/LayOut/LayOut';
import ProductCard from '../../components/product/ProductsCard';
import Loader from '../../components/Loader/Loader';

function ProductDetail() {
 
  const [product, setProduct] = useState({});
  const[isLoading, setisLoading] = useState(false)
  const { productId } = useParams();

  useEffect(() => {
    setisLoading(true)// Fixed the missing backticks for template literals
    axios.get(`${productUrl}/Products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setisLoading(false)
      })
      .catch((err) => {
        console.error(err);
        setisLoading(false)
      });
  }, [productId]);

  return (
    <LayOut>
  {isLoading ? (<Loader />) : (<ProductCard product={product} 
  
  flex ={true}
  renderDesc={true}
  renderAdd={true}
  
  />)}
</LayOut>

  );
}

export default ProductDetail;
