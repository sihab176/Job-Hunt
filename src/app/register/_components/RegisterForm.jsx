"use client";
import { RegisterUser } from "@/app/actions/auth/RegisterUser";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
const RegisterForm = () => {

     const router = useRouter();
  // TODO: Implement registration logic---------------------->
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(name, email, password);
    const res = await RegisterUser({ name, email, password });
    console.log("register response", res);
    // if (res.success) {
    //   await signIn("credentials", {
    //     redirect: true,
    //     email,
    //     password,
    //     callbackUrl: "/",
    //   });
    // } else if (res.error) {
    //   console.log("register error", res.error);
      // }
          if (res.success) {
      const loginRes = await signIn("credentials", {
        redirect: false,   // 🔥 এখানেই
        email,
        password,
      });

      if (!loginRes?.error) {
        router.push("/"); // ✅ home page
      } else {
        console.log("Auto login failed");
      }
    }
  };

  return (
    <div className="flex flex-col  max-w-[400px] px-6 py-9 shadow-2xl mx-auto mt-16  bg-gray-200  rounded-2xl">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign up</h1>
        <p className="text-sm dark:text-gray-600">
          Sign up to create your account
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        noValidate=""
        action=""
        className="space-y-12"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              fdprocessedid="dhv1hh"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              fdprocessedid="dhv1hh"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline dark:text-gray-600"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              fdprocessedid="sencz7"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 hover:opacity-90 font-semibold rounded-md bg-purple-900 text-white active:scale-95 duration-150"
            >
              Sign in
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Don't have an account yet?
            <Link
              href="/login"
              className="hover:underline dark:text-violet-600"
            >
              Sign in
            </Link>
            .
          </p>
        </div>
      </form>
      <div>
        <button className="w-full px-8 py-3 mt-6 rounded-md bg-white flex items-center justify-center gap-3 active:scale-95 duration-150 hover:bg-gray-50 cursor-pointer">
          <span>
            <FcGoogle size={24} />
          </span>{" "}
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
