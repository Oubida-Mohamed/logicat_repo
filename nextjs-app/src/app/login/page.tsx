"use client";
import { useState } from "react";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";
import axios from "axios";
import { useRouter } from "next/navigation"; 

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const router = useRouter(); // Use Next.js router

  const handleLogin = async (e: React.FormEvent) => { 
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200 || response.status === 201) {
        if (response.data.token) {
          document.cookie = `TOKEN=${response.data.token}; path=/; max-age=86400`; // 24 h
        }
        router.push('/dashboard');
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        setError(error.response.data.message || "Invalid email or password");
      } else if (error.request) {
        // Request was made but no response received
        setError("Network error. Please check your connection.");
      } else {
        // Other errors
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500">
              Enter your email and password to sign in!
            </p>
          </div>

          <div>
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input 
                    type="email" 
                    placeholder="info@gmail.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Button 
                    className="w-full bg-blue-900 cursor-pointer" 
                    size="sm" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
                {error && (
                  <div className="p-3 text-red-600 bg-red-100 rounded-md">
                    {error}
                  </div>
                )}
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 sm:text-start">
                <a
                  href="/register"
                  className="text-brand-500 hover:text-brand-600"
                >
                  Don't have an account? {""}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}