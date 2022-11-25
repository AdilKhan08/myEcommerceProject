import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../library/client";
import styles from "./../../styles/ItemDetails.module.css";
// import Image from "next/image";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsStarFill, BsCurrencyEuro, BsStarHalf, BsStar } from "react-icons/bs";
import Items from "../../components/Items/Items";
import { useStateContext } from "../../contextForStates/ContextStates";
import Link from "next/link";
const ItemsDetails = ({ singleProduct, products }) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    individualQuantity,setToggleCartSection,
    cartItems,
    addItemToCart,
  } = useStateContext();
  const [currentImage, setCurrentImage] = useState(0);
  const { image, price, name,slug, description } = singleProduct;

  return (
    <div className={styles.product_details_container}>
      <div className={styles.image_category_container}>
        <div className={styles.main_image}>
          <img
            src={`${urlFor(image && image[currentImage])}`}
            alt={name}
            width={380}
            height={380}
          />
        </div>
        <div className={styles.image_categories}>
          {image?.map((img, i) => (
            <div
              key={i}
              className={
                i === currentImage ? styles.active_image : styles.single_image
              }
            >
              <img
                src={`${urlFor(img)}`}
                alt={name}
                width={75}
                height={72}
                onMouseOver={(e) => setCurrentImage(i)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.product_info}>
        <div className={styles.basic_info}>
          <h1>{name}</h1>
          <div className={styles.review}>
            <span>
              <BsStarFill />
            </span>
            <span>
              <BsStarFill />
            </span>
            <span>
              <BsStarFill />
            </span>
            <span>
              <BsStarFill />
            </span>
            <span>
              <BsStarHalf />
            </span>
          </div>
          <span>Details:</span>
          <p>{description}</p>
        </div>
        <div className={styles.quantity_info_container}>
          <span>
            <BsCurrencyEuro />
            {price}
          </span>
          <div className={styles.quantity_info}>
            <span className={styles.quantity_text}>quantity :</span>
            <div className={styles.quantity}>
              <span
                className={styles.quantity_minus}
                onClick={() => decreaseQuantity()}
              >
                <AiOutlineMinus />
              </span>
              <span className={styles.quantity_icon}>{individualQuantity}</span>
              <span
                className={styles.quantity_plus}
                onClick={() => increaseQuantity()}
              >
                <AiOutlinePlus />
              </span>
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.add_to_card}
              onClick={() => addItemToCart(singleProduct, individualQuantity)}
            >
              Add to cart
            </button>
        
              <button type="button" className={styles.buy_now}  onClick={() => setToggleCartSection((prev) => !prev)}>
                Buy now
              </button>
      
          </div>
        </div>
      </div>
      <div className={styles.related_products}>
        <h1>You may like also</h1>
        <div className={styles.all_related_products}>
          {products?.map((product, i) => (
            <Items key={i} item={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug{
      current
    }
  }`;
  const productPath = await client.fetch(query);
  const paths = productPath?.map((product) => ({
    params: {
      slug: product?.slug?.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const query = `*[_type=="product"&& slug.current=='${slug}'][0]`;
  const singleProduct = await client.fetch(query);
  const productsQuery = '*[_type=="product"]';
  const products = await client.fetch(productsQuery);
  return {
    props: { singleProduct, products }, // will be passed to the page component as props
  };
};
export default ItemsDetails;
