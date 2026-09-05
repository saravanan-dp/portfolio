import type {Metadata} from "next";
import {Space_Grotesk} from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-space-grotesk',
});
export const metadata: Metadata = {
    title: 'Saravanan D | Portfolio',
    description: 'Portfolio of Saravanan D, a Computer Science student and aspiring software developer.',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
        <body className={`${spaceGrotesk.className} bg-[#0b1014] text-[#e8f0ed]`}>
        {children}
        </body>
        </html>
    );
}
