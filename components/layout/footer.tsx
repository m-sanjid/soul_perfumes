import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="border-t w-full">
      <div className="flex flex-col items-center justify-center py-10 w-full max-w-7xl mx-auto">
        <div className="uppercase font-light text-yellow-500 tracking-widest text-2xl pb-20">
          Soul
        </div>
        <div className="font-light text-sm text-neutral-500 tracking-tight">
          All Rights Reserved.{" "}
          <span>
            Built by{" "}
            <Link
              href={"https://x.com/dev_sanjid"}
              target="_blank"
              className="font-semibold tracking-tight text-white"
            >
              Sanjid
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
