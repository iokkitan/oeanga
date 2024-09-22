import { all } from "./_googlefonts";

export const dynamic = "force-static";

export async function GET() {
  return all();
}
