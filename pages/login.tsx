import { Formik } from "formik";
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
        {({
          values,
          errors,
          touched,

          handleChange,
          handleBlur,
          handleSubmit,

          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            {errors.email && touched.email && errors.email}

            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            {errors.password && touched.password && errors.password}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
