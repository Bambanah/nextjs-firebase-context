import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { signup } from "../utils/auth";

const SignUp = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Sign up</h1>

      <Formik
        initialValues={{ email: "", password: "", password_confirm: "" }}
        validate={(values) => {
          const errors: { email?: string; password_confirm?: string } = {};

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (values.password !== values.password_confirm) {
            errors.password_confirm = "Passwords don't match";
          }

          return errors;
        }}
        onSubmit={(values) => {
          signup(values.email, values.password).then(() => {
            router.push("/");
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />

            <label htmlFor="password_confirm">Confirm Password</label>
            <Field type="password" name="password_confirm" />
            <ErrorMessage name="password_confirm" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>

      <Link href="login">
        <a>Login</a>
      </Link>
    </div>
  );
};

export default SignUp;
