import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";

export default function Home() {
  const auth = useContext(AuthContext);

  console.log(auth);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello, {auth.user}!</h1>
    </div>
  );
}
