import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/Providers/AuthProvide";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const[error,setError]=useState(null);
  const { setUser, isLoading, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const validationSchema = object({
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  const handleLogin = async (values: any) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        values,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.user);
        console.log("User data after login:", res.data.user);
        toast.success("Login Successful!");
        setIsAuthenticated(true);
        navigate("/");
        
      }
       else {
        setError(res.data.message)
        toast.error("Invalid credentials");
      }
    } catch (error) {
      setError("Invalid Credentials")
      toast.error("Login failed. Try again.");
    } finally {
      
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Login to Your Account
        </h2>
        {error&& <h2 className="text-red-600 py-2 text-center">{error}</h2>}
    
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ values, handleChange, errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-5">
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">
                Don’t have an account?{" "}
                <Link
                  to="/signUp"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
