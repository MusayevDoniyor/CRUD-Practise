import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const submitUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let res = await api.post("/auth/login", {
        username: userName,
        password: password,
      });

      setShowPassword(false);
      setUserName("");
      setPassword("");

      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => navigate("/"), 2100);
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Login failed. Please check your credentials.");

      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen bg-gray-800 flex items-center justify-center p-7">
      <section className="w-full max-w-md ">
        <form
          onSubmit={submitUser}
          className="bg-gray-900 text-yellow-400 py-8 px-6 rounded-lg shadow-lg border border-gray-700"
        >
          <h2 className="text-center text-3xl font-bold mb-6">Login</h2>

          <ToastContainer />

          <div className="flex flex-col gap-4 mb-6">
            <label htmlFor="username" className="text-lg font-semibold">
              Enter Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="py-3 px-4 border border-gray-700 bg-gray-800 text-yellow-400 rounded-sm outline-none placeholder:text-gray-400"
              placeholder="Username..."
            />
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <label htmlFor="password" className="text-lg font-semibold">
              Enter Password:
            </label>

            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-3 px-4 border border-gray-700 bg-gray-800 text-yellow-400 rounded-sm w-[79%] outline-none placeholder:text-gray-400"
                placeholder="Password..."
              />

              <button
                type="button"
                className="ml-2 bg-yellow-400 text-gray-800 py-3 px-4 rounded-sm font-semibold transition-colors duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-400 text-gray-800 py-3 px-6 font-semibold text-lg rounded-md hover:bg-yellow-300 transition-colors duration-300 w-full"
          >
            {loading ? "Loading..." : "Submit"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}
        </form>
      </section>
    </main>
  );
}
