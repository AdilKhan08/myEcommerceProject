import { BsBagCheckFill } from "react-icons/bs";
import React, { useEffect } from "react";
import styles from "../styles/Victory.module.css";
import Link from "next/link";
import { useStateContext } from "../contextForStates/ContextStates";
import { victoryFire } from "../library/utils";
import { BsCurrencyEuro } from "react-icons/bs";
const Victory = () => {
  const { setTotalQuantity, setTotalProductPrices, setCartItems } =
    useStateContext();
  useEffect(() => {
    setTotalProductPrices(0);
    setCartItems([]);
    setTotalQuantity(0);
    victoryFire();
  }, []);
  return (
    <div className={styles.victory_container}>
      <div className={styles.victory}>
        <h1>
          <BsBagCheckFill />
        </h1>
        <div className={styles.message}>
          <h1>Thank you so much for shopping</h1>
          <small>check your email for reciept</small>
        </div>
        <small>
          for any question, please email <span>abcdef@gmail.com</span>
        </small>
        <Link href="/">
          <button type="button">Continue shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default Victory;
