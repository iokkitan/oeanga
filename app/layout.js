import GlblProviders from "./components/GlblProviders";
import { fonts } from "./isomorphic/fonts";

import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Ōe Âng-á",
    default: "Ōe Âng-á",
  },
  description: "Vercel + Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={[fonts.roboto.variable, fonts.rubik.variable].join(" ")}
    >
      <body>
        <GlblProviders>{children}</GlblProviders>
      </body>
    </html>
  );
}
