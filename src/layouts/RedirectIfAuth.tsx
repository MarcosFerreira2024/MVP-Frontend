import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Loading from "../components/Loading";

const RedirectIfAuth = () => {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuth;
