import React, { Children, useEffect } from "react";
import styles from "./Layout.module.css";
import { NavigationBar, Footer, CartSection } from "./../../components/index";
import { useStateContext } from "../../contextForStates/ContextStates";
import { Toaster } from "react-hot-toast";
const Layout = ({ children }) => {
  const { toggleCartSection, setToggleCartSection } = useStateContext();
  return (
    <div className={styles.layout}>
      <NavigationBar />
      <Toaster />
      {!toggleCartSection && <div className={styles.main}>{children}</div>}
      {toggleCartSection && <CartSection />}
      <Footer />
    </div>
  );
};

export default Layout;
