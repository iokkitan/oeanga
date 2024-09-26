import { encode } from "js-base64";
import DraftPage from "./DraftPage";

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
  const slug = encodeURIComponent(
    encode(JSON.stringify(cardDraftVersionProps))
  );
  return {
    title: "DraftPage",
    openGraph: {
      type: "website",
      images: [
        {
          url: `/0e9893b7-bd9f-4ebc-beb8-f7dfc1d90463/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function RSCPage(props) {
  return <DraftPage {...props} />;
}
