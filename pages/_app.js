import "../styles/globals.css";
import React from "react";
import Layout from "../components/Layout/Layout";
import {  StateContext } from "../contextForStates/ContextStates";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StateContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </>
  );
}

export default MyApp;
