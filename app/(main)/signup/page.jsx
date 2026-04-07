"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.token) {
        // 🔥 save token
        document.cookie = `token=${data.token}; path=/`;

        // redirect after signup
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-xl shadow-md w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
        <p className="text-sm text-center">
  Already have an account?{" "}
  <a href="/login" className="text-blue-600 underline">
    Login
  </a>
</p>
      </form>
    </div>
  );
}