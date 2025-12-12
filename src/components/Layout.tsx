import React from "react";
import Header from "./customHeader";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
    </div>
  );
};

export default Layout;
