import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = object({
    name: string().required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignUp = async (values: any) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        values,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Sign Up Successful!");
        setTimeout(() => navigate("/login", { replace: true }), 800);
      } else {
        toast.error("Sign Up Failed. Please try again.");
      }
    } catch (err) {
      console.error("Sign Up Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Create Your Account
        </h2>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ values, handleChange, errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <Label className="text-gray-700 dark:text-gray-300">
                  Name
                </Label>
                <Field
                  as={Input}
                  name="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <Label className="text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Field
                  as={Input}
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <Label className="text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>

              {/* Already have an account */}
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
