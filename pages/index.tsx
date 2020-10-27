import Head from "next/head";
import styles from "../styles/Home.module.css";

import { GetStaticPropsContext } from "next";
import { auth as firebaseAuth } from "../config/firebase";
import { useRouter } from "next/router";
import { useAuth } from "../components/context/AuthContext";
import Layout from "../components/context/Layout";

export default function Home() {
  const router = useRouter();

  const userId =
    firebaseAuth.currentUser != null ? firebaseAuth.currentUser.uid : "";

  const { authenticated, loadingAuthState } = useAuth();

  if (loadingAuthState) {
    return <div>Loading...</div>;
  }

  if (!authenticated && !loadingAuthState) {
    router.push("/login");
    return <div>Redirecting...</div>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Hello, {userId}!</h1>
        <a
          onClick={() => {
            firebaseAuth.signOut().then(() => {
              router.push("/login");
            });
          }}
          href="#"
        >
          Log out
        </a>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {},
  };
};
