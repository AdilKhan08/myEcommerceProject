import React from "react";
import { MainBanner, Items, SecondaryBanner } from "../components";
import { client } from "../library/client";
import styles from "./../styles/Home.module.css"
const Home = ({ items, banners }) => {
  return (
    <>
      <MainBanner banner={banners && banners[0]} />
      <div className={styles.product_container}>
        <h1>Best Seller Products</h1>
        <p>speaker There are many variations passages</p>
        <div className={styles.Items}>
          {items?.map((item, i) => (
            <Items key={i} items={Items} />
          ))}
        </div>
      </div>
      <SecondaryBanner secondaryBanner={banners && banners[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const itemsQuery = '*[_type == "product"]';
  const items = await client.fetch(itemsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banners = await client.fetch(bannerQuery);

  return {
    props: { items, banners },
  };
};
export default Home;
