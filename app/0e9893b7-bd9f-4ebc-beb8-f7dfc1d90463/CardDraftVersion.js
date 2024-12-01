import * as React from "react";

function getTextSize(text) {
  return [
    { size: "9xl", maxL: 7 },
    { size: "8xl", maxL: 11 },
    { size: "7xl", maxL: 13 },
    { size: "6xl", maxL: 17 },
    { size: "5xl", maxL: 23 },
    { size: "4xl", maxL: 29 },
    { size: "3xl", maxL: Number.MAX_SAFE_INTEGER },
  ].find(({ maxL }) => text.length < maxL).size;
}

export default function CardDraftVersion({
  fontFamily,
  fontVariant,
  // ------------------------
  imageUri,
  heading,
  text,
  footerText,
  // ------------------------
  cardTw,
  cardBodyTw,
  imageTw,
  stackTw,
  // headingTw,
  textTw,
  cardFooterTw,
  footerTextTw,
}) {
  const headingTw = `w-5/12 border-r-2 border-gray-200 pr-6 font-bold text-gray-900 text-center text-${getTextSize(
    heading
  )}`;
  const lineTw = `text-gray-600 text-${getTextSize(text)}`;

  return (
    <div className="w-full h-full flex flex-col p-8 bg-white">
      <div className="relative flex">
        <span className={headingTw}>{heading}</span>
        <div className="w-7/12 flex flex-col pl-6 items-stretch">
          {text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              <span className={lineTw}>{line}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-10 border-t border-gray-200 pt-10">
        {imageUri && <img src={imageUri} className="h-16" />}
        {footerText.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            <span className="text-xl text-teal-500">{line}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
