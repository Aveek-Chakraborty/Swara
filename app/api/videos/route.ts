import { NextResponse, NextRequest } from "next/server";
import { db } from '@/utils/db'
import { Videos } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';


export async function POST(req: NextRequest) {
    try {
        const videoData = await req.json()
        const id = uuidv4();

        const res = await db.insert(Videos).values({ 
            uuid: id,
            content: videoData
         })
         if(res){
            return NextResponse.json({ message: "Video added successfully" });
         }

        return NextResponse.json({ message: "External server error" }) 

    } catch (error) {
        console.log("Internal server error", error)
    }
}




export async function GET(req: NextRequest) {
    try {
        const res = await db.select().from(Videos)
        if(res.length > 0){return NextResponse.json({ "message": res })}
        return NextResponse.json({ message: "External server error" })
    } catch (err) {
        console.log("Internal server error", err)
    }
}