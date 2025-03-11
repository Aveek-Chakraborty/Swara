import { NextRequest, NextResponse } from "next/server";
import { db } from '@/utils/db'
import { Messages } from "@/utils/schema";
import { eq } from "drizzle-orm";


export async function DELETE(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json({ "message": "Invalid query parameter" });
        }
        
        const res = await db.delete(Messages).where(eq(Messages.uuid, query));
        return NextResponse.json({ "message": "Deleted" })
    } catch (err) {
        console.log("Internal server error", err)
    }
}