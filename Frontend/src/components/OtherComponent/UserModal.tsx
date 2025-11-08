"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field } from "formik";
import { object, number } from "yup";
import axios from "axios";
import { toast } from "sonner";

interface UserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id:string
    name: string;
    email: string;
    userType: string;
    wallet: {
      balance: number;
    };
  };
  setRefresh: (res: boolean) => void; 
}

const UserModal: React.FC<UserModalProps> = ({ open, onOpenChange, user, setRefresh }) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = object({
    amount: number().required("Amount is required").min(0, "Amount cannot be negative"),
  });

  const initialValues = {
    amount: user.wallet.balance,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/users/changeAmount`,
        { userId: user._id, amount: values.amount },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Amount updated successfully!");
        onOpenChange(false);
        setRefresh(true);
      } else {
        toast.error("Failed to update amount.");
        setRefresh(false);
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update User Wallet</DialogTitle>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="flex flex-col gap-1">
                <Label>Full Name</Label>
                <Input value={`${user.name}` } disabled />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <Label>Email</Label>
                <Input value={user.email} disabled />
              </div>

              {/* User Type */}
              
              {/* Amount */}
              <div className="flex flex-col gap-1">
                <Label>Amount</Label>
                <Field
                  as={Input}
                  type="number"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                />
                {errors.amount && touched.amount && (
                  <p className="text-sm text-red-600">{errors.amount}</p>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                  Back
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
