"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-rubik)",
    body: "var(--font-roboto)",
  },
});

export default function GlblProviders({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
