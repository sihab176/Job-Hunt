import Link from "next/link";
import React from "react";

const Nabar = () => {
  return (
    <nav className=" py-4 px-20 bg-[#F9F9F9] shadow-lg mb-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold uppercase">JobHunt</h1>
        <div className="flex gap-5 items-center">
          <Link href="/">Home</Link>
          <button>Jobs</button>
          <Link href={`add_jobs`}>Add Jobs</Link>
          <button>Companies</button>
          <button>Profile</button>
        </div>
      </div>
    </nav>
  );
};

export default Nabar;
