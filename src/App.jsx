import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Product from "./pages/SingleProduct/Product";
import User from "./pages/SingleUser/User";
import ProtectedRoutes from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/users/:id" element={<User />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
