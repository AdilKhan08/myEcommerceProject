import React from "react";
import styles from "./Footer.module.css";
import { MdOutlineCopyright } from "react-icons/md";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FiLinkedin } from "react-icons/fi";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.copyRight}>
        <span>
          <MdOutlineCopyright />
        </span>
        <h3>2022 Phanox All Rights Reserved</h3>
      </div>
      <div className={styles.icons}>
        <span>
          <AiFillInstagram />
        </span>
        <span>
          <AiOutlineTwitter />
        </span>
        <span>
          <FiLinkedin />
        </span>
      </div>
    </div>
  );
};

export default Footer;
