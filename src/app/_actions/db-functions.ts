"use server"

import db from "@/db/db"



export async function getUsageData(numOfDays: number) {
    const individualCalls = await db.individualCall.findMany({
        where: {
            createdAt: {
                gte: new Date(Date.now() - numOfDays * 24 * 60 * 60 * 1000)
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    })
    return individualCalls
}

export async function getRecentUsers(numOfDays: number) {
    const users = await db.user.findMany({
        where: {
            createdAt: {
                gte: new Date(Date.now() - numOfDays * 24 * 60 * 60 * 1000)
            },
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    return users
}