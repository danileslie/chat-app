import AuthImagePattern from "@/components/AuthImage";
import authStore from "@/store/authStore";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  User,
  Loader,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    passwordCopy: "",
  });

  const { signup, isSigningUp } = authStore();
  const validateForm = () => {
    if (!formData.userName.trim()) return toast.error("Username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 8)
      return toast.error("Password must be at least 8 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 group-hover:bg-gray-800/90 flex items-center justify-center transition-colors">
                <MessageSquare className="size-6 text-[--primary]" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-[--foreground]/60">
                Get started with your free account
              </p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block font-medium mb-1"> Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-[--foreground]/40" />
                </span>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 rounded-md bg-[--input] text-[--foreground] border border-[--border] focus:outline-none focus:ring-2 focus:ring-[--ring]"
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-[--foreground]/40" />
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 rounded-md bg-[--input] text-[--foreground] border border-[--border] focus:outline-none focus:ring-2 focus:ring-[--ring]"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="block font-medium mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-[--foreground]/40" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-10 py-2 rounded-md bg-[--input] text-[--foreground] border border-[--border] focus:outline-none focus:ring-2 focus:ring-[--ring]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-[--foreground]/40" />
                  ) : (
                    <Eye className="size-5 text-[--foreground]/40" />
                  )}
                </button>
              </div>
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-sky-500/10 text-[--primary-foreground] font-semibold hover:bg-gray-800/90 focus:outline-none focus:ring-2 focus:ring-[--ring] disabled:opacity-50 transition-colors"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          {/* Redirect */}
          <div className="text-center text-[--foreground]/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-[--primary] hover:text-[--primary]/80"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
