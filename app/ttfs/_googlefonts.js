export async function all() {
  if (!globalThis.googlefontsAll) {
    globalThis.googlefontsAll = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    console.log("pull from globalThis.googlefontsAll");
  }
  return globalThis.googlefontsAll.clone();
}
