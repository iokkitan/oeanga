import * as React from "react";

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
  headingTw,
  textTw,
  cardFooterTw,
  footerTextTw,
}) {
  return (
    <div className="w-full h-full flex flex-col p-8 bg-white">
      <div className="relative flex">
        <span className="w-3/12 border-r-2 border-gray-200 pr-6 text-9xl font-bold text-gray-900 text-center">
          {heading}
        </span>
        <div className="w-9/12 flex flex-col pl-6 items-stretch">
          {text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              <span className="py-2 text-3xl text-gray-600">{line}</span>
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
