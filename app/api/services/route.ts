import { NextResponse, NextRequest } from "next/server";
import { db } from '@/utils/db'
import { Services } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';


export async function POST(req: NextRequest) {
    try {
        const e = await req.json()

        const id = uuidv4();

        const res = await db.insert(Services).values({
            uuid: id,
            content: e.eventData,
            link: e.link
        })
        if (res) {
            return NextResponse.json({ message: "Event scheduled successfully" });
        }

        return NextResponse.json({ message: "External server error" })


    } catch (error) {
        console.log("Internal server error", error)
    }
}


export async function GET(req: NextRequest) {
    try {
        const res = await db.select().from(Services)
                if(res.length > 0){return NextResponse.json({ "message": res })}
                return NextResponse.json({ message: "External server error" })
    } catch (err) {
        console.log("Internal server error", err)
    }
}