"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HomeIcon } from "@radix-ui/react-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");

    try {
      const { data } = await axios.post("/api/auth", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Store user info in localStorage (optional)
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      // Set error message from backend or handle network error
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 flex flex-col gap-2 mt-10 bg-gray-50 min-h-screen">
      <Link
        href="/"
        className="flex items-center p-4 ml-5 w-fit bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
      >
        <HomeIcon className="inline-block text-blue-700 h-6 w-6" />
        <span className="ml-3 text-sm font-medium text-gray-900">Home</span>
      </Link>
      <div className="w-full md:w-1/3 mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Login to Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form className="space-y-6">
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                        ${
                          touched.email && errors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                        ${
                          touched.password && errors.password
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        name="remember"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        href="/forgot-password"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      {`Don't have an account?`}
                      <Link
                        href="/register"
                        className="text-blue-600 hover:text-blue-500 ml-1"
                      >
                        Register here
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
