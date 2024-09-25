import * as React from "react";

export default function CardUITailwind({
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
    <div className={cardTw}>
      <div className={cardBodyTw}>
        {imageUri && <img src={imageUri} className={imageTw} />}
        <div className={stackTw}>
          <span className={headingTw}>{heading}</span>
          {text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              <span className={textTw}>{line}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={cardFooterTw}>
        {footerText.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            <span className={footerTextTw}>{line}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
