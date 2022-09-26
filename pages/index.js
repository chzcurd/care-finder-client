import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { makeGET, proxyGET, proxyReq } from "../helpers/httpHelpers";
//import styles from '../styles/Home.module.css'
import styles from "../styles/home.module.scss";

export default function Home() {
  const [token, setToken] = useState(null);

  const [WIHospital, setWIHospital] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let token = await makeGET("/api/key/get");
      console.log(token);
      token = token.xml.key;
      let create = await makeGET("/api/key/create/" + token + "/5/5");
      console.log(create);
      setToken(token);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (token != null) {
      async function fetchData() {
        let resp = await makeGET("/api/hospitals", token);
        if (resp == null) {
          setWIHospital("Error fetching data!");
        } else {
          const itemArray = resp.xml.item;
          let hospitalNames = [];
          itemArray.forEach((item) => {
            console.log(item);
            hospitalNames.push(item.hospital_name);
          });
          setWIHospital(hospitalNames);
        }
      }
      fetchData();
    }
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

        <p>Very cool 👍</p>

        <p className={`${styles.tac}`}>
          apiKey:
          <br />
          {token}
        </p>

        <p className={`${styles.tac}`}>
          Hospital Names:
          <br />
          {WIHospital?.toString()}
        </p>
      </main>
    </div>
  );
}
