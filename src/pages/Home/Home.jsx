import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/api";
import {
  fetchProductsLoading,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../../store/slices/productsSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);

  useEffect(() => {
    const fetchLimitedProducts = async () => {
      dispatch(fetchProductsLoading());

      try {
        const res = await api.get("/products?limit=4");
        dispatch(fetchProductsSuccess(res.data));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message));
      }
    };

    fetchLimitedProducts();
  }, [dispatch]);

  const { products, loading, error } = productsState;

  return (
    <section className="flex flex-col gap-7 items-center pt-10 px-4">
      {loading === "loading" && (
        <p className="text-lg font-medium">Loading...</p>
      )}

      {error && (
        <p className="text-lg font-medium text-red-600">Error: {error}</p>
      )}

      {products && products.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mx-auto w-full max-w-6xl">
          {products.map((product) => (
            <li
              className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg  hover:scale-105 transition-all duration-300"
              key={product.id}
            >
              <div className="p-4 flex-col justify-between">
                <h2 className="text-lg font-semibold mb-2 h-20">
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </h2>

                <img
                  src={product.image}
                  alt={product.title}
                  className="size-52 object-contain mx-auto mb-3"
                />

                <strong className="text-lg">{product.price}</strong>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        loading === "idle" && (
          <p className="text-lg font-medium">No products found.</p>
        )
      )}

      <div>
        <Link
          className="text-xl text-blue-600 border-blue-600 hover:border-b-2 transition-all duration-75 rounded-md pb-1"
          to="/products"
        >
          Explore more
        </Link>
      </div>
    </section>
  );
}
