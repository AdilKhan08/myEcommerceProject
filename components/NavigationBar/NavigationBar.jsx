import React, { useEffect } from "react";
import styles from "./NavigationBar.module.css";
import { AiOutlineShopping } from "react-icons/ai";
import { FaShopify } from "react-icons/fa";
import Link from "next/link";
import tribe from "./tribe.png";
import Image from "next/image";
import { useStateContext } from "../../contextForStates/ContextStates";
const NavBar = () => {
  const { toggleCartSection, setToggleCartSection, totalQuantity } =
    useStateContext();
  useEffect(() => {
    console.log(toggleCartSection);
  }, [toggleCartSection]);
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={tribe} alt="logo" width={90} height={25} />
        </Link>
      </div>

      <div
        className={styles.cart_icon}
        onClick={() => setToggleCartSection((prev) => !prev)}
      >
        <span>
          <FaShopify />
        </span>
        <span className={styles.quantity}>{totalQuantity}</span>
      </div>
    </div>
  );
};

export default NavBar;
