import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToastProvider from "./providers/ToasterProvider";

export const metadata = {
	title: "Groundbnb",
	description: "Airbnb clone but groundbnb",
};

const font = Nunito({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${font.className}`}>
				<ToastProvider />
				<RegisterModal />
				<Navbar />
				{children}
			</body>
		</html>
	);
}
