import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/api";
import {
  fetchLimitedProductsLoading,
  fetchLimitedProductsSuccess,
  fetchLimitedProductsFailure,
} from "../../store/slices/limitedProductsSlice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const dispatch = useDispatch();
  const { limitedProducts, loading, error } = useSelector(
    (state) => state.limitedProducts
  );

  useEffect(() => {
    const fetchLimitedProducts = async () => {
      dispatch(fetchLimitedProductsLoading());
      dispatch(fetchLimitedProductsFailure(null));

      try {
        const res = await api.get("/products?limit=4");
        dispatch(fetchLimitedProductsSuccess(res.data));
      } catch (error) {
        dispatch(fetchLimitedProductsFailure(error.message));
        toast.error(`Error: ${error.message}`);
      }
    };

    fetchLimitedProducts();
  }, [dispatch]);

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

      {!loading && limitedProducts.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mx-auto w-full max-w-7xl">
            {limitedProducts.map((product) => (
              <li
                className="bg-gray-900 text-yellow-400 border border-gray-700 rounded-lg p-4"
                key={product.id}
              >
                <h2 className="text-lg font-semibold mb-2 h-16">
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
                  className="w-full h-56 object-cover mb-2"
                />

                <strong className="text-lg">${product.price}</strong>
              </li>
            ))}
          </ul>

          <Link
            to="/products"
            className="text-yellow-400 text-xl hover:underline transition-all duration-300 pt-7"
          >
            See More
          </Link>
        </>
      ) : (
        !loading && (
          <p className="text-lg font-medium text-yellow-400">No products!</p>
        )
      )}
    </section>
  );
}
