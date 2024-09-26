import { encode } from "js-base64";

export async function generateMetadata({ params, searchParams }) {
  const cardDraftVersionProps = {
    fontFamily: searchParams.fontFamily || "Noto Sans",
    fontVariant: searchParams.fontVariant || 600,
    // ------------------------
    imageUri: searchParams.imageUri,
    heading: searchParams.heading,
    text: searchParams.text,
    footerText: searchParams.footerText,
  };
  const slug = encodeURIComponent(encode(JSON.stringify(cardDraftVersionProps)));
  return {
    openGraph: {
      images: [`/0e9893b7-bd9f-4ebc-beb8-f7dfc1d90463/${slug}/opengraph-image`],
    },
  };
}

export { default } from "./DraftPage";
