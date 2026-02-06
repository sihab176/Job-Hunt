"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nabar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  // console.log(status)
  

  return (
    <nav className=" py-4 px-20 bg-[#F9F9F9] shadow-lg mb-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold uppercase">JobHunt</h1>
        <div className="flex gap-5 items-center">
          <Link href="/">Jobs</Link>
          
          <Link href={`add_jobs`}>Add Jobs</Link>
          <Link href="/application-page">Application</Link>
         
          {
            status === "authenticated" ?
              <button onClick={() => signOut()} className="px-5 py-1 cursor-pointer bg-gradient-to-br from-[#612d92] via-[#78228d] to-[#612d92] text-white rounded active:scale-95">logout</button> :
              <Link href="/login" className="px-5 py-1 bg-purple-800 cursor-pointer text-white rounded active:scale-95">Login</Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Nabar;
