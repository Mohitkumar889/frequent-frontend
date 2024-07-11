import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Assesment test</title>
      </head>
      <body className={inter.className}>
        {/* <div>common nav</div> */}
        {children}
      </body>
    </html>
  );
}
