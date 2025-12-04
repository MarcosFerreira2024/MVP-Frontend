import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Loading from "../components/Loading";

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
