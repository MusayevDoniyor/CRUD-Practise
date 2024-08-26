import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Product from "./pages/SingleProduct/Product";
import User from "./pages/SingleUser/User";
import ProtectedRoutes from "./utils/ProtectedRoute";
import Header from "./sections/Header/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <div>
        <Header />
        <main className="px-4 md:px-16">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/users/:id" element={<User />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
