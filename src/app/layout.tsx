import type { Metadata } from "next";

import "./globals.css";
import { Fredoka } from "next/font/google";
import BackgroundUI from "@/components/BackgroundUI";
import Wrapper from "@/components/Wrapper";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "မိတ်ဖွဲ့ရင်းလှူ",
};

const fredoka = Fredoka({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`w-screen min-h-svh relative flex justify-center overflow-x-hidden bg-[#f8f9fe] text-dark ${fredoka.className}`}
			>
				
				<Toaster />
				<Wrapper>
					<main className="w-full h-fit sm:w-[640px] relative z-10 pt-16 sm:pt-10">
						{children}
					</main>
				</Wrapper>
				<BackgroundUI />
			</body>
		</html>
	);
}
