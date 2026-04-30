"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/auth";
import { LogOut, BriefcaseBusiness } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <BriefcaseBusiness className="text-blue-400" size={22} />
          JobTracker
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
}
