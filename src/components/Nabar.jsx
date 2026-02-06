"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { FaXRay } from "react-icons/fa";

const Nabar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = session?.user?.role === "admin";

  const navLinks = [
  { name: "Jobs", href: "/" },

  ...(isAdmin
    ? [
        { name: "Add Jobs", href: "/add_jobs" },
        { name: "Application", href: "/application-page" },
      ]
    : []),
];


  return (
    <nav className="py-4 px-6 md:px-20 bg-[#F9F9F9] shadow-lg mb-10 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold uppercase">JobHunt</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={ pathname === link.href ? "text-purple-700" : ""}
            >
              {link.name}
            </Link>
          ))}

          {status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="px-5 py-1 cursor-pointer bg-gradient-to-br from-[#612d92] via-[#78228d] to-[#612d92] text-white rounded active:scale-95"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-5 py-1 bg-purple-800 cursor-pointer text-white rounded active:scale-95"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <FaXRay size={28} /> : <FcMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F9F9F9] border-t shadow-xl z-50 flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium border-b pb-2"
            >
              {link.name}
            </Link>
          ))}

          {status === "authenticated" ? (
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="w-full py-3 bg-red-500 text-white rounded font-bold"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-purple-800 text-center text-white rounded font-bold"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nabar;
