import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  return (
    <div>
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
          auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then((res) => {
              console.log(res);
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
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
