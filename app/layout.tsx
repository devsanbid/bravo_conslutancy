import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				{children}
				<Toaster position="top-center" expand={true} richColors />
			</body>
		</html>
	);
}

