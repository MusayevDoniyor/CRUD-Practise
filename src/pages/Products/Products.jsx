import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsLoading,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../../store/slices/productsSlice";
import api from "../../api/api.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsLoading());
      dispatch(fetchProductsFailure(null));

      try {
        const res = await api.get("/products");
        dispatch(fetchProductsSuccess(res.data));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message));
        toast.error(`Error: ${error.message}`);
        console.log(error.message);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const addCart = (productId) => {
    toast.success(`Products - ${productId} successfully added to Cart!`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <section className="flex flex-col items-center py-10 px-4 bg-gray-800 min-h-screen">
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

      {!loading && products.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mx-auto w-full max-w-7xl">
            {products.map((product) => (
              <li
                className="bg-gray-900 text-yellow-400 border border-gray-700 rounded-lg p-4"
                key={product.id}
              >
                <h2 className="text-lg font-semibold mb-2 h-20 pb-4 overflow-clip">
                  <Link
                    to={`/products/${product.id}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </h2>

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-56 object-cover pt-4 my-2"
                />

                <div className="flex justify-between items-center pt-2">
                  <strong className="text-lg">${product.price}</strong>

                  <button
                    className="bg-gray-800 py-2 px-5 rounded-lg group hover:bg-yellow-400 hover:scale-105 border border-transparent hover:border-yellow-400 transition-all duration-300 ease-in-out"
                    onClick={() => {
                      addCart(product.id);
                    }}
                  >
                    <FaShoppingCart
                      className="group-hover:text-gray-800"
                      size={24}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        !loading && (
          <p className="text-lg font-medium text-yellow-400">No products!</p>
        )
      )}
    </section>
  );
}
