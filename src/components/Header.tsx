import { useState } from "react";
import HeaderDefault from "./HeaderDefault";
import { useUser } from "../context/UserContext";

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { user, isAuthenticated, isAdmin, loading } = useUser();

  const navLinks = [
    { to: "parques", name: "Parques" },
    { to: "trilhas", name: "Trilhas" },
    { to: "eventos", name: "Eventos" },
  ];

  return (
    <HeaderDefault
      navLinks={navLinks}
      isAdmin={isAdmin}
      user={user}
      isAuthenticated={isAuthenticated}
      loading={loading}
      isMenuVisible={isMenuVisible}
      setIsMenuVisible={setIsMenuVisible}
    />
  );
}

export default Header;
