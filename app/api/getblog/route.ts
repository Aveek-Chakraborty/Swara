import { NextRequest, NextResponse } from "next/server";
import { db } from '@/utils/db'
import { Blogs } from "@/utils/schema";
import { eq } from "drizzle-orm";



export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get('q');

        if(!query){
            return NextResponse.json({message: "Invalid query sent"})
        }

        const res =await db.select().from(Blogs).where(eq(Blogs.uuid , query))
            

        if(res){return NextResponse.json({ "message": res[0].content })}
        return NextResponse.json({ message: "External server error" })
       
    } catch (err) {
        console.log("Internal server error", err)
    }
}