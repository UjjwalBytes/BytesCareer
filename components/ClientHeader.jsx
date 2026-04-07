"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ClientHeader({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    await fetch("/api/auth/logout");

    router.push("/");
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <nav className="flex items-center justify-between px-8 h-24 mb-4 rounded-full border-b-4 border-gray-700 bg-yellow-50 shadow-md">

        {/* Logo */}
        <Link href="/">
          <h1 className="font-bold text-gray-800 text-3xl">
            Career<span className="text-primary">Pilot</span>
          </h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">

          {user ? (
            <>
              {/* Dashboard */}
              <Link href="/dashboard">
                <Button variant="ghost">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>

              {/* Growth */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <StarsIcon className="h-4 w-4" />
                    Growth
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/resume">
                      <FileText className="h-4 w-4 mr-2" />
                      Resume
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/ai-cover-letter">
                      <PenBox className="h-4 w-4 mr-2" />
                      Cover Letter
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/interview">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Interview
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User */}
              <span className="text-sm">Hi, {user.name}</span>

              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link href="/signup">
                <Button>Register</Button>
              </Link>
            </>
          )}

        </div>
      </nav>
    </header>
  );
}