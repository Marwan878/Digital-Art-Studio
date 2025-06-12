import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-800 via-purple-900 to-indigo-900 flex flex-col font-sans ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
