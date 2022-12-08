import Image from "next/image";
import { getAllHospitals, getKey } from "../helpers/apiClient";
import styles from "../styles/home.module.scss";
import SearchLinks from "../components/links/Links";
import Header from "../components/header/head";
import { useSession } from "next-auth/react";

export default function Home(props) {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <div className={styles.container}>
      <Header title="Care Finder" />

      {/* Used to make the carefinder logo be not massive */}
      <main className={styles.main}>
        <div
          style={{
            position: "relative",
            height: "10%",
            width: "10%",
            paddingBottom: "10%",
          }}
        >
          <Image
            src={"/medLogo.png"}
            layout="fill"
            objectFit="contain"
            alt="Care Finder Logo"
          ></Image>
        </div>
        {/* Title */}
        <h1 className={styles.title}>Welcome to Care Finder</h1>

        {/* Navigation links to search for hospitals */}
        <SearchLinks />
      </main>
    </div>
  );
}

//Now that logins are authenticated, we can't get the hospital list this way :(
//Runs server side to pre-fill props in html before sending to the browser
//Nextjs automatically caches serverside props for faster performace
/*export async function getServerSideProps(context) {
  //Grab all the hospitals to get the length
  const key = await getKey();
  const hospitals = await getAllHospitals(key);

  //Only return the length of the array as the hospitals are not actually shown on the main page
  return {
    props: {
      hospitalsLength: hospitals.length,
    },
  };

  // Rest of `getServerSideProps` code
}*/
