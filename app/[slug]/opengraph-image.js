import { decode } from "js-base64";
import { ImageResponse } from "next/og";
import * as React from "react";
import CardUITailwind from "../components/CardUITailwind";
import { parseJson } from "../isomorphic/utils";
import { all } from "../ttfs/_googlefonts";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function toTwJsx(jsx) {
  if (!React.isValidElement(jsx)) {
    return jsx;
  }
  const { className, ...rest } = jsx.props;
  return React.cloneElement(
    jsx,
    {
      tw: className,
      ...rest,
    },
    React.Children.map(jsx.props.children, toTwJsx)
  );
}

async function prepareFonts({ fontFamily, fontVariant }) {
  const { items } = await all().then((res) => res.json());
  const font = items.find((item) => item.family === fontFamily);
  const fileUri = font.files[fontVariant];
  const fontArrayBuffer = await fetch(new URL(fileUri)).then((res) =>
    res.arrayBuffer()
  );
  return [
    {
      name: fontFamily,
      data: fontArrayBuffer,
      style: "normal",
      weight: "regular" === fontVariant ? 400 : fontVariant,
    },
  ];
}

export default async function HomeImage({ params: { slug } }) {
  const cardUiTaiwindProps = parseJson(decode(decodeURIComponent(slug)));
  console.log(cardUiTaiwindProps);

  return new ImageResponse(
    toTwJsx(CardUITailwind(cardUiTaiwindProps)),
    /**
     * @see https://github.com/vercel/satori
     */
    {
      ...size,
      fonts: await prepareFonts(cardUiTaiwindProps),
    }
  );
}
