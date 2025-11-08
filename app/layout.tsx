import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopHeader from "@/components/TopHeader";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Merkatox - eCommerce Shop",
  description: "Modern eCommerce platform with product management and favorites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StoreProvider>
            {/* Toast notifications */}
            <Toaster position="top-right" richColors closeButton />
            
            {/* Fixed top header - above content */}
            <TopHeader/>
            
            {/* Fixed navbar overlay */}
            <Header />
            
            {/* Main content */}
            <main className="grow">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
