import Head from "next/head";
import styles from "../styles/Home.module.css";
import nookies from "nookies";
import { firebaseAdmin } from "../config/firebaseAdmin";

import { GetServerSidePropsContext } from "next";
import { auth } from "../config/firebase";

export default function Home({ email }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello, {email}!</h1>
      <a
        onClick={() => {
          auth.signOut();
        }}
      >
        Log out
      </a>
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // the user is authenticated!
    const { email } = token;

    // FETCH STUFF HERE!! 🚀

    return {
      props: { email: email },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();

    return { props: {} as never };
  }
};
