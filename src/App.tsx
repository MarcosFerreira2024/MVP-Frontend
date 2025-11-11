import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { CodeContextProvider } from "./context/CodeContext";

function App() {
  const publicRoutes = [
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: (
        <CodeContextProvider>
          <Login />
        </CodeContextProvider>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/search",
      element: <div>Search Page (Component not yet defined)</div>,
    },
    {
      path: "/festival/*",
      element: <div>Festival Page (Component not yet defined)</div>,
    },
    {
      path: "/trilha/*",
      element: <div>Trilha Page (Component not yet defined)</div>,
    },
    {
      path: "/parques/*",
      element: <div>Parques Page (Component not yet defined)</div>,
    },
  ];

  return (
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
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
