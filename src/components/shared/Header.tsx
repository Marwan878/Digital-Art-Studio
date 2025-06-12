import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface HeaderProps {
  actions?: ReactNode;
}

const Header = ({ actions }: HeaderProps) => {
  return (
    <header className="bg-white/15 backdrop-blur p-4 flex justify-between items-center border-b border-white/20">
      <Link
        to="/"
        className="text-white text-xl font-bold hover:text-white/80 transition-colors"
      >
        🎨 Digital Art Studio
      </Link>
      {actions && <div className="flex gap-4 items-center">{actions}</div>}
    </header>
  );
};

export default Header;
