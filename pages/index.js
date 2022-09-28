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

export default function Home() {
  const [token, setToken] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const key = await getKey();
      setToken(key);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (token != null) {
        const hospitals = await getAllHospitals(token);
        if (hospitals != null) {
          setHospitals(hospitals);
        }
      }
    }
    fetchData();
  }, [token]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Care Finder</title>
        <meta name="description" content="Care Finder client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href={"/"} as={`/`}>
            Welcome to Care Finder
          </Link>
        </h1>

        <p>Very cool 👍</p>

        <SearchLinks />
      </main>
    </div>
  );
}
