import React from "react";
import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-background/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold">
              Bytes<span className="text-primary">Career</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              AI-powered career growth platform 🚀
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className="hover:text-primary transition">
              Insights
            </Link>
            <Link href="/resume" className="hover:text-primary transition">
              Resume
            </Link>
            <Link href="/interview" className="hover:text-primary transition">
              Interview
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/UjjwalBytes"
              target="_blank"
              className="p-2 rounded-full hover:bg-muted transition"
            >
              <Github className="h-5 w-5" />
            </a>

            <a
              href="https://www.instagram.com/ujjwalbytes_"
              target="_blank"
              className="p-2 rounded-full hover:bg-muted transition"
            >
              <Instagram className="h-5 w-5" />
            </a>

            <a
              href="https://in.linkedin.com/in/ujjwal-kesharwani-4b2b10337"
              target="_blank"
              className="p-2 rounded-full hover:bg-muted transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-xs text-muted-foreground border-t pt-4">
          © {new Date().getFullYear()} BytesCareer. All rights reserved. || Made by - Ujjwal Kesharwani
        </div>
      </div>
    </footer>
  );
}