"use client";

import { useEffect, useState } from "react";
import { useMode } from "@/context/app.context";

// icons
import { FaMoon, FaSun } from "react-icons/fa6";

// lib
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const Switcher = () => {
  const { setMode } = useMode();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      setMode("light");
    } else {
      setTheme("dark");
      setMode("dark");
    }
  };

  return (
    <div className="relative hidden md:block">
      <div
        className={cn(
          "bg-theme fixed w-[50px] h-[50px] bg-white right-0 top-[40%] -translate-y-[50%] z-[1000] transition-all duration-300 cursor-pointer rounded-s-md flex justify-center items-center shadow-lg"
        )}
      >
        <button
          className="bg-theme flex justify-center items-center text-[24px] text-text-3 w-full h-full transition-all duration-300 hover:text-text-fixed-3"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <FaSun className="text-white w-[23px] h-[24px]" />
          ) : (
            <FaMoon className="text-white w-[23px] h-[24px]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Switcher;
