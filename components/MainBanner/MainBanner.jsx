import Link from "next/link";
import React from "react";
import styles from "./MainBanner.module.css";
import { urlFor } from "../../library/client";
const MainBanner = ({
  banner: {
    buttonText,
    desc,
    discount,
    image,
    largeText2,
    largeText1,
    midText,
    smallText,
    product,
  },
}) => {
  return (
    <div className={styles.main_banner_containers}>
      <div className={styles.banner_info}>
        <span>Hoodie</span>
        <h2>Exclusive</h2>
        <h1>{product}</h1>
      </div>
      <img src={image && urlFor(image)} alt="jacket" />
      <div className={styles.banner_details}>
        <div className={styles.button_details}>
          <Link href="/itemDetails/the-tribe-winter-jacket">
            <button type="button" className={styles.button}>
              shop best item
            </button>
          </Link>
        </div>
        <div className={styles.desc}>
          <h3>The Tribe</h3>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
