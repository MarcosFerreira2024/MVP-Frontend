import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import HeaderLinks, { type HeaderLink } from "./HeaderLinks";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import Search from "./SearchButton";

function MobileHeaderMenu({
  isMenuVisible,
  closeMenu,
  navLinks,
}: {
  isMenuVisible: boolean;
  closeMenu: () => void;
  navLinks: HeaderLink[];
}) {
  const { isAdmin, isAuthenticated } = useUser();

  return (
    <AnimatePresence>
      {isMenuVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed md:hidden top-0 left-0 w-screen h-screen bg-black/40 flex z-50"
        >
          <div onClick={closeMenu} className="min-w-[45vw]" />

          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-w-[55vw] pt-4 px-4 gap-5 flex-col flex bg-gray-100 h-full"
          >
            <div className="flex self-end">
              <Button
                onClick={closeMenu}
                className="rounded-full bg-green-950"
                variant={"contrast"}
                size="icon"
              >
                X
              </Button>
            </div>

            <div className="flex flex-col gap-5 w-full items-center">
              <Search />
              <HeaderLinks
                isAdmin={isAdmin}
                direction="column"
                data={navLinks}
              />

              <div className="flex flex-col items-center gap-4 mt-4">
                {isAuthenticated ? (
                  ""
                ) : (
                  <Link
                    className="text-main text-xl hover:text-green-950 transition-all duration-300"
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileHeaderMenu;
