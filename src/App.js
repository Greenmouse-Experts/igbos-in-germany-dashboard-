import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Protect from "./pages/Protect";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* admin routes */}
          <Route path="" element={<Protect />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
          {/* users route */}
          <Route path="" element={<Protect />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
