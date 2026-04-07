import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
// import { dark } from "@clerk/themes";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CareerPilot",
  description: "",
};

export default function RootLayout({ children }) {
  return (

      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>

        {/* ✅ Removed inter.className */}
        <body className="font-sans">
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          <Footer />
        </body>
      </html>

  );
}