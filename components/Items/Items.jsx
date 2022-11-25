import React from "react";
import styles from "./Items.module.css";
import { urlFor } from "./../../library/client";
import Link from "next/link";
import { BsCurrencyEuro } from "react-icons/bs";
const Items = ({ item: { description, image, name, slug, price } }) => (
  <Link href={`/itemDetails/${slug && slug.current}`}>
    <div className={styles.product_card}>
      <div className={styles.card}>
        <img
          src={`${urlFor(image[0])}`}
          alt={`${name}`}
          width={250}
          height={250}
          // className={styles.card_img}
        />
      </div>
      <div className={styles.card_info}>
        <span className={styles.product_name}>{name}</span>
        <span className={styles.product_price}>
          <BsCurrencyEuro />
          {price}
        </span>
      </div>
    </div>
  </Link>
);

export default Items;
