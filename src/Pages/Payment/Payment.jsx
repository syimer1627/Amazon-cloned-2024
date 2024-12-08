




import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/product/ProductsCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormate from "../../components/CurrencyFormat/CurrencyFormate";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebse";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payments() {
  const [{ user, basket },dispatch] = useContext(DataContext);
  console.log(user);

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0) || 0;

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        console.error("User not logged in");
        return;
      }

      setProcessing(true);

      // Step 1: Backend function to get the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      if (!clientSecret) {
        throw new Error("Client secret not received");
      }

      // Step 2: Confirm the payment on the client side
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // Step 3: Save order to Firestore and clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        
dispatch({type:Type.EMPTY_BASKET})
      

      setProcessing(false);
      
      navigate("/orders", { state: { msg: "You have placed a new order" } });

    } catch (error) {
      console.error("Payment failed:", error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      {/* Payment Section */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* Product List */}
        <div className={classes.flex}>
          <h3>Review Items</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} key={item.id} />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment Form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_detail}>
              <form onSubmit={handlePayment}>
                {/* Error Message */}
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}

                {/* Card Element */}
                <CardElement onChange={handleChange} />

                {/* Price and Submit Button */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order | <CurrencyFormate amount={total} />
                    </span>
                  </div>
                  <button
                    type="submit"
                    className={classes.button}
                    disabled={processing}
                  >
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payments;
