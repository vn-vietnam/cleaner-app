import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import NextAuthSessionProvider from "./provider";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "HomeFinder",
	description: "HomeFinder: Your Gateway to the Perfect Home",
	icons: {
		icon: "/logo.svg", // /public path
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster />
				<NextAuthSessionProvider>
					<Header />
					{children}
					<Footer />
				</NextAuthSessionProvider>
			</body>
		</html>
	);
}
