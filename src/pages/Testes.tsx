import { useUser } from "../context/UserContext";

function Testes() {
  const { loading } = useUser();

  return <>{loading ? null : null}</>;
}

export default Testes;
