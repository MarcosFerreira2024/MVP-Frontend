import { useUser } from "../context/UserContext";

function Testes() {
  const { isAdmin, isAuthenticated, loading, login, user, logout } = useUser();

  return <>{}</>;
}

export default Testes;
