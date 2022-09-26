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
          });
          setWIHospital(itemArray);
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

        {WIHospital && (
          <div className={styles.tac}>
            <h1>Hospitals: </h1>
            {WIHospital.map((hospital) => {
              return (
                <div>
                  <h2>{hospital.hospital_name}:</h2>
                  <p>provider_id: {hospital.provider_id}</p>
                  <p>hospital_name: {hospital.hospital_name}</p>
                  <p>address: {hospital.address}</p>
                  <p>city: {hospital.city}</p>
                  <p>state: {hospital.state}</p>
                  <p>zip_code: {hospital.zip_code}</p>
                  <p>county_name: {hospital.county_name}</p>
                  <p>phone_number: {hospital.phone_number}</p>
                  <p>hospital_type: {hospital.hospital_type}</p>
                  <p>hospital_ownership: {hospital.hospital_ownership}</p>
                  <p>
                    emergency_services: {hospital.emergency_services.toString()}
                  </p>
                  <p>human_address: {hospital.human_address}</p>
                  <p>latitude: {hospital.latitude}</p>
                  <p>longitude: {hospital.longitude}</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
