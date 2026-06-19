import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { CodeContextProvider } from "./context/CodeContext";
import Home from "./pages/Home";
import ScrollToHash from "./components/ScrollToHash";
import { ScrollTop } from "./components/ScrollTop";
import Outing from "./pages/Outing";
import Search from "./pages/Search";
import Admin from "./pages/Admin";
import { useUser } from "./context/UserContext";
import MainLayout from "./layouts/MainLayout";
import RedirectIfAuth from "./layouts/RedirectIfAuth";
import AdminRoute from "./layouts/AdminRoute";
import Logout from "./components/Logout";

function App() {
  const { isAuthenticated, logout } = useUser();

  return (
    <>
      <Logout logout={logout} isAuthenticated={isAuthenticated} />
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              fontWeight: 600,
              borderRadius: "6px",
            },
            success: {
              style: { background: "#064e3b", color: "#f0fdf4" },
              iconTheme: { primary: "#22c55e", secondary: "#064e3b" },
            },
            error: {
              style: { background: "#7f1d1d", color: "#fee2e2" },
              iconTheme: { primary: "#ef4444", secondary: "#7f1d1d" },
            },
            loading: {
              style: { background: "#064e3b", color: "#f0fdf4" },
              iconTheme: { primary: "#064e3b", secondary: "#22c55e" },
            },
          }}
        />
        <ScrollToHash />
        <ScrollTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/outing/:slug" element={<Outing />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>

          <Route element={<RedirectIfAuth />}>
            <Route
              path="/login"
              element={
                <CodeContextProvider>
                  <Login />
                </CodeContextProvider>
              }
            />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
