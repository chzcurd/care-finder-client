import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { makeGET, proxyGET, proxyReq } from '../helpers/httpHelpers'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [token, setToken] = useState(null)

  useEffect(() => {

    async function fetchData() {
    let token = await proxyGET("https://www.knautzfamilywi.com/CareFinder-1.0.0/api/key/get");
    token = token.xml.key;
    setToken(token);
    }
      fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Care Finder</title>
        <meta name="description" content="Care Finder client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Care Finder
        </h1>

        <p>Very cool 👍</p>

        <p>Token:<br /> {token}</p>

      </main>
    </div>
  )
}
