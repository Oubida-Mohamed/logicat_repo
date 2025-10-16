"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";

interface FormData {
  fname: string;
  email: string;
  password: string;
}

interface FormErrors {
  fname?: string;
  email?: string;
  password?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fname: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fname.trim()) {
      newErrors.fname = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    // Clear API error when user makes changes
    if (apiError) setApiError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      if (result.success) {
        setSuccessMessage(result.message || 'Registration successful!');
        // Reset form
        setFormData({
          fname: "",
          email: "",
          password: ""
        });
        // Optional: Redirect to login page or dashboard
        setTimeout(() => {
          window.location.href = '/login';
        }, 500);
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setApiError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            {/* API Error Message */}
            {apiError && (
              <div className="p-3 mb-4 text-sm text-error-500 bg-error-50 rounded-md">
                {apiError}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 mb-4 text-sm text-success-500 bg-success-50 rounded-md">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="sm:col-span-1">
                    <Label htmlFor="fname">
                      Full Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      disabled={isLoading}
                      aria-invalid={!!errors.fname}
                    />
                    {errors.fname && (
                      <p className="mt-1 text-sm text-error-500">{errors.fname}</p>
                    )}
                  </div>
                </div>
                
                {/* Email */}
                <div>
                  <Label htmlFor="email">
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error-500">{errors.email}</p>
                  )}
                </div>
                
                {/* Password */}
                <div>
                  <Label htmlFor="password">
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      aria-invalid={!!errors.password}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-error-500">{errors.password}</p>
                  )}
                </div>

                {/* Button */}
                <div>
                  <Button 
                    // type="submit" 
                    className="w-full bg-blue-900 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed" 
                    size="sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 sm:text-start">
                <a
                  href="/login"
                  className="text-brand-500 hover:text-brand-600"
                >
                  Already have an account?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}