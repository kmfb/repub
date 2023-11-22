import { NextResponse } from "next/server"
import { AuthType, createClient } from "webdav";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: Request) {
    const client = createClient(`http://www.stardusted.top:31580`, {
      authType: AuthType.Password,
      username: "kmfb",
      password: "1q2w3e*",
    });
    const getDirectoryItems = async () => {
        const directoryItems = await client.getDirectoryContents("/");
        console.log(directoryItems, "directoryItems");
        return directoryItems;
    };
    const dItems = await getDirectoryItems();
    return NextResponse.json(dItems)
}