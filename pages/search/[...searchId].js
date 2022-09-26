import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { makeGET, proxyGET, proxyReq } from "../../helpers/httpHelpers";
import { getAllHospitals, getKey } from "../../helpers/apiClient";
import ShowHospital from "../../components/hospitalDisplays/ShowHospital";
import styles from "../../styles/home.module.scss";
import { CircularProgress } from "@mui/material";

const routeLengthMap = {
  id: 2,
  city: 2,
  state: 2,
  county: 2,
  citystate: 3,
  name: 2,
};

export default function Home(props) {
  const [token, setToken] = useState(null);
  const [hospitals, setHospitals] = useState(null);
  const searchType = props.searchId[0];

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
        <h1 className={styles.title}>Welcome to Care Finder</h1>

        <p>{props.searchId.length}</p>

        {(!token || !hospitals) && <CircularProgress />}

        <p className={`${styles.tac}`}>
          apiKey:
          <br />
          {token}
        </p>

        {hospitals && (
          <div className={styles.tac}>
            <h1>Hospitals: </h1>
            {hospitals.map((hospital) => (
              <ShowHospital hospital={hospital} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const searchId = context.params.searchId;

  if (searchId.length < 1) {
    return {
      notFound: true,
    };
  }
  const searchType = searchId[0];

  const validLength = routeLengthMap[searchType];

  if (searchType != undefined && searchId.length === validLength) {
    return {
      props: {
        searchId: searchId,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }

  // Rest of `getServerSideProps` code
}
