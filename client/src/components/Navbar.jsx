import React from "react";
import { Button } from "@/components/ui/button";
// replace with better menu button later
import { LogOut, Menu, MessageSquare, Settings, User } from "lucide-react";
import authStore from "@/store/authStore";
import { Link } from "react-router-dom";

// use regular tailwind for now clean later

export const Navbar = () => {
  const { logout, authUser } = authStore();
  return (
    <header
      className="bg-base-100 border-b border-base-300 sticky w-full  z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">HeyAll</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <Link
                  to={"/settings"}
                  className={`
              text-sm inline-flex items-center gap-2 transition-colors
              
              `}
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>
              </>
            )}
            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`text-sm inline-flex items-center gap-2`}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
