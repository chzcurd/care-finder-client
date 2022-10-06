import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { makeGET, proxyGET, proxyReq } from "../helpers/httpHelpers";
import { getAllHospitals, getKey } from "../helpers/apiClient";
import ShowHospital from "../components/hospitalDisplays/ShowHospital";
import styles from "../styles/home.module.scss";
import { CircularProgress } from "@mui/material";
import SearchLinks from "../components/links/Links";
import Link from "next/link";
import Header from "../components/header/head";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Header title="Care Finder" />

      <main className={styles.main}>
        <div
          style={{
            position: "relative",
            height: "10%",
            width: "10%",
            paddingBottom: "10%",
          }}
        >
          <Image src={"/medLogo.png"} layout="fill" objectFit="contain"></Image>
        </div>
        <h1 className={styles.title}>Welcome to Care Finder</h1>

        {props.hospitalsLength && (
          <p>Over {props.hospitalsLength} hospitals stored!</p>
        )}

        <SearchLinks />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const key = await getKey();
  const hospitals = await getAllHospitals(key);

  return {
    props: {
      hospitalsLength: hospitals.length,
    },
  };

  // Rest of `getServerSideProps` code
}
