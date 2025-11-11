import React from "react";

type AuthProps = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthProps) {
  return (
    <div className="flex relative justify-center w-full h-full bg-green-950">
      <div className="absolute  top-4 lg:left-4">
        <img src="unifeso.svg" alt="" />
      </div>
      <div className="flex-1 h-screen px-4 max-w-[600px] pt-20  flex justify-center lg:justify-start">
        {children}
      </div>
      <div className="w-[80vw] h-screen relative lg:block hidden group">
        <img
          src="bg.png"
          alt=""
          className="object-cover w-full h-full transition-all ease-in grayscale-75 group-hover:grayscale-0"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
