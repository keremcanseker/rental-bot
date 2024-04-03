"use client";

import LoginForm from "@/components/login-form";
import RegisterForm from "@/components/register-form";
import { getUserSession } from "@/lib/auth";
import { useState } from "react";

export default function Signin() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <section className="home_wrapper ">
      {/* <div className="absolute top-5 right-5 z-">
        <ModeToggle />
      </div> */}

      <div className="lg:w-1/2 w-full flex flex-col justify-center p-20 ">
        <h2 className="scroll-m-20   pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Welcome to House Renter App
        </h2>
        {isRegister ? (
          <p className=" pb-2 text-sm">
            Create your account to find best houses
          </p>
        ) : (
          <p className=" pb-2 text-sm">Please Sign in to your account</p>
        )}

        {isRegister ? (
          <RegisterForm />
        ) : (
          <LoginForm setIsRegister={setIsRegister} />
        )}
        {isRegister && (
          <p className="text-center text-muted-foreground ">
            Already have an account?{" "}
            <a
              className="hover:underline text-primary hover:cursor-pointer"
              onClick={() => setIsRegister(false)}
            >
              Sign in
            </a>
          </p>
        )}
      </div>
      <div className="hidden lg:flex w-full">
        <img src="/houses.jpg" className="object-cover h-full"></img>
      </div>
    </section>
  );
}
