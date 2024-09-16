import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersLoading,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../../store/slices/usersSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Users() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersLoading());
      dispatch(fetchUsersFailure(null));
      try {
        const res = await api.get("/users");
        dispatch(fetchUsersSuccess(res.data));
      } catch (error) {
        dispatch(fetchUsersFailure(error.message));
        console.error(error.message);
        toast.error(`Failed to load users. Please try again.`);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const togglePasswordVisibility = (userId) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {error ? (
        <p className="text-lg font-medium text-red-400">Error: {error}</p>
      ) : users.length > 0 ? (
        <ul className="w-full max-w-7xl bg-gray-800 text-yellow-400 shadow-md rounded-lg overflow-hidden grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="px-4 py-2 border-b border-gray-700 bg-gray-900 rounded-lg flex flex-col justify-between"
            >
              <div className="mb-4">
                <Link to={`${user.id}`} className="font-sans text-lg">
                  <h3 className="text-xl font-semibold text-yellow-400">
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </h3>
                </Link>
              </div>

              <div>
                <h4 className="flex gap-3 text-sm mb-2">
                  <b>Email:</b>
                  <span className="text-gray-300">{user.email}</span>
                </h4>

                <h5 className="flex items-center gap-3 text-sm">
                  <b>Phone:</b>

                  <span className="text-gray-300">{user.phone}</span>
                </h5>

                <h5 className="flex items-center gap-3 text-sm my-1 relative">
                  <b>Password:</b>
                  <span className="text-gray-300">
                    {visiblePasswords[user.id]
                      ? user.password
                      : "*".repeat(user.password.length)}
                  </span>

                  <button
                    type="button"
                    className="ml-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-xs py-1 px-2 rounded-sm font-semibold transition-colors duration-300 absolute right-28"
                    onClick={() => togglePasswordVisibility(user.id)}
                  >
                    {visiblePasswords[user.id] ? "Hide" : "Show"}
                  </button>
                </h5>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg font-medium text-yellow-400">No users found!</p>
      )}
    </section>
  );
}
