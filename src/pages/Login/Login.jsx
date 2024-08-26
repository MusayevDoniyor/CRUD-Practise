import React, { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  let user = localStorage.getItem("user") && navigate("/");

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
    } catch (error) {
      console.log("Login error:", error.message);
      setError("Login failed. Please check your credentials.");
    } finally {
      navigate("/");
      setLoading(false);
    }
  };

  return (
    <main className="max-w-screen-2xl min-h-screen">
      <section className="py-10 px-4 md:px-16 min-h-screen bg-slate-200 flex justify-center items-center">
        <form
          onSubmit={submitUser}
          className="bg-cyan-300 py-3 px-7 w-3/5 sm:w-2/5 flex flex-col gap-7 rounded-lg"
        >
          <h2 className="text-center text-3xl font-bold">Login :{")"}</h2>

          <div className="flex flex-col gap-3">
            <label htmlFor="username">Enter Username:</label>

            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="py-3 outline-none border-none px-4 rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="password">Enter Password:</label>

            <div className="flex flex-col lg:flex-row gap-3 ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="py-3 outline-none border-none px-4 flex-1 rounded-sm"
              />

              <button
                type="button"
                className="shadow-md px-3 font-semibold text-lg"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#333] text-white mb-3 py-3 px-2 font-medium text-lg sm:text-xl rounded-md"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
