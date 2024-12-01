export async function all() {
  if (!globalThis.googfontAll) {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { items } = await response.json();
    globalThis.googfontAll = items;
  } else {
    console.log("pull from globalThis.googfontAll");
  }
  return globalThis.googfontAll;
}
