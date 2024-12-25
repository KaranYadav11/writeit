import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

function NavLink({ to, onClick, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="flex flex-col"
      onHoverStart={() => setIsOpen(true)}
      onHoverEnd={() => setIsOpen(false)}
    >
      <Link to={to} onClick={onClick}>
        {children}
      </Link>
      <motion.div
        className="border-t-[3px] border-white rounded-full"
        initial={{ width: 0 }}
        animate={{
          width: isOpen ? "100%" : "0%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}

export default NavLink;
