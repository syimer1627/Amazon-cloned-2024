

import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import classes from '../Orders/orders.module.css'; // 
import { DataContext } from '../../components/DataProvider/DataProvider';
import { db } from '../../Utility/firebse';
import ProductCard from '../../components/product/ProductsCard';

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]); 'useState'

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).collection("orders").orderBy("created", "desc").onSnapshot((snapshot)=>{
       setOrders(
        snapshot.docs.map((doc)=>({
          id:doc.id,
          data:doc.data(),
        }))
       )
      })
    } else {
      setOrders([])
     
    }
  }, [user]); // Added 'user' as a dependency




  return (
    <div>
      <LayOut>
        <section className={classes.container}>
          <div className={classes.orders_container}>
            <h2>Your Orders</h2>

            
              {orders?.length == 0 && <div style ={{padding:"20px"}}>You don't have orders.</div>}
            
            {/* {ordered items} */}
            <div>
              {orders?.map((eachOrder, i) => (
                <div key={eachOrder.id}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard 
                      flex={true} 
                      product={order} 
                      key={order.id} 
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </LayOut>
    </div>
  );
  }
  
  export default Orders;
  
