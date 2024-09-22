import { Roboto, Rubik } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-Roboto",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const fonts = {
  roboto,
  rubik,
};
