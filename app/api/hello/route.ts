import { NextResponse } from "next/server"
import { AuthType, createClient } from "webdav";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: Request) {
    const client = createClient(`http://192.168.31.223:80`, {
        authType: AuthType.Digest,
        username: 'kmfb',
        password: 'qazwsxedc123',
    });
    const getDirectoryItems = async () => {
        const directoryItems = await client.getDirectoryContents("/");
        console.log(directoryItems, "directoryItems");
        return directoryItems;
    };
    const dItems = await getDirectoryItems();
    return NextResponse.json(dItems)
}