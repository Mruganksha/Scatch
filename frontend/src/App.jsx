import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ShopPage from './pages/ShopPage'; 
import CartPage from './pages/CartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountsPage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectRoute";

import {
  ContactPage,
  FAQPage,
  PrivacyPolicyPage,
  TermsPage,
} from './pages/StaticPages';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/shop" element={<ShopPage />} />
         <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contact" element={<ContactPage />} />
<Route path="/faq" element={<FAQPage />} />
<Route path="/privacy" element={<PrivacyPolicyPage />} />
<Route path="/terms" element={<TermsPage />} />
  <Route path="/account" element={<AccountPage />} />
  <Route path="/orders" element={<OrdersPage />} />
  

      {/* Admin routes (protected) */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
                  </Route>
      </Routes>
    </Router>
  );
}

export default App;
