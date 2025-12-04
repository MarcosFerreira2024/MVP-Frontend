import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { CodeContextProvider } from "./context/CodeContext";
import Home from "./pages/Home";
import Testes from "./pages/Testes";
import ScrollToHash from "./components/ScrollToHash";
import Outing from "./pages/Outing";
import Search from "./pages/Search";
import Admin from "./pages/Admin";
import { OutingsProvider } from "./context/OutingsContext";
import { UserProvider, useUser } from "./context/UserContext";
import RedirectIfAuth from "./layouts/RedirectIfAuth";
import AdminRoute from "./layouts/AdminRoute";
import Logout from "./components/Logout";

function App() {
  const { isAuthenticated, logout } = useUser();

  return (
    <OutingsProvider>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/outing/:slug" element={<Outing />} />

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

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/testes" element={<Testes />} />

            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </OutingsProvider>
  );
}

export default App;
