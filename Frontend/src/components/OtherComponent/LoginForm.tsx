import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 chars").required("Password is required"),
});

export default function LoginForm() {
  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log("Form Submitted:", values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">

            {/* Email Field */}
            <div>
              <Label>Email</Label>
              <Field
                name="email"
                as={Input}
                type="email"
                placeholder="Enter email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div>
              <Label>Password</Label>
              <Field
                name="password"
                as={Input}
                type="password"
                placeholder="Enter password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Please wait..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
