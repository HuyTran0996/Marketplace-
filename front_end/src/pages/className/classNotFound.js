import React from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const container = twMerge(
  classNames(
    "container",
    "mx-auto",
    "flex items-center",
    "justify-center",
    "px-4",
    "py-16"
  )
);

const innerContainer = twMerge(
  classNames("w-full", "max-w-md", "space-y-5", "text-center")
);
const class404 = twMerge(classNames("text-9xl", "font-bold", "text-gray-800"));

const classOops = twMerge(classNames("text-4xl", "font-bold", "text-gray-800"));

const button = twMerge(
  classNames(
    "mt-5",
    "px-3",
    "py-1.5",
    "border-2",
    "border-blue-600",
    "text-black",
    "rounded-md",
    "duration-300",
    "hover:bg-sky-700",
    "hover:text-white"
  )
);

export { container, innerContainer, class404, classOops, button };
