/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: any) => void;
}

const CreateAdminModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔄 Modal খুললেই form reset
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({ name: "", email: "", password: "", address: "" });
      setErrors({ name: "", email: "", password: "" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // typing করলে error remove
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    let newErrors = { name: "", email: "", password: "" };
    let hasError = false;

    if (!form.name) {
      newErrors.name = "Name is required";
      hasError = true;
    }
    if (!form.email) {
      newErrors.email = "Email is required";
      hasError = true;
    }
    if (!form.password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    onSubmit(form);

    // successfully submit এ form reset
    setForm({ name: "", email: "", password: "", address: "" });
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", password: "", address: "" });
    setErrors({ name: "", email: "", password: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-96 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold">Create Admin</h2>

        {/* Name */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={form.name}
            onChange={handleChange}
            className={`w-full border px-2 py-1 rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            className={`w-full border px-2 py-1 rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={form.password}
            onChange={handleChange}
            className={`w-full border px-2 py-1 rounded ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminModal;
