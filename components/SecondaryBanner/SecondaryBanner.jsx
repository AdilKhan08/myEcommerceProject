import React from "react";
import styles from "./SecondaryBanner.module.css";
import { urlFor } from "./../../library/client";
import Link from "next/link";
const SecondaryBanner = ({
  secondaryBanner: {
    buttonText,
    desc,
    discount,
    image,
    largeText2,
    largeText1,
    midText,
    smallText,
    saleTime,
    product,
  },
}) => {
  return (
    <div className={styles.foot_banner}>
      <div className={styles.info_one}>
        <span>{discount}</span>
        <h1>{largeText1}</h1>
        <h1>{largeText2}</h1>
        <small>{saleTime}</small>
      </div>
      <img src={`${image && urlFor(image)}`} alt={product} />
      <div className={styles.info_two}>
        <span>{smallText}</span>
        <h1>{midText}</h1>
        <p>{desc}</p>
        <Link href={`/itemDetails/the-tribe-winter-jacket`}>
          <button type="button">{buttonText}</button>
        </Link>
      </div>
    </div>
  );
};

export default SecondaryBanner;
