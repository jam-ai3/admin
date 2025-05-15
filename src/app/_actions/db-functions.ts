"use server"

import db from "@/db/db"



export async function getUsageData(numOfUsers: number) {
    const individualCalls = await db.individualCall.findMany({
        where: {
            createdAt: {
                gte: new Date(Date.now() - numOfUsers * 24 * 60 * 60 * 1000)
            }
        }
    })
    return individualCalls
}