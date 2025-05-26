"use server"

import db from "@/db/db"



export async function getUsageData(numOfDays: number) {
    return await db.individualCall.findMany({
        where: {
            createdAt: {
                gte: new Date(Date.now() - numOfDays * 24 * 60 * 60 * 1000)
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    })
}

export async function getRecentUsers(numOfDays: number) {
    return await db.user.findMany({
        where: {
            createdAt: {
                gte: new Date(Date.now() - numOfDays * 24 * 60 * 60 * 1000)
            },
        },
        orderBy: {
            createdAt: "asc"
        }
    })

}