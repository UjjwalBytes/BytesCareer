import React from "react";
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
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <nav className="flex items-center justify-between px-8 h-24 mb-4 rounded-full border-b-4 border-gray-300 bg-background/40 backdrop-blur-lg shadow-md">

        {/* Logo */}
        <Link href="/">
          <h1 className="font-bold gradient-title text-3xl  tracking-tight">
            Bytes<span className="text-primary">Career</span>
          </h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">

          <SignedIn>
            {/* Dashboard */}
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="hidden md:flex items-center gap-2 hover:bg-muted"
              >
                <LayoutDashboard className="h-4 w-4" />
                Insights
              </Button>

              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 rounded-xl">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-52 rounded-xl shadow-lg"
              >
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume Builder
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button className="rounded-xl">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-primary/20",
                  userButtonPopoverCard: "shadow-xl rounded-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}