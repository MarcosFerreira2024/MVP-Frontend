import { Link, useNavigate } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";
import { type HeaderLink } from "./HeaderLinks";
import Search from "./SearchButton";
import MobileHeaderMenu from "./MobileHeaderMenu";
import { Menu } from "lucide-react";
import type { User } from "../types/User";

interface HeaderDefaultProps {
  navLinks: HeaderLink[];
  isAdmin: boolean;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  isMenuVisible: boolean;
  setIsMenuVisible: (v: boolean) => void;
}

function HeaderDefault({
  navLinks,
  isAdmin,
  user,
  isAuthenticated,
  loading,
  isMenuVisible,
  setIsMenuVisible,
}: HeaderDefaultProps) {
  const navigate = useNavigate();

  return (
    <nav className="flex gap-4 items-center md:items-start mb-8 mt-4 justify-between mx-4">
      <img
        onClick={() => navigate("/")}
        src="/unifeso.svg"
        alt="Logo Unifeso"
        className="cursor-pointer"
      />

      <div className="md:flex flex-col items-center w-full">
        <div className="md:block hidden">
          <HeaderLinks
            isFixed={false}
            isAdmin={isAdmin}
            direction="row"
            data={navLinks}
          />
        </div>

        <>
          <h1 className="font-serif text-green-900 text-center md:py-4 md:text-6xl text-3xl">
            Terê Verde Online
          </h1>
          <div className="md:flex justify-center hidden w-full">
            <Search />
          </div>
        </>
      </div>

      <div className="md:flex hidden items-center gap-4">
        {loading ? (
          <div className="w-[48px] h-[48px] animate-pulse bg-gray-200 rounded-full" />
        ) : isAuthenticated ? (
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
          className="text-green-900"
          onClick={() => setIsMenuVisible(true)}
        />
      </div>

      <MobileHeaderMenu
        isMenuVisible={isMenuVisible}
        navLinks={navLinks}
        closeMenu={() => setIsMenuVisible(false)}
      />
    </nav>
  );
}

export default HeaderDefault;
