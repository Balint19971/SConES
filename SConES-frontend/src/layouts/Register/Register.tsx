import { Button, Input, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("Author");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   console.log("Token:", token);
  //   if (token) {
  //     console.log("Token:", token);
  //   }
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted wit:" + fullName + " " + email + " " + password + " " + phoneNumber + " " + role);

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          phoneNumber,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration
        console.log("Registration successful");
        // Parse the response body as JSON

        // Access the token from the response data
        const token = data.token;
        console.log("Token:", token);

        localStorage.setItem("authToken", token);

        navigate("/login");
      } else {
        // Handle registration error
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md -mt-40">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Register
        </h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              required
              fullWidth
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="SConES@example.com"
              required
              fullWidth
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              required
              fullWidth
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="0757770173"
              required
              fullWidth
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <Select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <MenuItem value="Supervisor">Supervisor</MenuItem>
              <MenuItem value="Author">Author</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full rounded-md py-2 font-medium"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
