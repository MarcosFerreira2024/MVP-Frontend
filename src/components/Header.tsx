import { Link, useNavigate } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";
import Search from "./SearchButton";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import Loading from "./Loading";
import MobileHeaderMenu from "./MobileHeaderMenu";
import { Menu } from "lucide-react";

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [fixa, setFixa] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, isAdmin, loading } = useUser();

  const navLinks = [
    { to: "parques", name: "Parques" },
    { to: "trilhas", name: "Trilhas" },
    { to: "eventos", name: "Eventos" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 300) setFixa(true);
      else setFixa(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerSize = ref.current?.getBoundingClientRect();

  return (
    <>
      {/* Placeholder para evitar layout shifting */}
      {fixa && (
        <div
          style={{
            height: containerSize?.height,
            width: "100%",
          }}
        />
      )}

      <AnimatePresence>
        <motion.div
          ref={ref}
          key={fixa ? "fixed" : "normal"}
          initial={{ opacity: fixa ? 0 : 1, y: fixa ? 0 : 0 }}
          animate={{
            opacity: fixa ? 1 : 1,
            y: fixa ? 0 : 0,
          }}
          exit={{ opacity: fixa ? 0 : 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`${
            fixa ? "fixed   backdrop-blur-md bg-green-950/90" : ""
          } top-0 w-full z-50`}
        >
          <nav
            className={`flex gap-4 items-center ${
              fixa ? "items-center py-4" : "md:items-start mb-8 mt-4"
            } justify-between  mx-4`}
          >
            <img
              onClick={() => navigate("/")}
              src="/unifeso.svg"
              alt="Logo Unifeso"
              className="cursor-pointer"
            />

            <div className="md:flex flex-col items-center w-full">
              <div className="md:block hidden">
                <HeaderLinks
                  isFixed={fixa}
                  isAdmin={isAdmin}
                  direction="row"
                  data={navLinks}
                />
              </div>

              {!fixa && (
                <>
                  <h1 className="font-serif text-green-900 text-center md:py-4 md:text-6xl text-5xl">
                    Terê Verde Online
                  </h1>
                  <div className="md:flex justify-center hidden w-full">
                    <Search />
                  </div>
                </>
              )}
            </div>

            <div className="md:flex hidden items-center gap-4">
              {isAuthenticated ? (
                <img
                  src={user!.userPhoto}
                  alt={user!.name}
                  className="w-full h-full border border-green-900 rounded-full max-w-[48px] max-h-[48px]"
                />
              ) : (
                <Link
                  className="text-main text-xl hover:text-green-950 transition-all duration-300"
                  to="/login"
                >
                  Login
                </Link>
              )}
            </div>

            <div className="md:hidden">
              <Menu
                className={`${fixa ? "text-green-50" : "text-green-900"}`}
                onClick={() => setIsMenuVisible(true)}
              />{" "}
            </div>

            <MobileHeaderMenu
              isMenuVisible={isMenuVisible}
              navLinks={navLinks}
              closeMenu={() => setIsMenuVisible(false)}
            />
          </nav>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Header;
