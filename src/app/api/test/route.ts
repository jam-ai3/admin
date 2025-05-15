import db from "@/db/db"
import { NextResponse } from "next/server"

export async function POST() {
    try {
        // await db.user.create({...})
        return new NextResponse("Success")
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}