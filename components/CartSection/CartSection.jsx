import React, { useEffect } from "react";
import styles from "./CartSection.module.css";
import { urlFor } from "../../library/client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbBucket } from "react-icons/tb";
import Link from "next/link";
import { useStateContext } from "./../../contextForStates/ContextStates";
import { getStripe } from "./../../library/getStripe";
import { toast } from "react-hot-toast";
import { BsCurrencyEuro } from "react-icons/bs";

const CartSection = () => {
  const {
    cartItems,
    totalProductPrices,
    incItemFromCart,
    removeItem,
    setToggleCartSection,
  } = useStateContext();
  const checkoutHandler = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    if (response.statusCode === 500) return;

    const data = await response.json();
    toast.loading("Wait a Moment to redirecting....");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <div className={styles.cart_container}>
      <h1>
        You added to Cart <span>({cartItems?.length} items)</span>
      </h1>
      {cartItems?.map((item) => (
        <div className={styles.cart_items} key={item._id}>
          <div className={styles.img}>
            <img src={`${urlFor(item?.image[0])}`} width={140} height={140} />
          </div>
          <div className={styles.cart_info}>
            <div className={styles.cart_info_one}>
              <p>{item?.name}</p>

              <div className={styles.cart_quantity}>
                <span
                  className={styles.quantity_minus}
                  onClick={() => incItemFromCart(item, "decrease")}
                >
                  <AiOutlineMinus />
                </span>
                <span className={styles.quantity_icon}>{item?.quantity}</span>
                <span
                  className={styles.quantity_plus}
                  onClick={() => incItemFromCart(item, "increase")}
                >
                  <AiOutlinePlus />
                </span>
              </div>
            </div>
            <div className={styles.cart_info_two}>
              <span>
                <BsCurrencyEuro />
                {item?.price}
              </span>
              <div className={styles.delete}>
                <span onClick={() => removeItem(item._id)}>
                  <RiDeleteBin5Line />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {cartItems?.length < 1 && (
        <div className={styles.empty}>
          <span>
            <TbBucket />
          </span>
          <p>Your Shopping bag is empty</p>
          <Link href="/">
            <button
              type="button"
              onClick={() => setToggleCartSection((prev) => !prev)}
            >
              Shop items
            </button>
          </Link>
        </div>
      )}
      {cartItems?.length >= 1 && (
        <div className={styles.payment_section}>
          <div className={styles.total_price}>
            <p>Total Price :</p>
            <span>
              <BsCurrencyEuro />
              {totalProductPrices}
            </span>
          </div>
          <button
            type="button"
            className={styles.pay}
             onClick={checkoutHandler}
          >
            Pay with stripe
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSection;
