



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Landing from './Landing/Landing';
// import SignIn from './Auth/Signup';
// import Payment from './Payment/Payment';
// import Orders from './Orders/Orders';
// import Cart from './Cart/Cart';
// import Results from './Result/Results';
// import ProductDetail from './ProductDetail/ProductDetail';


// function Routing() {
//   return (
//     <Router>

//     <Routes>
//       <Route path="/" element={<Landing />} />
//       <Route path="/auth" element={<SignIn />} />
//       <Route path="/payments" element={<Payment />} />
//       <Route path="/orders" element={<Orders />} />
//       <Route path="/category/:categoryName" element={<Results />} />

//       <Route path="/products/:productId" element={<ProductDetail />} />
//       <Route path="/cart" element={<Cart />} />
//     </Routes>

//     </Router>
//   );
// }

// export default Routing;



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing/Landing';
import Auth from './Auth/Auth';
import Payment from './Payment/Payment';
import Orders from './Orders/Orders';
import Cart from './Cart/Cart';
import Results from './Result/Results';
import ProductDetail from './ProductDetail/ProductDetail';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from '../components/ProtectedRoute';


const stripePromise = loadStripe('pk_test_51QSSWvLGabtaJh03Pungv62LYpa3E5fdvMwPvevTlIsD4bTL7ZJ5qAglryYzCcf9v1LOcvs3RVGl5m0fuqMapHF600mEJbsKQ0')

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/payments" 
        element={
          <ProtectedRoute msg={"you must log in to pay"} redirect={"/payments"}>

          <Elements stripe={stripePromise}>
          <Payment />
          </Elements>
          </ProtectedRoute>
         } />
        <Route path="/orders" element={
          
          <ProtectedRoute 
          msg={"you must log in to access your orders"} 
          redirect={"/orders"}>

          <Orders />
          </ProtectedRoute>
          
          } />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
