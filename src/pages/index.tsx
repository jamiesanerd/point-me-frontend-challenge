import { Inter } from "next/font/google";
import ReviewApp from "@/components/ReviewApp";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <h1>Review App</h1>
      <ReviewApp />
    </main>
  );
}
