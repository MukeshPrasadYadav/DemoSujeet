import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import * as Yup from "yup";
import { useAuth } from "@/Providers/AuthProvide";

// Country Code Selector Component
const CountryCodeSelector = ({ value, onChange, countries, error, touched }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries.filter((country: any) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.callingCode.includes(searchTerm)
  );

  const selectedCountry = countries.find((c: any) => c.callingCode === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (callingCode: string) => {
    onChange({ target: { name: "countryCode", value: callingCode } });
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-1/3" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`border ${error && touched ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 cursor-pointer flex items-center justify-between h-10`}
      >
        <span className="text-sm truncate">
          {selectedCountry ? selectedCountry.callingCode : "Code"}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-64 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search country..."
            className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="overflow-y-auto max-h-48">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country: any) => (
                <div
                  key={country.code}
                  onClick={() => handleSelect(country.callingCode)}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-100 flex items-center gap-2"
                >
                  {country.flag && (
                    <img src={country.flag} alt={country.name} className="w-5 h-4 object-cover" />
                  )}
                  <span className="text-sm">
                    {country.name} <span className="text-gray-500">({country.callingCode})</span>
                  </span>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<{ name: string; code: string; callingCode: string; flag: string }[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated,setUser } = useAuth();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    countryCode: Yup.string().required("Country code is required"),
    phone: Yup.string()
      .matches(/^[0-9]{6,15}$/, "Enter a valid phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm your password"),
  });

  // Fetch country list with phone codes
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all?fields=name,cca2,flags,idd");
        const formatted = res.data
          .map((c: any) => ({
            name: c.name.common,
            code: c.cca2,
            flag: c.flags?.png,
            callingCode:
              c.idd?.root && c.idd?.suffixes
                ? `${c.idd.root}${c.idd.suffixes[0] || ""}`
                : "",
          }))
          .filter((c: any) => c.callingCode);
        setCountries(formatted.sort((a: any, b: any) => a.name.localeCompare(b.name)));
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Handle sign-up
  const handleSignUp = async (values: any) => {
    try {
      console.log(values);
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        values,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Sign Up Successful!");
        setIsAuthenticated(true);
        setUser(res.data.user);
        setTimeout(() => navigate("/profile", { replace: true }), 800);
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
          initialValues={{
            name: "",
            email: "",
            countryCode: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ values, handleChange, errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <Label className="text-gray-700 dark:text-gray-300">Name</Label>
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
                <Label className="text-gray-700 dark:text-gray-300">Email</Label>
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

              {/* Country Code + Phone */}
              <div className="flex flex-col gap-1">
                <Label className="text-gray-700 dark:text-gray-300">
                  Contact Number
                </Label>
                <div className="flex gap-2">
                  <CountryCodeSelector
                    value={values.countryCode}
                    onChange={handleChange}
                    countries={countries}
                    error={errors.countryCode}
                    touched={touched.countryCode}
                  />

                  <Field
                    as={Input}
                    name="phone"
                    placeholder="Phone number"
                    value={values.phone}
                    onChange={handleChange}
                    className="w-2/3"
                  />
                </div>
                {(errors.countryCode && touched.countryCode) || (errors.phone && touched.phone) ? (
                  <p className="text-sm text-red-600">
                    {errors.countryCode || errors.phone}
                  </p>
                ) : null}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1 relative">
                <Label className="text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Field
                    as={Input}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </div>
                </div>
                {errors.password && touched.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1 relative">
                <Label className="text-gray-700 dark:text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Field
                    as={Input}
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                  <div
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  >
                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </div>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
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