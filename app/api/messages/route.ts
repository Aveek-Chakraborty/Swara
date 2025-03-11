import { NextResponse, NextRequest } from "next/server";
import { db } from '@/utils/db'
import { Messages } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';

function getCurrentDateTime(): string {
    const now: Date = new Date();

    const day: string = String(now.getDate()).padStart(2, '0');
    const month: string = String(now.getMonth() + 1).padStart(2, '0');
    const year: number = now.getFullYear();

    const hours: string = String(now.getHours()).padStart(2, '0');
    const minutes: string = String(now.getMinutes()).padStart(2, '0');
    const seconds: string = String(now.getSeconds()).padStart(2, '0');

    const formattedDate: string = `${day}/${month}/${year}`;
    const formattedTime: string = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} -- ${formattedTime}`;
}


export async function POST(req: NextRequest) {
    try {
        const messageData = await req.json()
        const id = uuidv4();

        const res = await db.insert(Messages).values({
            uuid: id,
            name: messageData.name,
            email: messageData.email,
            mobile: messageData.mobile,
            message: messageData.message,
            time: getCurrentDateTime()
        })



        if(res){
            return NextResponse.json({ message: "Message sent successfully" });
         }

        return NextResponse.json({ message: "External server error" }) 

    } catch (error) {
        console.log("Internal server error", error)
    }
}




export async function GET(req: NextRequest) {
    try {
        const res = await db.select().from(Messages)
        if(res.length > 0){return NextResponse.json({ "message": res })}
        return NextResponse.json({ message: "External server error" })
    } catch (err) {
        console.log("Internal server error", err)
    }
}