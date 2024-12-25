import { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import useLogout from "../hooks/useLogout.js";
import { ChevronLeft, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const { mutate: logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <div className="max-w-[1055px] scrollbar-hide h-16 md:h-20 flex items-center justify-between">
      {/* Logo */}
      <Link
        to="/"
        className="flex text-[#ffffff] items-center gap-4 text-2xl font-bold"
      >
        <span className="font-montserrat italic font-extrabold text-2xl tracking-wider">
          Write<span className="text-[#ffffff]">It.</span>
        </span>
      </Link>
      {/* Mobile menu */}
      <div className="md:hidden">
        <motion.div
          className="cursor-pointer text-4xl"
          onClick={() => setIsOpen((prev) => !prev)}
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 0.5,
          }}
        >
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <X size={30} strokeWidth={2.4} />
            </motion.div>
          ) : (
            <motion.div
              key="open-icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <ChevronLeft size={30} strokeWidth={2.4} />
            </motion.div>
          )}
        </motion.div>
        {/* Mobile list */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="w-full  h-screen flex-col gap-8 z-50 font-medium text-lg items-center justify-center absolute top-16 bg-black"
              initial={{ right: "-100%", opacity: 0 }}
              animate={{
                right: isOpen ? "0" : "100%",
                opacity: isOpen ? 1 : 0,
              }}
              exit={{
                right: "-100%",
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                right: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                },
                opacity: {
                  duration: 0.1,
                },
              }}
              style={{ display: isOpen ? "flex" : "none" }}
            >
              {user && (
                <div className="font-montserrat bg-white py-[6px] px-[14px] rounded-full absolute  top-24 text-2xl font-semibold text-black ">
                  {user?.fullName}
                </div>
              )}

              <NavLink
                to="/"
                onTap={() => setIsOpen(false)}
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              {user && (
                <NavLink to="/savedposts" onClick={() => setIsOpen(false)}>
                  Saved Posts
                </NavLink>
              )}
              {user && (
                <NavLink to="/write" onClick={() => setIsOpen(false)}>
                  Write
                </NavLink>
              )}
              {!user && (
                <NavLink to="/register" onClick={() => setIsOpen(false)}>
                  Register
                </NavLink>
              )}
              {!user && (
                <NavLink to="/login" onClick={() => setIsOpen(false)}>
                  <button>Login</button>
                </NavLink>
              )}
              {user && (
                <NavLink onClick={() => setIsOpen(false)}>
                  <button onClick={handleLogout}>Logout</button>
                </NavLink>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Desktop menu */}
      <div className="md:flex hidden items-center gap-8 xl:gap-12 font-medium">
        {user && (
          <div className="font-montserrat bg-white py-[5px] px-[12px] rounded-full text-lg font-semibold text-black ">
            {user?.fullName}
          </div>
        )}

        <NavLink to="/" onClick={() => setIsOpen(false)}>
          Home
        </NavLink>

        {user && (
          <NavLink to="/savedposts" onClick={() => setIsOpen(false)}>
            Saved Posts
          </NavLink>
        )}
        {user && (
          <NavLink to="/write" onClick={() => setIsOpen(false)}>
            Write
          </NavLink>
        )}

        {!user && (
          <NavLink to="/register" onClick={() => setIsOpen(false)}>
            Register
          </NavLink>
        )}
        {!user && (
          <NavLink to="/login" onClick={() => setIsOpen(false)}>
            <button>Login</button>
          </NavLink>
        )}
        {user && (
          <NavLink onClick={() => setIsOpen(false)}>
            <button onClick={handleLogout}>Logout</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
