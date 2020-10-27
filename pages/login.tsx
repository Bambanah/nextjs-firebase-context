import { Formik, Form, Field, ErrorMessage } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { login } from "../utils/auth";

import Link from "next/link";
import Layout from "../components/context/Layout";

const Login = () => {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <h1>Login</h1>

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: { email?: string } = {};

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          return errors;
        }}
        onSubmit={(values) => {
          login(values.email, values.password).then(() => {
            router.push("/");
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>

      <Link href="signup">
        <a>Sign up</a>
      </Link>
    </Layout>
  );
};

export default Login;
